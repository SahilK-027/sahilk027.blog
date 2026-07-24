export const htmlSandpack = `<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My 3D Playground</title>
  </head>

  <body>
    <div id="app">
      <h3>Hello, 3D World!</h3>
    </div>
    <canvas class="webgl"></canvas>
    <script type="module" src="/index.js"></script>
  </body>
</html>`;

export const cssSandpack = `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
html, body {
    height: 100%;
    overflow: hidden;
    color: #fff;
    background-color: #121316;
    font-family: 'Arial', sans-serif;
    -webkit-font-smoothing: antialiased;
}
/* Full-bleed canvas: fills the whole viewport. */
.webgl {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
    outline: none;
}
/* Title overlays on top of the canvas. */
#app {
    position: absolute;
    top: 0;
    left: 0;
    padding: 20px;
    z-index: 1;
    pointer-events: none;
}`;

export const jsSandpack = `/**
* Imports
*/
import './styles.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// console.log(THREE);

/**
* Canvas & Scene
*/
const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();
// A deep indigo background + matching fog give the scene depth and mood.
scene.background = new THREE.Color("#0f1020");
scene.fog = new THREE.Fog("#0f1020", 7, 16);

/*
* Objects
*/
// A torus knot makes a far cooler first object than a plain sphere: its twists
// catch the light from every angle as it spins. MeshStandardMaterial is a
// physically based (PBR) material: 'roughness' controls how polished the surface
// looks and 'metalness' how metallic it is.
// TorusKnotGeometry(radius, tube, tubularSegments, radialSegments)
const knot = new THREE.Mesh(
  new THREE.TorusKnotGeometry(0.6, 0.2, 220, 32),
  new THREE.MeshStandardMaterial({
    color: "#8a5cff",
    roughness: 0.3,
    metalness: 0.35,
  })
);
knot.position.y = 0.4;
knot.castShadow = true;
scene.add(knot);

// A floor to catch the knot's shadow.
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({ color: "#15161d", roughness: 0.85, metalness: 0.1 })
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -1;
floor.receiveShadow = true;
scene.add(floor);

/*
* Lights
*/
// Soft base fill so shadows aren't pitch black.
const ambientLight = new THREE.AmbientLight("#7f9bff", 0.3);
scene.add(ambientLight);

// Sky/ground tint for a natural gradient.
const hemisphereLight = new THREE.HemisphereLight("#6ea8ff", "#20143a", 0.5);
scene.add(hemisphereLight);

// Warm key light: the one that actually casts the shadow.
const keyLight = new THREE.DirectionalLight("#fff4e6", 3.2);
keyLight.position.set(4, 6, 4);
keyLight.castShadow = true;
keyLight.shadow.mapSize.set(2048, 2048);
keyLight.shadow.radius = 4;
keyLight.shadow.bias = -0.0001;
keyLight.shadow.camera.near = 1;
keyLight.shadow.camera.far = 25;
scene.add(keyLight);

// Two coloured accent lights for a modern two-tone rim glow.
const pinkLight = new THREE.PointLight("#ff3fb4", 18, 18);
pinkLight.position.set(-4, 1.5, -2);
scene.add(pinkLight);

const cyanLight = new THREE.PointLight("#22d3ee", 12, 18);
cyanLight.position.set(4, -0.5, 2);
scene.add(cyanLight);

/*
* Camera
*/
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};
// PerspectiveCamera(fov, aspectRatio, near, far)
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0, 1.2, 5);
camera.lookAt(0, 0, 0);
scene.add(camera);

/*
* Renderer
*/
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;

/*
* Controls
*/
// OrbitControls let you click-drag to orbit, scroll to zoom, right-drag to pan.
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // smooth, weighted feel (needs controls.update() each frame)

/*
* Handle resize
*/
// Keep the render in sync with the window so nothing stretches.
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/*
* Animate on each frame
*/
const clock = new THREE.Clock();
const tick = () => {
  // elapsedTime is seconds since start, so motion is tied to real time and
  // stays consistent no matter the frame rate.
  const elapsedTime = clock.getElapsedTime();

  // Tumble the knot so its twists catch the light and the shadow shifts.
  knot.rotation.x = elapsedTime * 0.3;
  knot.rotation.y = elapsedTime * 0.5;

  // Apply the damped controls every frame.
  controls.update();

  renderer.render(scene, camera);

  // Recursively call the tick function
  window.requestAnimationFrame(tick);
};
tick();
`;
