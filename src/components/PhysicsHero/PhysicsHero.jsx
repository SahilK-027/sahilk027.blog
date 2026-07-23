import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Physics, useBox, useSphere } from "@react-three/cannon";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { useApp } from "../../context/AppContext";
import { getAccent } from "../../data/accents";
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
const GROUPS = [
  // ---- solids (smooth or too complex to frame) ----
  { geo: () => new THREE.SphereGeometry(0.24, 20, 16), cr: 0.24, count: 22 },
  { geo: () => new THREE.TorusGeometry(0.19, 0.08, 12, 24), cr: 0.24, count: 14 },
  {
    geo: () => new THREE.CylinderGeometry(0.17, 0.17, 0.38, 18),
    cr: 0.2,
    count: 14,
  },
  {
    geo: () => new THREE.CapsuleGeometry(0.13, 0.22, 6, 12),
    cr: 0.18,
    count: 10,
  },
  { geo: () => new THREE.IcosahedronGeometry(0.24, 0), cr: 0.23, count: 14 },
  { geo: () => new THREE.DodecahedronGeometry(0.24, 0), cr: 0.22, count: 10 },
  { geo: () => new THREE.BoxGeometry(0.36, 0.36, 0.36), cr: 0.23, count: 14 },
  { geo: () => new THREE.ConeGeometry(0.22, 0.42, 18), cr: 0.2, count: 12 },
  { geo: () => new THREE.TetrahedronGeometry(0.26, 0), cr: 0.17, count: 8 },
  // ---- frames (simple edge graphs → clean scaffolds) ----
  {
    geo: () => tubeFrame(new THREE.BoxGeometry(0.36, 0.36, 0.36), 0.028),
    cr: 0.23,
    count: 9,
    frame: true,
  },
  {
    geo: () => tubeFrame(new THREE.ConeGeometry(0.22, 0.42, 6), 0.026),
    cr: 0.2,
    count: 8,
    frame: true,
  },
  {
    geo: () => tubeFrame(new THREE.TetrahedronGeometry(0.26, 0), 0.03),
    cr: 0.17,
    count: 7,
    frame: true,
  },
  {
    geo: () => tubeFrame(new THREE.OctahedronGeometry(0.25, 0), 0.028),
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

/* ------------------------------------------------------------------ */
/* Static bounds: floor at hero bottom + side walls. Translation is    */
/* locked to the xy plane, so no front/back walls needed.              */
/* ------------------------------------------------------------------ */
const Bounds = ({ hw, hh }) => {
  const t = 2; // wall thickness
  useBox(() => ({
    args: [hw * 2 + t * 2, t, 4],
    position: [0, -hh - t / 2, 0],
    type: "Static",
  }));
  useBox(() => ({
    args: [t, hh * 8, 4],
    position: [-hw - t / 2, 0, 0],
    type: "Static",
  }));
  useBox(() => ({
    args: [t, hh * 8, 4],
    position: [hw + t / 2, 0, 0],
    type: "Static",
  }));
  return null;
};

// Ceiling mounts separately, AFTER the rain-in: shapes spawn above the
// canvas and fall through where it will be, then the lid seals the
// container so nothing gets flung out the top.
const Ceiling = ({ hw, hh }) => {
  const t = 2;
  useBox(() => ({
    args: [hw * 2 + t * 2, t, 4],
    position: [0, hh + t / 2, 0],
    type: "Static",
  }));
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
  const geometry = useMemo(group.geo, [group]);
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

const Pile = ({ hw, hh, theme, accent, lowTier, reducedMotion, touch }) => {
  const scale = lowTier ? 0.5 : 0.8;

  // Lid seals once the rain-in is done (worst-case fall is ~2s with the
  // 10×hh spawn column).
  const [sealed, setSealed] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setSealed(true), 3600);
    return () => clearTimeout(id);
  }, []);

  // Deterministic specs, split per group into marble / glass / accent so
  // each subset renders as its own instanced mesh with the right material.
  // Spawn is staggered above the hero so shapes rain in and settle.
  const groupSpecs = useMemo(() => {
    const rand = mulberry32(20260723);
    return GROUPS.map((group) => {
      const count = Math.max(4, Math.round(group.count * scale));
      const marble = [];
      const glass = [];
      const accentSpecs = [];
      for (let i = 0; i < count; i++) {
        const spec = {
          // Tall spawn column: height spread IS the arrival stagger. The
          // squared roll skews spawn heights low, so the rain opens dense
          // and tapers into stragglers (fast → slow).
          position: [
            (rand() * 2 - 1) * hw * 0.94,
            hh + 0.6 + Math.pow(rand(), 2) * hh * 9,
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
      {!reducedMotion && !touch && <PointerBall />}
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
                allowSleep={touch}
              />
            )
        )
      )}
    </>
  );
};

// Reads the r3f viewport (world units at z=0) and sizes the physics bounds
// to exactly match the visible hero.
const Scene = (props) => {
  const { viewport } = useThree();
  return <Pile hw={viewport.width / 2} hh={viewport.height / 2} {...props} />;
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
  const [running, setRunning] = useState(true);

  const lowTier = useMemo(() => isLowTier(), []);
  const reducedMotion = useMemo(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );
  const touch = useMemo(
    () => window.matchMedia("(pointer: coarse)").matches,
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
    const sync = () => setRunning(visible && !covered && !document.hidden);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    io.observe(node);
    const onScroll = () => {
      const nowCovered = window.scrollY > node.clientHeight;
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
          gravity={[0, -16, 0]}
          broadphase="SAP"
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
            touch={touch}
          />
        </Physics>
      </Canvas>
    </div>
  );
};

export default PhysicsHero;
