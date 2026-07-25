import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { GPUComputationRenderer } from "three/examples/jsm/misc/GPUComputationRenderer.js";
import { useApp } from "../../context/AppContext";
import { getAccent } from "../../data/accents";
import { GLYPH_PATHS } from "../../data/glyphPaths";
import { isAppReady, onAppReady } from "../../hooks/appReady";
import "./PhysicsHero.scss";

/* ==================================================================== */
/* GPGPU shape-fluid hero.                                              */
/*                                                                      */
/* There is no rigid-body engine. Every shape is a PARTICLE whose       */
/* position + velocity live in float textures and are integrated on the */
/* GPU (GPUComputationRenderer ping-pong). "Collisions" are faked by a  */
/* density field: each frame the particles are splatted into a coarse   */
/* render target, and every particle is pushed DOWN the density         */
/* gradient — away from where it is crowded. That single term gives     */
/* incompressibility (a packed bed), leveling (the surface flows back   */
/* to flat) and buoyancy (buried shapes float up), which together read  */
/* as a body of water. On top of it sit the terms that make it read as  */
/* LIQUID rather than as a pile: a pairwise contact spring, cohesion    */
/* toward the neighbourhood centre of mass (surface tension), XSPH      */
/* velocity coupling (so it flows as one body instead of shearing like  */
/* sand) and wall adhesion (so it wets the tank).                       */
/*                                                                      */
/* Gravity pools the bed at the bottom; the cursor is a swept capsule   */
/* that shoves shapes out of its path and flings them, and they arc     */
/* back under gravity and flow into the wake. The opening second is not */
/* an animation — the roster spawns as one over-compressed clump at the */
/* centre and the collider unwinding is what throws it across the tank. */
/*                                                                      */
/* All of this is on the GPU: zero worker messages, zero per-body CPU   */
/* loop, so it stays smooth at ~1000 shapes where a rigid-body worker   */
/* chokes on the per-body applyForce message stream.                    */
/* ==================================================================== */

// Perf tier: mobile / weak devices run a smaller particle grid + tighter DPR.
const isLowTier = () =>
  window.innerWidth < 768 ||
  (navigator.hardwareConcurrency || 8) <= 4 ||
  (navigator.deviceMemory || 8) <= 4;

// Particle grid. Count = W×H. Kept a rectangle purely because the sim state is
// a 2D texture; the number is what matters. 200 full tier, 100 low tier —
// crisp 2D primitives read fine at low counts, no need for thousands.
const SIM = { w: 20, h: 10 };
const SIM_LOW = { w: 10, h: 10 };

// Substeps per frame. The collision is an explicit spring; a big timestep
// forces it to be weak (soft, overlapping, floaty). Running the sim several
// times per frame at dt/SUBSTEPS lets the spring be near-RIGID without blowing
// up — hard colliders, while the aggregate still flows like water. Every force
// is scaled by the sub-dt, so the total per-frame push is unchanged.
//
// 6 rather than 5 because the bed runs thin on damping AND fast: bodies travel
// further per step, and the collision is resolved once per substep, so the same
// tolerance costs more resolution at higher speed. This is also where "smooth"
// comes from at speed — an under-substepped stiff spring does not fail by
// exploding, it fails by buzzing, and the bed acquires a fine jitter that reads
// as noise on top of otherwise correct motion. The neighbour loop is O(n^2) and
// n dropped from 384 to 260, which more than pays for the extra pass.
const SUBSTEPS = 6;
// Fixed sub-timestep the spring is actually tuned for: dt/SUBSTEPS at 60fps.
// Stability of the stiff contact spring depends on this sub-dt, NOT on the
// substep COUNT — so it must stay ~constant regardless of framerate. A fixed
// count breaks the moment fps drops (e.g. macOS throttling the tab on battery):
// dt grows, dt/SUBSTEPS grows with it, the spring is under-substepped and the
// bed buzzes/churns. Instead we hold the sub-dt fixed and vary the COUNT.
const FIXED_SUB = 1 / 60 / SUBSTEPS;
// Cap the count so a big frame (backgrounded tab, GC hitch) can't trigger a
// spiral of death. With dt clamped to 1/30 below, this is only hit while
// throttled; the sub-dt then grows a little but stays well inside stability.
const MAX_SUBSTEPS = 12;

// Frame-rate-independent exponential smoothing. `base` is the per-frame lerp
// fraction tuned at 60fps; this rescales it by the real elapsed time so an ease
// takes the same wall-clock time at 30fps (battery) as at 60fps. Without it,
// every `x += (target - x) * base` runs at half speed when the framerate halves.
const smoothK = (base, delta) => 1 - Math.pow(1 - base, delta * 60);

// Visual radius every shape is normalized to (see the atlas bake) and the
// world size the instanced quad is drawn at.
const SIZE = 0.17;
// Half-extent the atlas frames each shape to. The longest shape (the bar,
// 1.2×SIZE half-length) has to fit, with a hair of margin.
const ATLAS_FRAME = SIZE * 1.35;
// Full world size of the quad each particle is drawn on. The atlas cell maps
// to ±ATLAS_FRAME, so the quad spans 2×ATLAS_FRAME.
const QUAD = ATLAS_FRAME * 2;

// Spawn. There is NO drop and NO clump. The roster exists on frame one as an
// already-settled bed along the bottom (a plain lattice at rest spacing) and is
// nudged with a gentle sinusoidal slosh, so the opening reads as a calm body of
// water rippling into life rather than as objects poured/thrown in from the top.
// Because the bed sits at rest spacing there is no stored contact pressure, so
// none of the old "compressed clump" failure modes (blast on release, sprinkle
// on slow release) can happen here.
//
// Initial slosh amplitude (world units/sec) for the bed's opening ripple. Small
// on purpose — a swell, not a splash.
const SPAWN_WAVE = 3.2;

// The spring's ceiling ramps to full over this long. With a rest-spacing bed
// there is no over-pack to ease around, so this only needs to be long enough
// that the bed firms up smoothly without a frame-one kick.
const RELEASE_TIME = 0.3;
// Soft ceiling on the summed repulsion during that ramp. The bed's contacts are
// shallow, so this is comfortably above what they ever demand.
const SOFT_MAX_ACC = 70.0;

// Visible world half-height on wide screens (see Scene).
const REST_HH = 3.2;

// Density field bounds — a fixed generous region that always exceeds the
// visible world, so the walls (which move on resize) are always inside it.
const DEN_HW = 13;
const DEN_HH = 8;
const DEN_W = 128;
const DEN_H = 80;

/* ------------------------------------------------------------------ */
/* Palette (unchanged from the previous hero): a grey ramp skewed      */
/* faint, a brighter sub-ramp for the wire glyphs, plus the accent.    */
/* ------------------------------------------------------------------ */
const THEME_TONES = {
  dark: {
    solid: ["#7e828c", "#5c606a", "#41454d", "#2a2d33"],
    wire: ["#8b909a", "#666b74"],
  },
  light: {
    solid: ["#050608", "#191c24", "#8b919d", "#c9cbd0"],
    wire: ["#545a67", "#777e8c"],
  },
};
const TONE_CUMULATIVE = [0.12, 0.3, 0.58, 1];
const SOLID_TONES = THEME_TONES.dark.solid.length;
const WIRE_TONES = THEME_TONES.dark.wire.length;
const ACCENT_CI = SOLID_TONES + WIRE_TONES;
const ACCENT_SHARE = 0.12;

// Deterministic PRNG: identical composition on every reload.
const mulberry32 = (a) => () => {
  a |= 0;
  a = (a + 0x6d2b79f5) | 0;
  let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

/* ------------------------------------------------------------------ */
/* Shape builders — flat geometry in the XY plane, each normalized to  */
/* roughly the SIZE footprint. Used ONCE to bake the shape atlas.      */
/* ------------------------------------------------------------------ */
const svgLoader = new SVGLoader();

const glyphGeometry = (d, size, strokeWidth, divisions = 8) => {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">` +
    `<path d="${d}" fill="none" stroke="#000" stroke-width="${strokeWidth}" ` +
    `stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const parts = [];
  for (const path of svgLoader.parse(svg).paths) {
    for (const sub of path.subPaths) {
      const stroke = SVGLoader.pointsToStroke(
        sub.getPoints(divisions),
        path.userData.style,
        4,
      );
      if (stroke) parts.push(stroke);
    }
  }
  if (parts.length === 0) return new THREE.RingGeometry(size * 0.8, size, 20);
  const merged = mergeGeometries(parts);
  parts.forEach((p) => p.dispose());
  merged.computeBoundingBox();
  const bb = merged.boundingBox;
  const k = (size * 2) / Math.max(bb.max.x - bb.min.x, bb.max.y - bb.min.y);
  merged.translate(-(bb.min.x + bb.max.x) / 2, -(bb.min.y + bb.max.y) / 2, 0);
  merged.scale(k, -k, 1);
  return merged;
};

// Convex hull (Andrew's monotone chain) of a point cloud.
const convexHull = (pts) => {
  const p = pts.slice().sort((a, b) => a.x - b.x || a.y - b.y);
  const cross = (o, a, b) =>
    (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
  const lower = [];
  for (const q of p) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], q) <= 0)
      lower.pop();
    lower.push(q);
  }
  const upper = [];
  for (let i = p.length - 1; i >= 0; i--) {
    const q = p[i];
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], q) <= 0)
      upper.pop();
    upper.push(q);
  }
  lower.pop();
  upper.pop();
  return lower.concat(upper);
};

// Solid silhouette of a glyph: fill the convex hull of every point on its path.
// Keeps each shape recognisably that glyph (cube → hexagon, cone → rounded
// wedge, torus → disc) instead of a stand-in primitive.
const solidGlyph = (d, size, divisions = 24) => {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">` +
    `<path d="${d}" fill="none" stroke="#000" stroke-width="0.1"/></svg>`;
  const pts = [];
  for (const path of svgLoader.parse(svg).paths)
    for (const sub of path.subPaths)
      for (const pt of sub.getPoints(divisions)) pts.push(pt);
  const geo = new THREE.ShapeGeometry(new THREE.Shape(convexHull(pts)));
  geo.computeBoundingBox();
  const bb = geo.boundingBox;
  const k = (size * 2) / Math.max(bb.max.x - bb.min.x, bb.max.y - bb.min.y);
  geo.translate(-(bb.min.x + bb.max.x) / 2, -(bb.min.y + bb.max.y) / 2, 0);
  geo.scale(k, -k, 1);
  return geo;
};

// The roster. `wire` glyphs take the brighter wire ramp and hit the accent
// twice as often. `weight` is the relative share of the bed each shape gets.
//
// `r` is the collision half-extent, and it is per shape because a single shared
// radius cannot be right for a roster this varied: the ellipse is 0.459 across
// its long axis while the thin bar is 0.085 across its short one. One radius
// either lets the big shapes visibly interpenetrate or floats the small ones in
// a halo of dead space. These bodies also spin, so the honest half-extent
// changes with the angle; each `r` is therefore biased toward the LONG axis
// (roughly two-thirds of the way from mean to max) — over-spacing a tumbling
// bar slightly is invisible, whereas under-spacing it reads as a clipped edge.
// Solid plus/cross silhouette, filled. Used in place of the solid cube.
const plusGeom = (size, t = size * 0.36) => {
  const L = size;
  const shape = new THREE.Shape(
    [
      [t, t], [L, t], [L, -t], [t, -t], [t, -L], [-t, -L],
      [-t, -t], [-L, -t], [-L, t], [-t, t], [-t, L], [t, L],
    ].map(([x, y]) => new THREE.Vector2(x, y)),
  );
  return new THREE.ShapeGeometry(shape);
};

// All six glyphs (cube, tetrahedron, octahedron, cone, sphere, torus). Each
// appears mostly as a solid silhouette; ~20% of the bed is the wireframe
// outline version. Solid weight 16 + wire weight 4 per glyph → wire share = 20%.
// Exception: the cube's SOLID form is a plus (+) instead of its hexagon
// silhouette; the wireframe cube outline is unchanged.
const solidByIndex = (d, i) => {
  if (i === 0) return plusGeom(SIZE); // cube → plus (+)
  if (i === 5) return new THREE.RingGeometry(SIZE * 0.52, SIZE, 28); // torus → ring (O)
  return solidGlyph(d, SIZE);
};
const SHAPES = GLYPH_PATHS.flatMap((d, i) => [
  { geo: () => solidByIndex(d, i), weight: 16, r: SIZE },
  { geo: () => glyphGeometry(d, SIZE, 1.2), weight: 4, wire: true, r: SIZE },
]);
// Widest possible pair distance — the loop's early-out cutoff. Has to bound
// (r_i + r_j) * COL_SPACING for the two fattest shapes or they stop seeing
// each other at exactly the range where they need to push apart.
const MAX_R = Math.max(...SHAPES.map((s) => s.r));
// Rest spacing multiplier — pair distance is (r_i + r_j) * this. Lives here
// rather than only in the uniform block because the SPAWN LATTICE has to be
// built at the same spacing the collider wants; see REST_PITCH.
const COL_SPACING = 1.2;
// Pitch of the spawn lattice, and it MUST be the collider's own rest spacing
// for the widest pair, or the bed spawns pre-compressed and the release is a
// detonation rather than a settle. (It used to be a hand-tuned SIZE*2.1 by
// SIZE*1.9, from before rest spacing was derived from per-shape radii — 12%
// inside rest in x and 21% in y, which through the cubic stiffening term is
// ~420 of acceleration per vertical contact against a gravity of 22.) The 4%
// margin keeps every pair strictly outside contact on frame one, so the first
// force the bed feels is gravity, not stored spring energy.
const REST_PITCH = 2 * MAX_R * COL_SPACING * 1.04;
const ATLAS_COLS = 4; // 4×4 grid holds the 13 shapes with room to spare.

// Weighted colour slot for one particle.
const pickTone = (rand, wire) => {
  if (rand() < (wire ? ACCENT_SHARE * 2 : ACCENT_SHARE)) return ACCENT_CI;
  if (wire) return SOLID_TONES + Math.floor(rand() * WIRE_TONES);
  const roll = rand();
  return TONE_CUMULATIVE.findIndex((edge) => roll < edge);
};

/* ------------------------------------------------------------------ */
/* Compute shaders (GPUComputationRenderer fragment programs).         */
/* `texturePosition` / `textureVelocity` are injected by the           */
/* dependency wiring; `resolution` is injected as a define.            */
/* Position texture: rg = world xy, b = angle, a = seed (0..1).        */
/* Velocity texture: rg = velocity xy, b = angular velocity, a = age.  */
/* ------------------------------------------------------------------ */

// Shared boilerplate: the world/tuning uniforms both compute shaders use.
const SIM_UNIFORMS = /* glsl */ `
  uniform float uDt;
  uniform float uHalfW;
  uniform float uFloorY;
  uniform float uCeilY;
`;

const VELOCITY_FRAG = /* glsl */ `
  ${SIM_UNIFORMS}
  uniform float uGravity;
  uniform float uDamping;
  uniform float uMaxSpeed;
  uniform float uDead;       // speed under which a supported body is "at rest"
  uniform float uSleep;      // extra drag applied to it
  uniform float uRoll;

  uniform sampler2D uDensity;
  uniform vec2 uDenMin;      // world coord at the density texel origin
  uniform vec2 uDenInvSize;  // 1 / (2*DEN_HW, 2*DEN_HH)
  uniform vec2 uDenTexel;    // 1 / (DEN_W, DEN_H)
  uniform float uDenPush;    // strength of the mean-field leveling push
  uniform float uDenMaxAcc;  // ceiling on it — must stay under gravity
  uniform float uWallPush;   // soft wall penalty strength

  uniform float uCohR;       // cohesion support radius — neighbour loop cutoff
  uniform float uSurfTen;    // pull toward the neighbourhood centre of mass
  uniform float uSurfMax;    // ceiling on it — must stay well under gravity
  uniform float uVisc;       // XSPH: rate of drift toward the mean neighbour vel
  uniform float uAdhSpan;    // wall wetting band, in multiples of wallR
  uniform float uAdhesion;   // strength of the pull onto a wetted wall
  uniform float uColSpacing; // pair distance = (r_i + r_j) * this
  uniform float uColRepel;   // pairwise repulsion strength
  uniform float uColStiffen; // cubic term — how hard the spring walls off
  uniform float uColMaxAcc;  // ceiling on the summed repulsion (vs gravity)
  uniform float uColSoftAcc; // that ceiling at spawn, before the ramp
  uniform float uRelease;    // 0 at spawn → 1 once the spring is at full stiffness
  uniform float uColDamp;    // contact damping (kills the closing velocity)
  uniform float uColHardAt;  // overlap where damping starts becoming a hard stop
  uniform float uColHardFull;// overlap where it IS a hard stop (damp = 1)

  uniform vec2  uMouseA;     // swept segment tail
  uniform vec2  uMouseB;     // swept segment head
  uniform vec2  uMouseVel;   // cursor world velocity
  uniform float uMouseOn;
  uniform float uMouseR;     // reach
  uniform float uMousePush;  // radial shove strength
  uniform float uMouseCarry; // how much cursor velocity is imparted
  uniform float uMouseCling; // wetting: bodies just outside the reach follow it
  uniform float uMouseSkin;  // width of that shell, in WORLD units (not a ratio)

  float densityAt(vec2 uv){ return texture2D(uDensity, uv).r; }

  // Wetting kernel: zero AT the surface and at the far edge of the band,
  // peaking between. Zero at contact matters — the wall penalty (or the
  // cursor's shove) owns that range, and an attraction that survived there
  // would fight it instead of complementing it.
  float wetKernel(float d, float R){
    float q = clamp(d / R, 0.0, 1.0);
    return 4.0 * q * (1.0 - q);
  }

  void main(){
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 pos = texture2D(texturePosition, uv);
    vec4 vel = texture2D(textureVelocity, uv);

    vec2 p = pos.xy;
    vec2 v = vel.xy;
    float dt = uDt;

    // Gravity.
    v.y += uGravity * dt;

    // Mean-field density gradient — leveling + buoyancy + wake flow-back. It
    // makes the surface walk back to flat, but it CANNOT stop two shapes
    // overlapping (it is a blurred average). The pairwise pass below is the
    // actual collider.
    vec2 duv = (p - uDenMin) * uDenInvSize;
    float dL = densityAt(duv - vec2(uDenTexel.x, 0.0));
    float dR = densityAt(duv + vec2(uDenTexel.x, 0.0));
    float dD = densityAt(duv - vec2(0.0, uDenTexel.y));
    float dU = densityAt(duv + vec2(0.0, uDenTexel.y));
    vec2 grad = vec2(dR - dL, dU - dD);
    // Capped below gravity. In a packed bed dU-dD is large and negative, so
    // this term points UP; uncapped it stops being hydrostatic support and
    // becomes a fountain that lifts the whole bed off the floor.
    vec2 denAcc = -grad * uDenPush;
    float denLen = length(denAcc);
    if (denLen > uDenMaxAcc) denAcc *= uDenMaxAcc / denLen;
    v += denAcc * dt;

    // Pairwise collision: real short-range repulsion so shapes pack instead of
    // interpenetrating — the "collider" the mean field can't give. O(n^2), but
    // n is small (~384) and every step is just a texture fetch on the GPU.
    // Repulsion is accumulated and clamped rather than applied per neighbour:
    // deep in the pile a body has many overlaps at once, and the raw sum is an
    // acceleration many times gravity that fires the pile apart.
    vec2 push = vec2(0.0);
    float contacts = 0.0;
    // Cohesion accumulators, gathered over the WHOLE support radius (which is
    // ~2x the contact spacing), not just over touching pairs. A pile only knows
    // about bodies it is currently pressing against; a liquid knows about the
    // ones near it too, and that difference is the whole feel.
    vec2 com = vec2(0.0);    // weighted neighbour centre of mass
    vec2 vsum = vec2(0.0);   // weighted neighbour velocity
    float wsum = 0.0;
    float ri = vel.a;                            // this body's half-extent
    for (int yy = 0; yy < TEXH; yy++) {
      for (int xx = 0; xx < TEXW; xx++) {
        vec2 quv = (vec2(float(xx), float(yy)) + 0.5)
                   / vec2(float(TEXW), float(TEXH));
        vec4 op = texture2D(texturePosition, quv);
        vec2 dd = p - op.xy;
        float dist2 = dot(dd, dd);
        if (dist2 < 1e-8 || dist2 > uCohR * uCohR) continue;
        float dist = sqrt(dist2);
        // The neighbour's velocity is fetched before the contact test, because
        // its .a carries the neighbour's radius and the test needs it — and
        // the cohesion terms below need its velocity regardless of contact.
        vec4 ov = texture2D(textureVelocity, quv);

        // Poly6-ish weight: smooth, 1 at coincident, 0 at the support edge.
        // Smoothness matters more than the exact profile — a kernel with a
        // kink at the cutoff makes neighbours pop in and out and the bed
        // crackles as it flows.
        float q = dist / uCohR;
        float w = 1.0 - q * q;
        w = w * w * w;
        com  += op.xy * w;
        vsum += ov.xy * w;
        wsum += w;

        float pr = (ri + ov.a) * uColSpacing;    // this pair's rest spacing
        if (dist >= pr) continue;
        vec2 nrm = dd / dist;
        float overlap = 1.0 - dist / pr;         // 0 at touch → 1 coincident
        // Linear + cubic. The linear term alone maxes out at uColRepel, which
        // is the same order as uMousePush — so a cursor stroke could compress
        // a pair right through the spring's ceiling and the shapes visibly
        // interpenetrated while stirred, even though a resting bed (gravity
        // is only 12) looked correctly spaced. The cubic term is negligible
        // at the shallow overlap a settled bed sits at, so rest spacing and
        // feel are unchanged, but it grows ~50x by a third of a radius in and
        // walls the pair off no matter how hard the cursor shoves.
        float fpush = overlap + uColStiffen * overlap * overlap * overlap;
        push += nrm * fpush * uColRepel;
        contacts += 1.0;
        // Contact damping: bleed the CLOSING relative velocity so a contact
        // absorbs energy instead of bouncing. Without this the springs store
        // energy and the whole bed boils.
        // Between uColHardAt and uColHardFull the bleed ramps to a full
        // projection — the closing velocity is removed outright, so penetration
        // cannot deepen within a substep regardless of the force behind it.
        // That is the actual non-penetration constraint; the spring only has to
        // restore spacing. The ramp has to finish at a shallow overlap: run it
        // out to overlap = 1 and it is still under 0.7 at a third of the way in,
        // which is barely more than the soft value and lets contacts sink.
        float vn = dot(v - ov.xy, nrm);
        if (vn < 0.0) {
          float damp = mix(uColDamp, 1.0,
                           smoothstep(uColHardAt, uColHardFull, overlap));
          v -= nrm * vn * damp;
        }
      }
    }
    // uColMaxAcc is ramped in from a gravity-scale value over the first second
    // and a half (see RELEASE_TIME). It is the ceiling on the SUMMED repulsion,
    // which is the only term that can be enormous at spawn, so gating it is
    // enough to turn the opening from a detonation into a sag. Once the mass has
    // spread, contact forces sit orders below either value and the ramp stops
    // mattering — it is not a permanent softening.
    float pushLen = length(push);
    float maxPush = mix(uColSoftAcc, uColMaxAcc, uRelease);
    if (pushLen > maxPush) push *= maxPush / pushLen;
    v += push * dt;

    // COHESION + SURFACE TENSION. Pull each body toward the weighted centre of
    // its neighbourhood. This is self-cancelling in the interior of the bed
    // (neighbours surround you, com lands on you) and only bites at a FREE
    // SURFACE, where the neighbourhood is one-sided and com sits inward. That
    // is exactly what surface tension is: a force that exists only on the skin.
    // Effects, all of them things the repulsion-only bed could not do — a
    // splash leaves in blobs instead of individual grains, a thrown clump holds
    // together in flight, the crest of a wave rounds off instead of shattering,
    // and a channel the cursor cut heals with a rolling lip rather than by
    // trickling shut.
    //
    // Capped well under gravity: uncapped, the term is not a skin but a global
    // attractor and the bed balls up in the middle of the tank.
    if (wsum > 1e-5) {
      vec2 sAcc = (com / wsum - p) * uSurfTen;
      float sl = length(sAcc);
      if (sl > uSurfMax) sAcc *= uSurfMax / sl;
      v += sAcc * dt;

      // XSPH viscosity: drift toward the mean neighbour velocity. The contact
      // damping above only eats the CLOSING component of a touching pair, so
      // neighbours could slide freely past each other — the bed sheared like
      // dry sand. This couples the tangential motion too, which is what makes a
      // region move as one body of liquid: a stroke drags the surrounding fluid
      // with it, and momentum carries across the bed instead of dying with the
      // one shape that was hit. Written as a rate so it is timestep-independent
      // across substeps; clamped at 1 so it can never overshoot into a flip.
      v += (vsum / wsum - v) * min(uVisc * dt, 1.0);
    }

    // Cursor: swept-capsule repulsion + fling. Tracked per particle so the
    // settle test below only exempts bodies the cursor is actually touching —
    // a global "mouse is on the page" gate would keep the whole bed awake.
    float stirred = 0.0;
    if (uMouseOn > 0.5) {
      vec2 ab = uMouseB - uMouseA;
      float L2 = max(dot(ab, ab), 1e-6);
      float t = clamp(dot(p - uMouseA, ab) / L2, 0.0, 1.0);
      vec2 c = uMouseA + ab * t;
      vec2 d = p - c;
      float dist = length(d) + 1e-5;
      vec2 n = d / dist;
      if (dist < uMouseR) {
        // CUBIC falloff, not quadratic. The cursor is a body displacing fluid,
        // so its force has to be a contact, not a field: quadratic still hands
        // out ~5% of uMousePush at the far edge of the reach, which is a
        // gravity-scale acceleration applied to every body out there at once —
        // the whole bed drifted with the cursor even when it was nowhere near
        // the surface. Cubed, the edge of the reach is genuinely nothing and
        // only what the cursor actually plows through moves.
        float f = 1.0 - dist / uMouseR;
        f = f * f * f;
        v += n * f * uMousePush * dt;           // shove out of the path
        v += uMouseVel * f * uMouseCarry * dt;  // drag along the stroke
        stirred = 1.0;
      } else if (dist < uMouseR + uMouseSkin) {
        // Wetting shell hugging the reach — a fixed WORLD width (about one body
        // across), not a multiple of the reach. As a ratio it grew with the
        // speed-scaled reach into a tank-sized region that dragged everything
        // in unison; the point is a thin film that clings to the moving object,
        // and a film does not get thicker because the object moved faster.
        //
        // Radial pull only. The velocity share it used to hand out was a second
        // way for one gesture to set a large area moving as a block: fluid
        // downstream of a stroke should be moved by the fluid the cursor hit,
        // through contact and pressure, not by the cursor reaching past it.
        float f = wetKernel(dist - uMouseR, uMouseSkin);
        v -= n * f * uMouseCling * dt;
        stirred = 1.0;
      }
    }

    // Damping + speed clamp (explicit-integrator safety).
    v *= (1.0 - uDamping * dt);
    float sp = length(v);
    if (sp > uMaxSpeed) v *= uMaxSpeed / sp;

    // Soft walls. The container used to be a bare position clamp at the exact
    // boundary, which is a RATCHET: every body pressed into the wall lands on
    // the same x, so the separation pass sees neighbours with dd.x = 0 and its
    // correction goes purely VERTICAL. That correction is applied straight to
    // position, where gravity (which acts on velocity) cannot answer it, so the
    // contact column pumps itself up the wall indefinitely. A penalty that
    // starts a radius out keeps a gap at the boundary, so wall-adjacent bodies
    // stay off-axis from each other and the pressure relieves inward instead.
    // Its own half-extent, scaled by the same spacing factor the pairwise term
    // uses: the wall is the mirror of a neighbour, so a body belongs exactly
    // its own half-spacing off it. Per-body, so a fat ellipse stands off
    // further than a thin bar instead of both clipping at one shared radius.
    float wallR = ri * uColSpacing;
    float wl = p.x + uHalfW;
    if (wl < wallR) v.x += (1.0 - max(wl, 0.0) / wallR) * uWallPush * dt;
    float wr = uHalfW - p.x;
    if (wr < wallR) v.x -= (1.0 - max(wr, 0.0) / wallR) * uWallPush * dt;
    float wb = p.y - uFloorY;
    if (wb < wallR) v.y += (1.0 - max(wb, 0.0) / wallR) * uWallPush * dt;
    float wt = uCeilY - p.y;
    if (wt < wallR) v.y -= (1.0 - max(wt, 0.0) / wallR) * uWallPush * dt;

    // ADHESION — the tank is wetted. Surface tension alone pulls the bed away
    // from the container (the skin at the walls is one-sided, so it drags
    // inward) and the edges detach, which reads as jelly, not water. Water
    // beats its own cohesion against a surface it wets: it climbs the wall in a
    // meniscus and stays stuck to the floor. This band restores that balance.
    // Weak by design — it only has to cancel the surface-tension pull at the
    // boundary, and if it outgrows the wall penalty bodies weld to the glass.
    float adhR = wallR * uAdhSpan;
    if (wl < adhR) v.x -= wetKernel(wl, adhR) * uAdhesion * dt;
    if (wr < adhR) v.x += wetKernel(wr, adhR) * uAdhesion * dt;
    if (wb < adhR) v.y -= wetKernel(wb, adhR) * uAdhesion * dt;

    // Last-resort stop at the boundary itself: kill outward motion, no bounce.
    // With the penalty above this should almost never fire.
    if (p.x <= -uHalfW && v.x < 0.0) v.x = 0.0;
    if (p.x >=  uHalfW && v.x > 0.0) v.x = 0.0;
    if (p.y <= uFloorY && v.y < 0.0) v.y = 0.0;
    if (p.y >=  uCeilY && v.y > 0.0) v.y = 0.0;

    // Floor contact counts as support for the settle test below.
    if (wb < wallR) contacts += 1.0;

    // Settle: heavy extra drag on a supported body that is already slow, so the
    // bed comes to rest instead of churning forever.
    //
    // Deliberately a DRAG and not a hard v = 0. This runs once per substep,
    // where a force only contributes accel/(SUBSTEPS*60) ≈ accel/240 to the
    // velocity. Snapping to zero below a threshold therefore annihilates any
    // force under uDead*240 outright — which is most of them, gravity included.
    // That is a physics off-switch: shapes weld to the sky at the apex of an
    // arc, and overlapped neighbours lock together because the spring pushing
    // them apart is nulled every step. Drag leaves a net force able to win.
    if (stirred < 0.5 && contacts > 0.5) {
      float slow = 1.0 - smoothstep(0.0, uDead, length(v));
      v *= max(0.0, 1.0 - slow * uSleep * dt);
    }

    // Angular velocity from horizontal motion: shapes roll as they travel.
    float angVel = -v.x * uRoll;

    gl_FragColor = vec4(v, angVel, vel.a);
  }
`;

// Pure integration. There is deliberately NO position-space collision solve
// here. A geometric separation pass is attractive (it holds spacing at the
// bottom of a tall stack where a spring compresses) but it writes to position,
// and every other term in this sim — gravity, damping, contact damping, the
// sleep drag — lives in velocity. A position-space push is therefore
// unopposable, which produced two separate failures: bodies clamped to a wall
// all share one x, so the correction between them is purely vertical and pumps
// the contact column up the wall; and a resting bed keeps being pushed apart
// while its velocity is damped to nothing, so the pile silently inflates. The
// velocity spring below is stiff enough to carry the stack on its own.
const POSITION_FRAG = /* glsl */ `
  ${SIM_UNIFORMS}
  void main(){
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 pos = texture2D(texturePosition, uv);
    vec4 vel = texture2D(textureVelocity, uv);
    vec2 p = pos.xy + vel.xy * uDt;
    float ang = pos.z + vel.z * uDt;

    // Contain: clamp to the exact walls so nothing escapes the visible tank.
    p.x = clamp(p.x, -uHalfW, uHalfW);
    p.y = clamp(p.y, uFloorY, uCeilY);
    gl_FragColor = vec4(p, ang, pos.a);
  }
`;

/* ------------------------------------------------------------------ */
/* Density splat: N points, positions fetched from the sim texture,    */
/* additively blended as small gaussians into a low-res target.        */
/* ------------------------------------------------------------------ */
const SPLAT_VERT = /* glsl */ `
  attribute vec2 aRef;
  uniform sampler2D uPos;
  uniform vec2 uDenMin;
  uniform vec2 uDenInvSize;
  uniform float uPointSize;
  void main(){
    vec4 P = texture2D(uPos, aRef);
    vec2 nd = (P.xy - uDenMin) * uDenInvSize;   // 0..1
    gl_Position = vec4(nd * 2.0 - 1.0, 0.0, 1.0);
    gl_PointSize = uPointSize;
  }
`;
const SPLAT_FRAG = /* glsl */ `
  precision highp float;
  void main(){
    vec2 c = gl_PointCoord - 0.5;
    float r2 = dot(c, c) * 4.0;
    float g = exp(-r2 * 2.8);
    gl_FragColor = vec4(g);
  }
`;

/* ------------------------------------------------------------------ */
/* Render: one instanced draw. The quad reads its centre + angle from  */
/* the position texture, rotates, and samples its shape's atlas cell.  */
/* ------------------------------------------------------------------ */
const RENDER_VERT = /* glsl */ `
  attribute vec2 aRef;    // uv into the sim texture
  attribute float aShape; // atlas cell index
  attribute vec3 aColor;
  attribute float aSeed;  // per-instance z jitter for stable overlap order
  uniform sampler2D uPos;
  uniform float uQuad;
  uniform float uAtlasCols;
  varying vec2 vUv;
  varying vec3 vColor;
  void main(){
    vec4 P = texture2D(uPos, aRef);
    float ca = cos(P.z), sa = sin(P.z);
    vec2 local = position.xy * uQuad;
    vec2 rot = vec2(local.x * ca - local.y * sa, local.x * sa + local.y * ca);
    // z stays 0 — this is a flat XY plane. Overlap order comes from the draw
    // order (painter's), not depth, so there is no 3D read at all.
    vec3 world = vec3(P.xy + rot, 0.0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(world, 1.0);
    float cx = mod(aShape, uAtlasCols);
    float cy = floor(aShape / uAtlasCols);
    vUv = (vec2(cx, cy) + (position.xy + 0.5)) / uAtlasCols;
    vColor = aColor;
  }
`;
const RENDER_FRAG = /* glsl */ `
  precision highp float;
  uniform sampler2D uAtlas;
  varying vec2 vUv;
  varying vec3 vColor;
  void main(){
    float a = texture2D(uAtlas, vUv).a;
    if (a < 0.02) discard;
    // The atlas alpha IS the edge — it is a mipmapped, linearly filtered bake
    // of the silhouette, so it carries its own antialiasing and alpha blending
    // resolves it. Nothing here needs MSAA (which would only touch the quad
    // borders, and those are transparent).
    gl_FragColor = vec4(vColor, a);
  }
`;

/* ------------------------------------------------------------------ */
/* Bake the 13 silhouettes into one atlas render target (once).        */
/* ------------------------------------------------------------------ */
// One scene, all 13 shapes placed at their cell centres, a single ortho
// render that frames the whole grid. (The earlier per-cell scissor/viewport
// approach rendered unreliably — the sampler fell back to a white texture and
// every quad drew as a solid square.) Cell world = 1 unit; each shape is
// scaled so its ATLAS_FRAME half-extent maps to half a cell.
const bakeAtlas = (gl) => {
  const cellPx = 160;
  const px = cellPx * ATLAS_COLS;
  const rt = new THREE.WebGLRenderTarget(px, px, {
    minFilter: THREE.LinearMipmapLinearFilter,
    magFilter: THREE.LinearFilter,
    generateMipmaps: true,
  });
  const scene = new THREE.Scene();
  // Camera frames [0, ATLAS_COLS] on both axes, y-up, origin bottom-left —
  // matching the sampler's cell math in RENDER_VERT.
  const cam = new THREE.OrthographicCamera(
    0,
    ATLAS_COLS,
    ATLAS_COLS,
    0,
    -1,
    1,
  );
  const mat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
  const scale = 0.5 / ATLAS_FRAME; // shape half-extent → half a cell
  SHAPES.forEach((shape, i) => {
    const cx = i % ATLAS_COLS;
    const cy = Math.floor(i / ATLAS_COLS);
    const geo = shape.geo();
    const mesh = new THREE.Mesh(geo, mat);
    mesh.scale.setScalar(scale);
    mesh.position.set(cx + 0.5, cy + 0.5, 0);
    scene.add(mesh);
  });
  const prevTarget = gl.getRenderTarget();
  gl.setRenderTarget(rt);
  gl.setClearColor(0x000000, 0);
  gl.clear();
  gl.render(scene, cam);
  gl.setRenderTarget(prevTarget);
  scene.traverse((o) => o.geometry && o.geometry.dispose());
  mat.dispose();
  return rt;
};

/* ------------------------------------------------------------------ */
/* The simulation. Everything from state textures to the drawn mesh.   */
/* ------------------------------------------------------------------ */
const Sim = ({
  hw,
  hh,
  theme,
  accent,
  lowTier,
  reducedMotion,
  started,
  paused,
}) => {
  const { gl, camera } = useThree();
  const grid = lowTier ? SIM_LOW : SIM;
  const N = grid.w * grid.h;

  // Pointer state (swept segment + world velocity). A ref, not state: it is
  // touched every frame and must not cost a render.
  const pointer = useRef({
    ax: 999,
    ay: 999,
    bx: 999,
    by: 999,
    vx: 0,
    vy: 0,
    r: 1.0,
    on: false,
    idle: 0,
  });
  const ndc = useRef(new THREE.Vector2(2, 2));
  const prevWorld = useRef(new THREE.Vector3(999, 999, 0));

  // --- one-time GPU setup: atlas, compute renderer, density pass, mesh. ---
  const rig = useMemo(() => {
    const atlas = bakeAtlas(gl);

    const gpu = new GPUComputationRenderer(grid.w, grid.h, gl);
    const pos0 = gpu.createTexture();
    const vel0 = gpu.createTexture();
    const rand = mulberry32(20260725);

    const totalW = SHAPES.reduce((s, g) => s + g.weight, 0);
    const aShape = new Float32Array(N);
    const toneIndex = new Float32Array(N);
    const aSeed = new Float32Array(N);
    const aRef = new Float32Array(N * 2);

    const pd = pos0.image.data;
    const vd = vel0.image.data;
    for (let i = 0; i < N; i++) {
      // Weighted shape pick.
      let roll = rand() * totalW;
      let si = 0;
      while (si < SHAPES.length - 1 && (roll -= SHAPES[si].weight) > 0) si++;
      aShape[i] = si;
      aSeed[i] = rand();
      const gx = i % grid.w;
      const gy = (i / grid.w) | 0;
      aRef[i * 2] = (gx + 0.5) / grid.w;
      aRef[i * 2 + 1] = (gy + 0.5) / grid.h;
      toneIndex[i] = pickTone(rand, SHAPES[si].wire);

      if (reducedMotion) {
        // Pre-settled lattice — no spawn animation, no motion.
        const cols = Math.max(1, Math.floor((hw * 2) / REST_PITCH));
        const col = i % cols;
        const row = (i / cols) | 0;
        pd[i * 4] = -hw + SIZE + col * REST_PITCH + (rand() - 0.5) * 0.02;
        pd[i * 4 + 1] = -hh + SIZE + row * REST_PITCH;
        pd[i * 4 + 2] = rand() * Math.PI * 2;
        pd[i * 4 + 3] = 0; // spare channel
        vd[i * 4] = vd[i * 4 + 1] = vd[i * 4 + 2] = 0;
        vd[i * 4 + 3] = SHAPES[si].r; // radius, not a velocity — see below
        continue;
      }

      // No drop, no clump. The roster spawns as an already-settled bed along
      // the bottom (same lattice the reduced-motion path uses) and is nudged
      // with a gentle sinusoidal slosh, so the opening reads as a calm body of
      // water rippling — not as objects falling in from the top. There is no
      // over-compression here (bodies sit at rest spacing), so there is no
      // stored pressure to release, i.e. no blast.
      const cols = Math.max(1, Math.floor((hw * 2) / REST_PITCH));
      const col = i % cols;
      const row = (i / cols) | 0;
      const bx = -hw + SIZE + col * REST_PITCH + (rand() - 0.5) * 0.02;
      const by = -hh + SIZE + row * REST_PITCH;
      pd[i * 4] = bx;
      pd[i * 4 + 1] = by;
      pd[i * 4 + 2] = rand() * Math.PI * 2; // angle
      pd[i * 4 + 3] = 0; // spare channel
      // Low rolling wave: vertical velocity varies along x, so the surface
      // undulates. The density-leveling + thin damping carry it across the tank
      // as a slow swell before it calms. Amplitude is small on purpose — a
      // ripple, not a splash.
      vd[i * 4] = 0;
      vd[i * 4 + 1] = Math.sin(bx * 1.6 + by * 0.6) * SPAWN_WAVE;
      // No spin: a resting bed is not tumbling.
      vd[i * 4 + 2] = 0;
      // .a is the body's collision half-extent, which the pairwise pass reads
      // off its NEIGHBOURS to size each contact. It rides in the velocity
      // texture because that is the only free channel — position .z is the
      // angle — and the velocity shader passes .a through untouched, so it
      // survives every step.
      vd[i * 4 + 3] = SHAPES[si].r;
    }

    // Both loops need the grid dimensions as compile-time constants (GLSL ES
    // 1.0 loop bounds can't be uniforms), so bake them in as defines.
    const defs = `#define TEXW ${grid.w}\n#define TEXH ${grid.h}\n`;
    const posVar = gpu.addVariable("texturePosition", defs + POSITION_FRAG, pos0);
    const velVar = gpu.addVariable("textureVelocity", defs + VELOCITY_FRAG, vel0);
    gpu.setVariableDependencies(posVar, [posVar, velVar]);
    gpu.setVariableDependencies(velVar, [posVar, velVar]);

    const denMin = new THREE.Vector2(-DEN_HW, -DEN_HH);
    const denInv = new THREE.Vector2(1 / (2 * DEN_HW), 1 / (2 * DEN_HH));
    const denTexel = new THREE.Vector2(1 / DEN_W, 1 / DEN_H);

    Object.assign(posVar.material.uniforms, {
      uDt: { value: 1 / 60 },
      uHalfW: { value: hw },
      uFloorY: { value: -hh },
      uCeilY: { value: hh },
    });
    Object.assign(velVar.material.uniforms, {
      uDt: { value: 1 / 60 },
      uHalfW: { value: hw },
      uFloorY: { value: -hh },
      uCeilY: { value: hh },
      // Gravity is the clock the whole sim is read against: a surface wave
      // travels at ~sqrt(g·depth) and a splash rises and falls on sqrt(g), so
      // this number sets how FAST water looks, independent of how it is shaped.
      // At 12 the bed was correctly shaped but ran at roughly half the tempo the
      // eye expects and read as a slurry. 22 is the value where the fall of a
      // splash and the travel of a swell both land in the window that reads as
      // water rather than as syrup; it is the primary tempo knob and every
      // other number here that has units of speed or force moves with it. uMaxSpeed and uDenMaxAcc move with it.
      uGravity: { value: -22.0 },
      // Ambient drag — the bulk "viscosity" knob, and the term that decides
      // whether a wave crosses the tank or dies in front of the cursor. It is
      // uniform in space, so unlike the contact terms it cannot distinguish a
      // wave from bulk motion: every bit of it is subtracted from wave travel.
      // Thin, so a disturbance survives the trip.
      uDamping: { value: 0.3 },
      // Has to clear the speed the compressed spawn clump springs open at, or
      // the opening second is clipped to a uniform crawl. With the thinner
      // damping, gravity's terminal (uGravity / uDamping) is ~45, so this — not
      // drag — is now what caps a long fall, and it is the knob that decides how
      // fast a splash is allowed to be. Raised with gravity; too low and every
      // energetic event is shaved back to the same speed and looks uniform.
      uMaxSpeed: { value: 26.0 },
      // Settle threshold and drag. This is a wave killer if it is generous: the
      // tail of a ripple crossing a resting bed IS slow, supported motion, which
      // is exactly what the test looks for, so a wide window mows down every
      // wave the moment it stops being violent. Narrow window, gentle drag —
      // enough that the bed eventually stops churning, not enough to sit on a
      // travelling disturbance. It also has to stay clear of the slow shaping
      // the cohesion terms do (levelling a crest, drawing the meniscus).
      uDead: { value: 0.1 },
      uSleep: { value: 5.0 },
      // Spin is derived from horizontal speed, so it scales with uMaxSpeed —
      // keep it low enough that a flung shape rolls rather than blurs.
      uRoll: { value: 0.55 },
      uDensity: { value: null },
      uDenMin: { value: denMin },
      uDenInvSize: { value: denInv },
      uDenTexel: { value: denTexel },
      uDenPush: { value: 0.8 },
      // Strictly under |uGravity| — leveling and buoyancy, never lift. Moved up
      // with gravity: this is the term that makes a displaced surface flow
      // BACK, so pinning it while gravity rose would have left the levelling
      // sluggish relative to everything else and swells would sit there.
      uDenMaxAcc: { value: 15.0 },
      // Has to hold up the whole column resting on it, not just one body, so it
      // is the same order as uColRepel. Stiff also means a shallow rest offset.
      uWallPush: { value: 520.0 },
      // Cohesion support radius, and the neighbour loop's early-out. ~1.9x the
      // widest contact spacing: a body has to see past the ring it is touching
      // for the centre-of-mass pull to mean anything (with a support that only
      // reached its contacts, com would sit on the contact ring itself and the
      // term would be noise). Costs nothing in the loop — it is already O(n^2)
      // over every texel; the cutoff only skips arithmetic, not fetches.
      uCohR: { value: MAX_R * 2 * 1.2 * 1.9 },
      // Surface tension. A body at a free surface sees com roughly a fifth of
      // the support inward (~0.17), so this lands near 3.4 of acceleration
      // against gravity's 22 — enough to round a crest and hold a flung clump
      // together, not enough to lift the bed off the floor.
      //
      // Deliberately kept a minority of gravity. Surface tension is a smoothing
      // force on the skin, so it does not just shape waves, it ERASES the small
      // ones: at a third of gravity the bed's surface was ironed flat and only
      // the largest swells survived. At water's scale gravity dominates and
      // capillary effects are a detail; that ratio is what the eye reads.
      uSurfTen: { value: 20.0 },
      uSurfMax: { value: 6.0 },
      // XSPH rate. Over a frame (5 substeps at dt/5) this blends ~12% of the
      // way to the neighbourhood mean velocity. Enough to stop the bed shearing
      // like dry sand, deliberately short of the value where a neighbourhood
      // matches velocity within a frame or two — at that point momentum stops
      // PROPAGATING and starts teleporting, a region hit at one end moves
      // rigidly as a slab, and the velocity DIFFERENCES that a wave is made of
      // are averaged away before the wave can travel. Water passes a shove
      // along contact by contact, with the delay that implies; a small per-step
      // blend is what leaves room for that delay to be visible.
      uVisc: { value: 8.0 },
      // Wetting band, in multiples of the body's wall stand-off (and of the
      // cursor reach). 2.2 gives a meniscus about one body deep.
      uAdhSpan: { value: 2.2 },
      // Only has to cancel surface tension's inward drag at the boundary, so it
      // is the same order as uSurfMax and two below the wall penalty.
      uAdhesion: { value: 9.0 },
      // Rest spacing = (r_i + r_j) * this. Above 1 because these are flat
      // silhouettes with soft alpha edges — touching at exactly r_i + r_j reads
      // as grazing, not as separated. Tuned so the mean pair (2 × 0.17 × 1.2 ≈
      // 0.41) lands on the 0.4 the shared-radius version used, keeping the bed
      // at the density that was already dialled in.
      uColSpacing: { value: COL_SPACING },
      // This is now the ONLY collider, so it has to be stiff: a linear spring
      // maxes out at uColRepel per neighbour, and a body at the bottom of a
      // five-deep bed has to push back the weight of all five. At 10 it could
      // not even hold up one, which is why the bed used to sink into itself
      // and lean on the (unopposable) position pass instead. At ~140 the
      // bottom row equilibrates around a tenth of a radius of overlap.
      //
      // It is also the bed's SPEED OF SOUND (c ~ sqrt(k)), i.e. how fast a
      // disturbance crosses the tank, so it was raised alongside gravity: a
      // stiffer bed both carries the heavier column at the same overlap and
      // propagates a stroke visibly rather than as a slow bulge.
      // Stable at this stiffness because of SUBSTEPS: omega*dt_sub ~ 0.09, which
      // is why the substep count went up alongside it.
      uColRepel: { value: 265.0 },
      // Cubic weight. At the ~0.1 overlap a settled bed equilibrates at this
      // adds 0.15 to a 0.1 linear term (invisible); at 0.3 overlap it adds 4.0,
      // i.e. the pair sees ~600 of repulsion and simply cannot be pushed
      // deeper. That is the "wall" the old linear-only spring never had.
      uColStiffen: { value: 150.0 },
      // Raised from 220: the whole point of the cubic term is the force it can
      // reach at depth, and the old ceiling clipped it back to roughly the
      // cursor's own strength. Still a backstop — normal contact in a resting
      // bed sits two orders under it — but now above the cursor, not level.
      uColMaxAcc: { value: 1150.0 },
      uColSoftAcc: { value: SOFT_MAX_ACC },
      uRelease: { value: 0 },
      // Contact viscosity — the fraction of a collision's closing velocity that
      // is destroyed rather than returned, and THE reason the bed had no waves.
      // A wave through a particle bed just IS a chain of closing contacts, so
      // this number is, almost literally, the per-contact wave attenuation. At
      // 0.45 a disturbance lost nearly half its energy at every body it passed
      // and died within a couple of body widths of wherever it started — a bed
      // that absorbs, not one that carries. Low, so contacts pass a shove on
      // and a stroke at one end is still visible at the other. Non-penetration
      // does not depend on it: the ramp below still takes deep contacts to a
      // full projection, so livelier is not sloppier.
      uColDamp: { value: 0.16 },
      // Knee and top of the hard-stop ramp, as a fraction of the pair spacing.
      // A settled bed equilibrates around 0.12 overlap, so the knee sits just
      // above it: rest keeps the soft, energy-absorbing contact it needs to
      // stop boiling, while anything the cursor drives deeper hits a full
      // projection well before the shapes' silhouettes touch.
      uColHardAt: { value: 0.14 },
      uColHardFull: { value: 0.3 },
      uMouseA: { value: new THREE.Vector2(999, 999) },
      uMouseB: { value: new THREE.Vector2(999, 999) },
      uMouseVel: { value: new THREE.Vector2() },
      uMouseOn: { value: 0 },
      uMouseR: { value: 1.0 },
      // Has to out-shove the contact springs to plow a channel through a packed
      // bed, so it scales with uColRepel rather than with gravity.
      uMousePush: { value: 265.0 },
      // Lowered with the falloff change: carry is the term that most directly
      // reads as "the cursor is holding the fluid". At 11, under the old broad
      // field, a stroke handed its own velocity to a large slab at once. Now it
      // sets a small region moving and the rest inherits that through contacts,
      // which is the transfer the fluid is supposed to be doing.
      uMouseCarry: { value: 9.0 },
      uMouseCling: { value: 6.0 },
      // Film thickness, ~one body across. Absolute world units, so a fast
      // stroke does not widen it.
      uMouseSkin: { value: SIZE * 2.2 },
    });

    const err = gpu.init();
    if (err !== null) {
      atlas.dispose();
      return { failed: true };
    }

    // Density pass.
    const denRT = new THREE.WebGLRenderTarget(DEN_W, DEN_H, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      type: THREE.HalfFloatType,
      depthBuffer: false,
    });
    const denScene = new THREE.Scene();
    const denCam = new THREE.Camera();
    const denGeo = new THREE.BufferGeometry();
    denGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(N * 3), 3),
    );
    denGeo.setAttribute("aRef", new THREE.BufferAttribute(aRef, 2));
    const splatWorld = SIZE * 2.6;
    const denMat = new THREE.ShaderMaterial({
      uniforms: {
        uPos: { value: null },
        uDenMin: { value: denMin },
        uDenInvSize: { value: denInv },
        uPointSize: { value: (splatWorld / (2 * DEN_HW)) * DEN_W * 2 },
      },
      vertexShader: SPLAT_VERT,
      fragmentShader: SPLAT_FRAG,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      depthWrite: false,
    });
    const denPoints = new THREE.Points(denGeo, denMat);
    denPoints.frustumCulled = false;
    denScene.add(denPoints);

    // Instanced render geometry.
    const base = new THREE.PlaneGeometry(1, 1);
    const geo = new THREE.InstancedBufferGeometry();
    geo.index = base.index;
    geo.attributes.position = base.attributes.position;
    geo.attributes.uv = base.attributes.uv;
    geo.instanceCount = N;
    geo.setAttribute("aRef", new THREE.InstancedBufferAttribute(aRef, 2));
    geo.setAttribute("aShape", new THREE.InstancedBufferAttribute(aShape, 1));
    geo.setAttribute("aSeed", new THREE.InstancedBufferAttribute(aSeed, 1));
    const colorAttr = new THREE.InstancedBufferAttribute(
      new Float32Array(N * 3),
      3,
    );
    geo.setAttribute("aColor", colorAttr);

    const renderMat = new THREE.ShaderMaterial({
      uniforms: {
        uPos: { value: null },
        uAtlas: { value: atlas.texture },
        uQuad: { value: QUAD },
        uAtlasCols: { value: ATLAS_COLS },
        },
      vertexShader: RENDER_VERT,
      fragmentShader: RENDER_FRAG,
      // Flat 2D: no depth, so overlaps layer by draw order (painter's) with no
      // 3D read and no z-fighting. Alpha-blended soft edges from the atlas.
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });
    base.dispose();

    return {
      failed: false,
      gpu,
      posVar,
      velVar,
      atlas,
      denRT,
      denScene,
      denCam,
      denMat,
      denGeo,
      geo,
      renderMat,
      colorAttr,
      toneIndex,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gl, lowTier]);

  const meshRef = useRef(null);
  const wallCur = useRef({ hw, hh });
  // Counts only stepped time, so a hero that spends its first seconds scrolled
  // past or in a hidden tab still gets its full spawn when it is finally seen.
  const releaseT = useRef(0);

  // Palette → per-instance rgb. Re-runs on theme/accent change; never rebuilds
  // the sim, so a colour swap is instant and the bed keeps its motion.
  useEffect(() => {
    if (!rig || rig.failed) return;
    const tones = THEME_TONES[theme] || THEME_TONES.dark;
    const a = getAccent(accent);
    // The render shader writes gl_FragColor raw (no sRGB encode), so the stored
    // rgb must already be the display-space values. Colors come out linear, so
    // convert them back to sRGB numbers or greys go near-black and violet reads
    // as indigo.
    const palette = [
      ...tones.solid.map((hex) => new THREE.Color(hex).convertLinearToSRGB()),
      ...tones.wire.map((hex) => new THREE.Color(hex).convertLinearToSRGB()),
      new THREE.Color()
        .setHSL(a.h / 360, a.s / 100, a.l / 100, THREE.SRGBColorSpace)
        .convertLinearToSRGB(),
    ];
    const arr = rig.colorAttr.array;
    const idx = rig.toneIndex;
    for (let i = 0; i < N; i++) {
      const c = palette[idx[i]] || palette[0];
      arr[i * 3] = c.r;
      arr[i * 3 + 1] = c.g;
      arr[i * 3 + 2] = c.b;
    }
    rig.colorAttr.needsUpdate = true;
  }, [rig, theme, accent, N]);

  // Pointer listeners.
  useEffect(() => {
    if (reducedMotion) return undefined;
    const onMove = (e) => {
      const rect = gl.domElement.getBoundingClientRect();
      ndc.current.set(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -(((e.clientY - rect.top) / rect.height) * 2 - 1),
      );
    };
    const onLeave = () => ndc.current.set(2, 2);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [gl, reducedMotion]);

  // Pointer → swept segment + enveloped world velocity.
  useFrame((_, delta) => {
    if (reducedMotion) return;
    const pt = pointer.current;
    if (ndc.current.x > 1.5) {
      pt.on = false;
      pt.vx = 0;
      pt.vy = 0;
      pt.idle = 0;
      prevWorld.current.set(999, 999, 0);
      return;
    }
    const w = new THREE.Vector3(
      ndc.current.x,
      ndc.current.y,
      0,
    ).unproject(camera);
    const fresh = prevWorld.current.x > 500;
    if (fresh) prevWorld.current.copy(w);
    const k = 1 / Math.max(delta, 1e-4);
    const ivx = (w.x - prevWorld.current.x) * k;
    const ivy = (w.y - prevWorld.current.y) * k;
    const rising = ivx * ivx + ivy * ivy > pt.vx * pt.vx + pt.vy * pt.vy;
    const a = smoothK(rising ? 0.6 : 0.08, delta);
    pt.vx += (ivx - pt.vx) * a;
    pt.vy += (ivy - pt.vy) * a;
    pt.ax = prevWorld.current.x;
    pt.ay = prevWorld.current.y;
    pt.bx = w.x;
    pt.by = w.y;
    const speed = Math.hypot(pt.vx, pt.vy);
    // Reach, and it has to stay a LOCAL object. The old ceiling of 3.0 is
    // within a hair of the tank's half-height (REST_HH 3.64), so a fast stroke
    // anywhere on the page had the entire bed inside its radius and the pile
    // moved with the cursor as one piece — including when the cursor was well
    // above the surface, in empty air. The speed term is kept (a fast stroke
    // does sweep a wider swath) but scaled and capped so the cursor never grows
    // past a few bodies across.
    pt.r = Math.min(1.8, 1.0 + speed * 0.05);
    // A parked cursor is NOT a force. The shove is applied every substep, so a
    // cursor that stops moving but stays "on" is a permanent fountain that the
    // bed can never settle under. Idle for a beat → the field switches off.
    pt.idle = Math.hypot(ivx, ivy) < 0.05 ? pt.idle + delta : 0;
    pt.on = pt.idle < 0.15;
    prevWorld.current.copy(w);
  });

  // Main step: density splat → compute → bind fresh positions for the draw.
  useFrame((_, delta) => {
    if (!rig || rig.failed) return;
    const bindPos = () => {
      rig.renderMat.uniforms.uPos.value = rig.gpu.getCurrentRenderTarget(
        rig.posVar,
      ).texture;
    };
    if (reducedMotion || paused || !started) {
      // Show the last (or initial) frame; don't advance.
      bindPos();
      return;
    }

    const dt = Math.min(delta, 1 / 30);
    // Substep COUNT adapts to framerate so the sub-dt stays ~FIXED_SUB — the
    // value the spring is stable at. At 60fps this is exactly SUBSTEPS; on a
    // throttled (battery) tab dt grows and the count grows with it instead of
    // the sub-dt, which is what keeps the bed from buzzing when fps drops.
    const nSub = Math.max(
      1,
      Math.min(MAX_SUBSTEPS, Math.round(dt / FIXED_SUB)),
    );
    const sub = dt / nSub;

    releaseT.current = Math.min(RELEASE_TIME, releaseT.current + dt);
    const rp = releaseT.current / RELEASE_TIME;

    const wc = wallCur.current;
    const wk = smoothK(0.08, dt);
    wc.hw += (hw - wc.hw) * wk;
    wc.hh += (hh - wc.hh) * wk;

    const vU = rig.velVar.material.uniforms;
    const pU = rig.posVar.material.uniforms;
    vU.uDt.value = sub;
    pU.uDt.value = sub;
    // Smoothstepped: a linear ramp has a corner at each end, and the one at t=0
    // is audible as a small kick the instant the sim starts.
    vU.uRelease.value = rp * rp * (3 - 2 * rp);
    vU.uHalfW.value = pU.uHalfW.value = wc.hw;
    vU.uFloorY.value = pU.uFloorY.value = -wc.hh;
    vU.uCeilY.value = pU.uCeilY.value = wc.hh;

    const p = pointer.current;
    vU.uMouseOn.value = p.on ? 1 : 0;
    vU.uMouseA.value.set(p.ax, p.ay);
    vU.uMouseB.value.set(p.bx, p.by);
    vU.uMouseVel.value.set(p.vx, p.vy);
    vU.uMouseR.value = p.r;

    // Density splat from the current positions (once per frame — it only
    // drives the slow leveling/flow-back, so it need not track every substep).
    const posTex = rig.gpu.getCurrentRenderTarget(rig.posVar).texture;
    rig.denMat.uniforms.uPos.value = posTex;
    const prevTarget = gl.getRenderTarget();
    gl.setRenderTarget(rig.denRT);
    gl.setClearColor(0x000000, 0);
    gl.clear(true, false, false);
    gl.render(rig.denScene, rig.denCam);
    gl.setRenderTarget(prevTarget);
    vU.uDensity.value = rig.denRT.texture;

    // Substepped integration: the collider is re-solved SUBSTEPS times at the
    // small timestep, which is what lets it be stiff (near-rigid) and stable.
    for (let s = 0; s < nSub; s++) rig.gpu.compute();
    bindPos();
  });

  useEffect(
    () => () => {
      if (!rig || rig.failed) return;
      rig.gpu.dispose?.();
      rig.atlas.dispose();
      rig.denRT.dispose();
      rig.denGeo.dispose();
      rig.denMat.dispose();
      rig.geo.dispose();
      rig.renderMat.dispose();
    },
    [rig],
  );

  if (!rig || rig.failed) return null;
  // Hidden until the sim actually steps. The spawn state is a tight, hugely
  // over-compressed clump, and holding it on screen while the loader runs shows
  // the audience the trick: a dense knot parked at the centre for however long
  // the page takes, which then lurches into motion. The old emitter hid this for
  // free (un-emitted bodies were pushed off screen), so removing it took the
  // cover away with it. Nothing is drawn until the first stepped frame, so the
  // clump's first appearance and its first movement are the same frame.
  //
  // Not gated on `paused` — that fires when the hero is scrolled past, where the
  // bed is settled and freezing it is exactly right.
  return (
    <mesh
      ref={meshRef}
      visible={reducedMotion || started}
      geometry={rig.geo}
      material={rig.renderMat}
      frustumCulled={false}
    />
  );
};

/* ------------------------------------------------------------------ */
/* Orthographic sizing: narrow viewports zoom OUT so more shapes fit.  */
/* ------------------------------------------------------------------ */
const Scene = (props) => {
  const { camera, size } = useThree();
  const hh = REST_HH * Math.max(1, Math.min(1.3, 1100 / size.width));
  const hw = hh * (size.width / size.height);
  const targetZoom = size.height / 2 / hh;
  const primed = useRef(false);
  useFrame((_, delta) => {
    const dz = targetZoom - camera.zoom;
    if (!primed.current) {
      primed.current = true;
      camera.zoom = targetZoom;
      camera.updateProjectionMatrix();
    } else if (Math.abs(dz) > 0.01) {
      camera.zoom += dz * smoothK(0.06, delta);
      camera.updateProjectionMatrix();
    }
  });
  return <Sim hw={hw} hh={hh} {...props} />;
};

/**
 * GPU shape-fluid behind the landing hero. A few hundred flat 2D forms (disc,
 * ellipse, triangle, square, pentagon, hexagon, pill, bar, bowtie, ring, plus,
 * and two accent glyph wireframes) burst out of a clump at the centre, splash
 * up the walls and settle into a bed along the bottom, then behave like a body
 * of water: the surface levels, waves travel, buried shapes float up, and the
 * cursor plows a swept channel that the bed flows back over.
 *
 * The simulation runs entirely on the GPU — particle position/velocity in float
 * textures, integrated in fragment shaders, with a density field standing in
 * for collisions. No physics worker, no per-body CPU loop.
 */
const PhysicsHero = () => {
  const { theme, accent } = useApp();
  const containerRef = useRef(null);
  const [running, setRunning] = useState(true);
  const [paused, setPaused] = useState(false);
  const [started, setStarted] = useState(isAppReady);
  useEffect(() => onAppReady(() => setStarted(true)), []);

  const lowTier = useMemo(() => isLowTier(), []);
  const reducedMotion = useMemo(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return undefined;
    let visible = true;
    let covered = false;
    const sync = () => {
      setRunning(visible && !document.hidden);
      setPaused(covered);
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    io.observe(node);
    const onScroll = () => {
      const buffer = window.innerHeight;
      const uncoverAt = node.clientHeight + buffer * 0.5;
      const coverAt = node.clientHeight + buffer;
      const nowCovered = covered
        ? window.scrollY > uncoverAt
        : window.scrollY > coverAt;
      if (nowCovered !== covered) {
        covered = nowCovered;
        sync();
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  const simPaused = paused || !started;

  return (
    <div className="physics-hero" ref={containerRef} aria-hidden="true">
      <Canvas
        frameloop={running ? "always" : "demand"}
        // DPR only sizes the canvas backbuffer — it does NOT touch the sim,
        // whose state texture (20x15) and density target (128x80) are fixed
        // sizes regardless of the display. The draw it does affect is ~300
        // small quads, not a fullscreen pass, so the old 1.5 cap was guarding
        // against a cost that was never there and just left shapes soft on
        // retina. 2 is the useful ceiling: the atlas bakes each shape into a
        // 160px cell and a quad covers ~57 CSS px, so 2x still samples under
        // the atlas resolution while 3x would start magnifying it.
        dpr={[1, lowTier ? 1.5 : Math.min(window.devicePixelRatio, 2)]}
        orthographic
        camera={{ position: [0, 0, 10], zoom: 120, near: 0.1, far: 100 }}
        flat
        gl={{
          // MSAA smooths GEOMETRY edges, and every geometry edge in this scene
          // is a quad border that is fully transparent — the visible edge of a
          // shape is alpha out of the atlas, resolved by blending. So MSAA was
          // paying full backbuffer bandwidth (the real DPR cost) to antialias
          // edges that are not drawn. Off, that budget goes to the DPR above,
          // which sharpens the edges MSAA was never touching.
          antialias: false,
          powerPreference: "high-performance",
          alpha: true,
          stencil: false,
        }}
      >
        <Scene
          theme={theme}
          accent={accent}
          lowTier={lowTier}
          reducedMotion={reducedMotion}
          started={started}
          paused={simPaused}
        />
      </Canvas>
    </div>
  );
};

export default PhysicsHero;
