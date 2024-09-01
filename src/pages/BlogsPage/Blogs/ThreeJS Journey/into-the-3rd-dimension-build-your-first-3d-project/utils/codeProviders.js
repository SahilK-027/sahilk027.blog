export const htmlSandpack = `<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My 3D Playground</title>
  </head>

  <body>
    <div id="app">
      <h3>Hello, 3D World!</h3>
      <p>This page is about to transform to 3d project...!</p>
    </div>
    <canvas class="webgl"></canvas>
    <script type="module" src="/index.js"></script>
  </body>
</html>`;

export const cssSandpack = `* {
    margin: 0;
    padding: 0;
}
#app{
  padding: 20px;
}
html, body{
    background: #121316;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    font-family: 'Arial', sans-serif;
}
.webgl {
    position: fixed;
    top: 0;
    left: 0;
    outline: none;
    z-index: -1;
}`;

export const jsSandpack = `/**
* Imports
*/
import './styles.css';
import * as THREE from 'three';
// console.log(THREE);
      
/**
* Canvas
*/
const canvas = document.querySelector("canvas.webgl");

/*
* Scene
*/
const scene = new THREE.Scene();

/*
* Create Your Mesh
*/
// 3 parameters that correspond to the sphere's size 
// radius, width segments, height segments :
const geometry = new THREE.SphereGeometry(0.8, 32, 16);

// A material for shiny surfaces with specular highlights.
//  All we need is to specify its color property and wireframe mode
const material = new THREE.MeshPhongMaterial({
  color: "#7444ff",
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);

// You can now add your mesh to the scene by using the add(...) method:
scene.add(mesh);

/*
* Lights
*/
const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
const hemisphereLight = new THREE.HemisphereLight(0x7444ff, 0xff00bb, 0.5);
const pointLight = new THREE.PointLight(0x7444ff, 1, 100);
pointLight.position.set(0, 3, 4);

scene.add(ambientLight);
scene.add(directionalLight);
scene.add(hemisphereLight);
scene.add(pointLight);

/*
* Camera
*/
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};
// PerspectiveCamera(aFOV, AspectRtio)
// 
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

/*
* Renderer
*/
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true // Transparency true
});
renderer.setSize(sizes.width, sizes.height);

/*
* Update the renderer on each frame
*/
const clock = new THREE.Clock();
let previousTime = 0;
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;
  
  // Animate the mesh
  mesh.rotation.x += deltaTime * 0.7;
  mesh.rotation.y += deltaTime * 0.7;
  mesh.rotation.z += deltaTime * 0.7;
  
  renderer.render(scene, camera);

  // Recursively call the tick function
  window.requestAnimationFrame(tick);
};
tick();
`;
