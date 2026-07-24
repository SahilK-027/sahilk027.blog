import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Physics, useBox, useSphere } from "@react-three/cannon";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { useApp } from "../../context/AppContext";
import { getAccent } from "../../data/accents";
import { isAppReady, onAppReady } from "../../hooks/appReady";
import "./PhysicsHero.scss";

// Perf tier: mobile / low-end devices get fewer bodies and a tighter DPR.
// Physics itself runs in a worker either way.
const isLowTier = () =>
  window.innerWidth < 768 ||
  (navigator.hardwareConcurrency || 8) <= 4 ||
  (navigator.deviceMemory || 8) <= 4;

// Marble + glass look, tinted per theme. Glass is the cheap kind
// (transparent + clearcoat, no transmission pass).
const THEME_MATERIALS = {
  // Dark marble must stay truly black: the env map + ambient wash a dark
  // albedo toward gray, so both are kept low and the shine comes from the
  // clearcoat specular instead.
  dark: {
    marble: "#0a0a0c",
    glass: "#2a2a2a",
    ambient: 0.1,
    key: 1.3,
    fill: 0.25,
    envIntensity: 0.4,
  },
  light: {
    marble: "#f4f4f6",
    glass: "#fafafa",
    ambient: 0.7,
    key: 0.9,
    fill: 0.4,
    envIntensity: 1.1,
  },
};

// Deterministic PRNG (mulberry32): same pile composition on every reload.
const mulberry32 = (a) => () => {
  a |= 0;
  a = (a + 0x6d2b79f5) | 0;
  let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

// Turns a faceted solid into a HOLLOW FRAME: every unique edge becomes a
// thick cylinder, every corner a sphere joint, merged into one geometry.
// Faces are gone — the shape is its own scaffolding.
const tubeFrame = (solid, radius) => {
  const edges = new THREE.EdgesGeometry(solid, 8);
  const pos = edges.attributes.position;
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  const up = new THREE.Vector3(0, 1, 0);
  const dir = new THREE.Vector3();
  const quat = new THREE.Quaternion();
  const parts = [];
  const joints = new Map();
  const jointKey = (v) =>
    `${v.x.toFixed(3)},${v.y.toFixed(3)},${v.z.toFixed(3)}`;
  for (let i = 0; i < pos.count; i += 2) {
    a.fromBufferAttribute(pos, i);
    b.fromBufferAttribute(pos, i + 1);
    const len = a.distanceTo(b);
    if (len < 1e-4) continue;
    const beam = new THREE.CylinderGeometry(radius, radius, len, 6, 1, true);
    dir.subVectors(b, a).normalize();
    quat.setFromUnitVectors(up, dir);
    beam.applyQuaternion(quat);
    beam.translate((a.x + b.x) / 2, (a.y + b.y) / 2, (a.z + b.z) / 2);
    parts.push(beam);
    for (const v of [a, b]) {
      const key = jointKey(v);
      if (!joints.has(key)) {
        const joint = new THREE.SphereGeometry(radius, 6, 5);
        joint.translate(v.x, v.y, v.z);
        joints.set(key, joint);
        parts.push(joint);
      }
    }
  }
  const merged = mergeGeometries(parts);
  parts.forEach((p) => p.dispose());
  edges.dispose();
  solid.dispose();
  return merged;
};

// 3D primitive roster — a MIX of solid bodies and hollow tube-frames.
// Smooth / high-segment shapes (sphere, torus, cylinder, capsule, knot)
// stay solid: their edge graphs are too busy to frame. Simple faceted
// shapes get frame versions; cube, cone and tetrahedron ship BOTH ways so
// solid and scaffold versions of the same form tumble together.
// Every collider is a SPHERE (`cr`): spheres roll past each other and
// never wedge — the 3D geometry is purely visual.
// `geo(s)` builds the shape at size multiplier `s`; the sphere collider
// radius `cr` is scaled by the same `s` at body-creation time. Shrinking `s`
// on narrow viewports lets more shapes share a small floor without clutter.
const GROUPS = [
  // ---- solids (smooth or too complex to frame) ----
  { geo: (s) => new THREE.SphereGeometry(0.24 * s, 20, 16), cr: 0.24, count: 22 },
  {
    geo: (s) => new THREE.TorusGeometry(0.19 * s, 0.08 * s, 12, 24),
    cr: 0.24,
    count: 14,
  },
  {
    geo: (s) => new THREE.CylinderGeometry(0.17 * s, 0.17 * s, 0.38 * s, 18),
    cr: 0.2,
    count: 14,
  },
  {
    geo: (s) => new THREE.CapsuleGeometry(0.13 * s, 0.22 * s, 6, 12),
    cr: 0.18,
    count: 10,
  },
  { geo: (s) => new THREE.IcosahedronGeometry(0.24 * s, 0), cr: 0.23, count: 14 },
  { geo: (s) => new THREE.DodecahedronGeometry(0.24 * s, 0), cr: 0.22, count: 10 },
  { geo: (s) => new THREE.BoxGeometry(0.36 * s, 0.36 * s, 0.36 * s), cr: 0.23, count: 14 },
  { geo: (s) => new THREE.ConeGeometry(0.22 * s, 0.42 * s, 18), cr: 0.2, count: 12 },
  { geo: (s) => new THREE.TetrahedronGeometry(0.26 * s, 0), cr: 0.17, count: 8 },
  // ---- frames (simple edge graphs → clean scaffolds) ----
  {
    geo: (s) => tubeFrame(new THREE.BoxGeometry(0.36 * s, 0.36 * s, 0.36 * s), 0.028 * s),
    cr: 0.23,
    count: 9,
    frame: true,
  },
  {
    geo: (s) => tubeFrame(new THREE.ConeGeometry(0.22 * s, 0.42 * s, 6), 0.026 * s),
    cr: 0.2,
    count: 8,
    frame: true,
  },
  {
    geo: (s) => tubeFrame(new THREE.TetrahedronGeometry(0.26 * s, 0), 0.03 * s),
    cr: 0.17,
    count: 7,
    frame: true,
  },
  {
    geo: (s) => tubeFrame(new THREE.OctahedronGeometry(0.25 * s, 0), 0.028 * s),
    cr: 0.2,
    count: 8,
    frame: true,
  },
];

// Built-in HDR-ish environment (no network fetch) so marble picks up soft
// reflections and glass reads as glass.
const Env = () => {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const tex = pmrem.fromScene(room, 0.04).texture;
    scene.environment = tex;
    // The room scene's meshes uploaded GPU buffers during the PMREM render;
    // free them — only the generated env texture is needed afterwards.
    room.traverse((obj) => {
      obj.geometry?.dispose();
      obj.material?.dispose();
    });
    return () => {
      scene.environment = null;
      tex.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
  return null;
};

// Walls are OVERSIZED once (they span far past any viewport) and only ever
// TRANSLATED — cannon can't resize a body's collider args after creation, so
// a fixed-size slab that slides is the only way to track a live resize. They
// are Kinematic: moving a kinematic body carries real velocity into the
// solver, so shrinking the viewport physically shoves the existing pile
// inward instead of re-dropping it. WALL/2 must exceed the largest half-
// extent the hero can ever reach.
const WALL = 2; // slab thickness
const SPAN = 80; // slab length — well past any viewport half-extent

/* ------------------------------------------------------------------ */
/* Kinematic bounds: floor at hero bottom + side walls, repositioned to */
/* the live viewport each resize. Translation is locked to xy, so no    */
/* front/back walls needed.                                             */
/* ------------------------------------------------------------------ */
const Bounds = ({ hw, hh }) => {
  const [, floor] = useBox(() => ({
    args: [SPAN, WALL, 4],
    position: [0, -hh - WALL / 2, 0],
    type: "Kinematic",
  }));
  const [, left] = useBox(() => ({
    args: [WALL, SPAN, 4],
    position: [-hw - WALL / 2, 0, 0],
    type: "Kinematic",
  }));
  const [, right] = useBox(() => ({
    args: [WALL, SPAN, 4],
    position: [hw + WALL / 2, 0, 0],
    type: "Kinematic",
  }));
  // Ease walls toward the target size instead of snapping. A teleported
  // kinematic wall carries near-infinite implied velocity and flings/tunnels
  // shapes out through the boundary — over a few resizes the pile visibly
  // thins. Lerping keeps wall speed low: shapes get gently nudged, never
  // ejected.
  const cur = useRef({ fy: -hh - WALL / 2, lx: -hw - WALL / 2, rx: hw + WALL / 2 });
  useFrame(() => {
    const c = cur.current;
    c.fy += (-hh - WALL / 2 - c.fy) * 0.08;
    c.lx += (-hw - WALL / 2 - c.lx) * 0.08;
    c.rx += (hw + WALL / 2 - c.rx) * 0.08;
    floor.position.set(0, c.fy, 0);
    left.position.set(c.lx, 0, 0);
    right.position.set(c.rx, 0, 0);
  });
  return null;
};

// Ceiling mounts separately, AFTER the rain-in: shapes spawn above the
// canvas and fall through where it will be, then the lid seals the
// container so nothing gets flung out the top. Same kinematic slab, tracked
// to the live top edge.
const Ceiling = ({ hh }) => {
  const [, lid] = useBox(() => ({
    args: [SPAN, WALL, 4],
    position: [0, hh + WALL / 2, 0],
    type: "Kinematic",
  }));
  const cur = useRef(hh + WALL / 2);
  useFrame(() => {
    cur.current += (hh + WALL / 2 - cur.current) * 0.08;
    lid.position.set(0, cur.current, 0);
  });
  return null;
};

/* ------------------------------------------------------------------ */
/* Invisible kinematic ball riding the pointer — plows through the     */
/* pile. Big radius = fluid displacement, not single-shape poking.     */
/* ------------------------------------------------------------------ */
const PointerBall = () => {
  const { camera, gl } = useThree();
  const target = useRef(new THREE.Vector2(100, 100));
  const smooth = useRef(new THREE.Vector2(100, 100));
  const lastMove = useRef(0);
  const dir = useRef(new THREE.Vector3());
  const prevHit = useRef(new THREE.Vector3(0, 100, 0));
  const speed = useRef(0);
  // Collider radius can't change at runtime, so two balls are speed-gated:
  // a slow-moving cursor drives the contact-sized one (no "force field"
  // feel), a fast swipe swaps in the big plow.
  const [, apiSmall] = useSphere(() => ({
    args: [0.35],
    type: "Kinematic",
    position: [0, 100, 0],
  }));
  const [, apiLarge] = useSphere(() => ({
    args: [1.0],
    type: "Kinematic",
    position: [0, 100, 0],
  }));

  useEffect(() => {
    const onMove = (e) => {
      const rect = gl.domElement.getBoundingClientRect();
      target.current.set(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      );
      lastMove.current = performance.now();
    };
    const onLeave = () => target.current.set(100, 100);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [gl]);

  useFrame((_, delta) => {
    // Only a MOVING cursor displaces the pile: once the pointer sits still
    // both balls park offscreen, so shapes settle back instead of holding a
    // crater around a stationary cursor.
    const idle = performance.now() - lastMove.current > 250;
    if (target.current.x > 10 || idle) {
      smooth.current.set(100, 100);
      speed.current = 0;
      apiSmall.position.set(0, 100, 0); // parked offscreen
      apiLarge.position.set(0, 100, 0);
      return;
    }
    // Re-entering from parked: snap to the cursor instead of lerping from
    // offscreen — otherwise the ball sweeps across the whole pile.
    if (smooth.current.x > 10) smooth.current.copy(target.current);
    // Light smoothing keeps the kinematic ball's implied velocity sane so
    // it shoves shapes instead of teleporting through them.
    smooth.current.lerp(target.current, 0.6);
    dir.current
      .set(smooth.current.x, smooth.current.y, 0.5)
      .unproject(camera)
      .sub(camera.position)
      .normalize();
    const t0 = -camera.position.z / dir.current.z;
    const hx = camera.position.x + dir.current.x * t0;
    const hy = camera.position.y + dir.current.y * t0;

    // Smoothed cursor speed (world units/s) gates which ball is live.
    const dist = Math.hypot(hx - prevHit.current.x, hy - prevHit.current.y);
    if (prevHit.current.y < 50) {
      const inst = dist / Math.max(delta, 1e-4);
      speed.current += (inst - speed.current) * 0.25;
    }
    prevHit.current.set(hx, hy, 0);

    const fast = speed.current > 3;
    (fast ? apiSmall : apiLarge).position.set(0, 100, 0);
    (fast ? apiLarge : apiSmall).position.set(hx, hy, 0);
  });
  return null;
};

/* ------------------------------------------------------------------ */
/* One instanced mesh + N physics bodies sharing one material.         */
/* ------------------------------------------------------------------ */
const ShapeGroup = ({ group, specs, material, allowSleep }) => {
  const geometry = useMemo(() => group.geo(1), [group]);
  useEffect(() => () => geometry.dispose(), [geometry]);

  const [ref] = useSphere(
    (i) => ({
      mass: 1,
      args: [group.cr],
      position: specs[i].position,
      rotation: specs[i].rotation,
      velocity: specs[i].velocity,
      angularVelocity: specs[i].angularVelocity,
      // Translate in the xy plane only; tumble freely on all axes (sphere
      // colliders make free rotation safe — nothing can wedge).
      linearFactor: [1, 1, 0],
      linearDamping: 0.08,
      angularDamping: 0.45,
      // Sleep is off where a pointer exists: the kinematic pointer ball
      // does not wake sleeping bodies (dead zones ignored the cursor). On
      // touch devices there is no pointer plow, so bodies are allowed to
      // sleep — once the pile settles the worker goes idle.
      allowSleep,
    }),
    useRef(null),
    [group, specs, allowSleep]
  );

  return (
    <instancedMesh
      ref={ref}
      args={[undefined, undefined, specs.length]}
      geometry={geometry}
      material={material}
      frustumCulled={false}
    />
  );
};

const Pile = ({ hw, hh, theme, accent, reducedMotion, started }) => {
  // Spawn layout is frozen to the viewport at MOUNT. Live hw/hh still flow to
  // the walls (which reposition and shove the pile as the window drags), so a
  // resize pushes the existing pile instead of re-dropping it. Shapes are a
  // FIXED world size — narrow viewports look smaller because the camera dollies
  // back (see Scene), fitting more world into frame. Count is constant.
  const spawn = useRef({ hw, hh }).current;
  const scale = 0.8; // count multiplier: fixed, width-independent

  // Lid seals once the rain-in is done (worst-case fall is ~2s with the
  // 10×hh spawn column). The clock only starts once `started` flips — while
  // the loader owns the screen the sim is paused and nothing has fallen yet,
  // so sealing then would trap shapes mid-air above the viewport.
  const [sealed, setSealed] = useState(false);
  useEffect(() => {
    if (!started) return undefined;
    const id = setTimeout(() => setSealed(true), 3600);
    return () => clearTimeout(id);
  }, [started]);

  // Deterministic specs, split per group into marble / glass / accent so
  // each subset renders as its own instanced mesh with the right material.
  // Spawn is staggered above the hero so shapes rain in and settle.
  const groupSpecs = useMemo(() => {
    const rand = mulberry32(20260723);
    return GROUPS.map((group) => {
      // Floor of 5 keeps every shape type well-represented even at the
      // smallest width.
      const count = Math.max(5, Math.round(group.count * scale));
      const marble = [];
      const glass = [];
      const accentSpecs = [];
      for (let i = 0; i < count; i++) {
        const spec = {
          // Tall spawn column: height spread IS the arrival stagger. The
          // squared roll skews spawn heights low, so the rain opens dense
          // and tapers into stragglers (fast → slow).
          position: [
            (rand() * 2 - 1) * spawn.hw * 0.94,
            spawn.hh + 0.6 + Math.pow(rand(), 2) * spawn.hh * 9,
            0,
          ],
          rotation: [rand() * Math.PI, rand() * Math.PI, rand() * Math.PI],
          // Falling bodies tumble and drift — rigid straight-line drops
          // read as fake.
          velocity: [(rand() * 2 - 1) * 1.2, -rand() * 2, 0],
          angularVelocity: [
            (rand() * 2 - 1) * 5,
            (rand() * 2 - 1) * 5,
            (rand() * 2 - 1) * 5,
          ],
        };
        const roll = rand();
        // Frames read best in accent: neutral black/white scaffolds get
        // lost against the solids, so frame groups skew colored (30%
        // accent vs 15% for solids, fewer glass).
        if (group.frame) {
          if (roll < 0.2) glass.push(spec);
          else if (roll < 0.5) accentSpecs.push(spec);
          else marble.push(spec);
        } else if (roll < 0.35) glass.push(spec);
        else if (roll < 0.5) accentSpecs.push(spec);
        else marble.push(spec);
      }
      // The accent roll is only ~15% per shape — small groups can end up
      // with zero. Every shape type must appear in the accent color at
      // least once, so promote one from the biggest neutral subset.
      if (accentSpecs.length === 0) {
        const donor = marble.length >= glass.length ? marble : glass;
        if (donor.length > 1) accentSpecs.push(donor.pop());
      }
      return { group, subsets: [marble, glass, accentSpecs] };
    });
    // Spawn layout depends only on the initial viewport; bodies keep their
    // simulated positions across theme/accent re-renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scale]);

  // Three shared materials (theme marble, theme glass, accent marble);
  // theme/accent switches retint without touching the sim.
  const m = THEME_MATERIALS[theme] || THEME_MATERIALS.dark;
  const materials = useMemo(() => {
    const a = getAccent(accent);
    // The accent is defined as CSS HSL (sRGB). setHSL defaults to the
    // linear working space, which gamma-brightens the color into a pale
    // pastel — declare the input as sRGB so it renders as the exact hue.
    const accentColor = new THREE.Color().setHSL(
      a.h / 360,
      a.s / 100,
      a.l / 100,
      THREE.SRGBColorSpace
    );
    return [
      // Base shapes: proper metal — specular picked out by the key light
      // and env map, not a waxy clearcoat.
      new THREE.MeshPhysicalMaterial({
        color: m.marble,
        roughness: 0.22,
        metalness: 0.9,
        envMapIntensity: m.envIntensity * 1.6,
      }),
      // Contrast tier: rough rubber — fully diffuse, zero specular or env
      // response (dark = matte black, light = matte white), playing against
      // the specular metal shapes.
      new THREE.MeshPhysicalMaterial({
        color: m.glass,
        roughness: 1,
        metalness: 0,
        specularIntensity: 0,
        envMapIntensity: 0,
      }),
      // Accent shapes must read as the exact UI accent: tone mapping and a
      // strong env map both shift the hue, so tone mapping is bypassed and
      // reflections stay subtle — albedo dominates.
      // Exact accent hue: emissive carries the color, the albedo is scaled
      // far down so lights only add faint form shading. Total stays under
      // 1.0 — overshoot clips channels and washed the violet toward pink.
      new THREE.MeshPhysicalMaterial({
        color: accentColor.clone().multiplyScalar(0.6),
        emissive: accentColor,
        emissiveIntensity: 0.5,
        roughness: 1,
        metalness: 0,
        specularIntensity: 0,
        envMapIntensity: 0,
        toneMapped: false,
      }),
    ];
  }, [m, accent]);
  useEffect(
    () => () => materials.forEach((mat) => mat.dispose()),
    [materials]
  );


  return (
    <>
      <ambientLight intensity={m.ambient} />
      <directionalLight position={[4, 6, 6]} intensity={m.key} />
      <directionalLight position={[-5, 2, -3]} intensity={m.fill} />
      <Bounds hw={hw} hh={hh} />
      {sealed && <Ceiling hw={hw} hh={hh} />}
      {!reducedMotion && <PointerBall />}
      {groupSpecs.map(({ group, subsets }, gi) =>
        subsets.map(
          (specs, si) =>
            // Never mount an empty subset: the cannon hook would still
            // create one body and index past the end of specs.
            specs.length > 0 && (
              <ShapeGroup
                key={`${gi}-${si}`}
                group={group}
                specs={specs}
                material={materials[si]}
                // Sleep only when there's no pointer plow at all (reduced
                // motion). Touch now drives PointerBall too, and a kinematic
                // ball can't wake a sleeping body — so the pile must stay
                // awake to react to a finger drag.
                allowSleep={reducedMotion}
              />
            )
        )
      )}
    </>
  );
};

// Narrow viewports dolly the camera BACK so the fixed-size shapes appear
// smaller and more of them fit — no per-shape scaling, no re-drop. Bounds are
// derived from the resulting camera distance so the walls always frame the
// visible area. Everything is live, so resizing just moves the camera + walls
// and the existing pile settles into the new frame.
const REST_Z = 10; // camera distance on wide screens
const Scene = (props) => {
  const { camera, size } = useThree();
  // Pull back below 1100px, capped so the zoom stays gentle (not huge).
  const targetZ = REST_Z * Math.max(1, Math.min(1.3, 1100 / size.width));
  // Ease the camera toward the target instead of snapping — resizing glides.
  useFrame(() => {
    const dz = targetZ - camera.position.z;
    if (Math.abs(dz) > 0.001) {
      camera.position.z += dz * 0.03;
      camera.updateProjectionMatrix();
    }
  });
  // Walls frame the FINAL distance so the pile has stable bounds while the
  // camera eases in.
  const hh = Math.tan(((camera.fov * Math.PI) / 180) / 2) * targetZ;
  const hw = hh * (size.width / size.height);
  return <Pile hw={hw} hh={hh} {...props} />;
};

/**
 * Physics playground background for the landing hero: small 3D primitives
 * (sphere, box, cone, cylinder, torus, icosahedron, torus knot) rendered as
 * theme-tinted marbles and glass drop under gravity, collide, and settle
 * into a pile along the bottom edge; the pointer plows fluidly through
 * them. Simulation runs in a worker via @react-three/cannon with sphere
 * colliders (nothing can wedge), one instanced draw call per subset.
 */
const PhysicsHero = () => {
  const { theme, accent } = useApp();
  const containerRef = useRef(null);
  // `running` gates the render loop — off only when the hero is truly
  // offscreen or the tab is hidden. `paused` gates ONLY the physics sim and
  // flips when the sticky hero is covered by the sheet scrolling over it.
  // Keeping the render loop alive across cover/uncover avoids a frameloop
  // wake spike; pausing physics (not the loop) means cannon resumes without
  // replaying accumulated wall-time — no catch-up hitch on scroll-up.
  const [running, setRunning] = useState(true);
  const [paused, setPaused] = useState(false);
  // Rain-in holds until the AppLoader's reveal transition finishes, so shapes
  // never fall behind the splash. Bodies spawn above the viewport and just
  // wait (sim frozen); when this flips they drop onto the revealed page.
  const [started, setStarted] = useState(isAppReady);
  useEffect(() => onAppReady(() => setStarted(true)), []);

  const lowTier = useMemo(() => isLowTier(), []);
  const reducedMotion = useMemo(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );
  // Stop render + physics stepping when the hero is offscreen, tab hidden,
  // or the sticky hero is fully covered by the sheet scrolling over it
  // (IntersectionObserver can't see occlusion, so coverage is scroll-based).
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
    // Pause physics once the sticky hero is fully covered by the sheet.
    // Hysteresis so the sim un-pauses slightly before the hero re-enters view
    // on scroll-up (spike, if any, lands under the sheet) and re-pauses only
    // well past the hero so the thresholds don't chatter.
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

  return (
    <div className="physics-hero" ref={containerRef} aria-hidden="true">
      <Canvas
        frameloop={running ? "always" : "demand"}
        dpr={[1, lowTier ? 1.25 : Math.min(window.devicePixelRatio, 1.5)]}
        camera={{ position: [0, 0, 10], fov: 40 }}
        gl={{
          antialias: !lowTier,
          powerPreference: "high-performance",
          alpha: true,
          stencil: false,
        }}
      >
        <Env />
        <Physics
          isPaused={paused || !started}
          gravity={[0, -16, 0]}
          broadphase="SAP"
          // Cap catch-up: after the loop pauses (hero covered) and resumes on
          // scroll-up, cannon would replay the whole accumulated dt in a
          // single frame — up to 10 collision-solve substeps at once = a
          // main-thread spike right at the reveal. Small step + low
          // maxSubSteps bounds that burst so resume can't hitch. Backing off
          // the sim by a hair when frames drop is invisible for a bg pile.
          step={1 / 60}
          maxSubSteps={2}
          // Lively rain-in: real bounce on impact. Linear damping (on the
          // bodies) bleeds energy each hop so the pile still settles instead
          // of vibrating forever (sleep is off); extra iterations settle the
          // stacked pile cleanly.
          defaultContactMaterial={{
            friction: 0.08,
            restitution: 0.5,
            contactEquationRelaxation: 4,
          }}
          iterations={12}
        >
          <Scene
            theme={theme}
            accent={accent}
            lowTier={lowTier}
            reducedMotion={reducedMotion}
            started={started}
          />
        </Physics>
      </Canvas>
    </div>
  );
};

export default PhysicsHero;
