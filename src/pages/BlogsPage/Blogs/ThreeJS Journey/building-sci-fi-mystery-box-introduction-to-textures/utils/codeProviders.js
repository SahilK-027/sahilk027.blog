export const htmlSandpack = `<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sci-Fi Mystery Box</title>
  </head>

  <body>
    <div id="three-log"></div>
    <canvas class="webgl"></canvas>
    <script type="module" src="/index.js"></script>
  </body>
</html>
`;

export const cssSandpack = `* {
  margin: 0;
  padding: 0;
}

html,
body {
  overflow: hidden;
  background: black;
}

.webgl {
  position: fixed;
  top: 0;
  left: 0;
  outline: none;
}`;

export const jsSandpack = `import './styles.css';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Base Setup
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Texture Loading
 */
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
  console.log("Loading started");
};
loadingManager.onLoad = () => {
  console.log("Loading finished");
};
loadingManager.onProgress = () => {
  console.log("Loading in progress");
};
loadingManager.onError = (error) => {
  console.log("Loading error", error);
};

const textureLoader = new THREE.TextureLoader(loadingManager);

// Load textures
const textures = {
  ambientOcclusion: "https://i.ibb.co/GWJ36Pw/AO.jpg",
  color: "https://i.ibb.co/PZFKrTV/COLOR.jpg",
  height: "https://i.ibb.co/3TRptG3/HEIGHT.png",
  metalness: "https://i.ibb.co/0JXpbCV/METALNESS.jpg",
  normal: "https://i.ibb.co/D9pDc23/NORMAL.jpg",
  roughness: "https://i.ibb.co/1vmWhFr/ROUGHNESS.jpg",
  emissive: "https://i.ibb.co/jrr2XKF/EMMISIVE.jpg",
};

const textureMap = {};
for (const [key, url] of Object.entries(textures)) {
  textureMap[key] = textureLoader.load(url);
}

// Set texture properties
textureMap.color.colorSpace = THREE.SRGBColorSpace;
textureMap.color.wrapS = THREE.RepeatWrapping;
textureMap.color.wrapT = THREE.RepeatWrapping;
textureMap.color.minFilter = THREE.NearestFilter;
textureMap.color.magFilter = THREE.NearestFilter;

/**
 * Object Creation
 */
const geometry = new THREE.BoxGeometry(0.75, 0.75, 0.75);

// Material with multiple textures
const material = new THREE.MeshStandardMaterial({
  map: textureMap.color, // Base color
  normalMap: textureMap.normal, // Normal map
  displacementMap: textureMap.height, // Displacement map
  displacementScale: 0, // Displacement scale
  aoMap: textureMap.ambientOcclusion, // Ambient occlusion map
  metalnessMap: textureMap.metalness, // Metalness map
  roughnessMap: textureMap.roughness, // Roughness map
  emissiveMap: textureMap.emissive, // Emissive map
  emissive: new THREE.Color("#39FF14"), // Emissive color
  side: THREE.DoubleSide, // Render both sides
});

// Create mesh
const mesh = new THREE.Mesh(geometry, material);
mesh.rotation.y = Math.PI;
scene.add(mesh);

// Set uv2 attribute for ambient occlusion map
geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(geometry.attributes.uv.array, 2)
);

/**
 * Responsive Canvas
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Perspective camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(1, 1, 1);
scene.add(camera);

// Orbit controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Lighting
 */
// Directional light
const directionalLight = new THREE.DirectionalLight(0x444444, 1);
directionalLight.position.set(-1, 1, -1);
scene.add(directionalLight);

// Ambient light
const ambientLight = new THREE.AmbientLight(0x444444, 1);
scene.add(ambientLight);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animation Loop
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Create a disco effect by animating the emissive color
  const hue = (elapsedTime * 0.075) % 1; // Adjust speed by modifying the multiplier
  material.emissive = new THREE.Color().setHSL(hue, 1, 0.5); // HSL color model

  // Rotate the cube on X, Y, Z axes
  mesh.rotation.x = elapsedTime * 0.7;
  mesh.rotation.y = elapsedTime * 0.7;

  // Render scene
  renderer.render(scene, camera);

  // Request next frame
  window.requestAnimationFrame(tick);
};

tick();
`;
