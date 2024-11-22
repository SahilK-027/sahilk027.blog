export const htmlSandpack = `<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Realistic Render</title>
  </head>

  <body>
    <canvas class="webgl"></canvas>
    <script type="module" src="/main.js"></script>
  </body>

</html>
`;

export const cssSandpack = `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html {
  background: #0d1525;
}
.webgl {
  position: fixed;
  top: 0;
  left: 0;
  outline: none;
  z-index: -1;
}
`;

export const jsSandpack = `import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import "./styles.css"

class RealisticRender {
  constructor() {
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    this.initLoaders();
    this.createScene();
    this.setupCamera();
    this.setupLights();
    this.setupRenderer();
    this.setupControls();
    this.loadEnvironment();
    this.loadObject();
    this.setupEventListeners();
    this.startAnimationLoop();
  }

  initLoaders() {
    this.gltfLoader = new GLTFLoader();
    this.dracoLoader = new DRACOLoader();
    this.dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
    this.dracoLoader.setDecoderConfig({ type: "js" });
    this.gltfLoader.setDRACOLoader(this.dracoLoader);

    this.cubeTextureLoader = new THREE.CubeTextureLoader();
    this.textureLoader = new THREE.TextureLoader();
  }

  createScene() {
    this.canvas = document.querySelector("canvas.webgl");
    this.scene = new THREE.Scene();
  }

  loadEnvironment() {
    this.environmentMap = this.cubeTextureLoader.load([
      "https://i.ibb.co/JxTTvcS/px.png",
      "https://i.ibb.co/QQgdrrT/nx.png",
      "https://i.ibb.co/RYmthW0/py.png",
      "https://i.ibb.co/J2dHyJg/ny.png",
      "https://i.ibb.co/9n7h2Tm/pz.png",
      "https://i.ibb.co/NK5Chqf/nz.png",
    ]);

    this.scene.background = this.environmentMap;
    this.scene.environment = this.environmentMap;
  }

  loadObject() {
    // Load ground textures
    const color = this.textureLoader.load("https://i.ibb.co/XtQzmLZ/diff.jpg");
    const ambientOcclusion = this.textureLoader.load(
      "https://i.ibb.co/584gYf5/ao.jpg"
    );
    const normal = this.textureLoader.load(
      "https://i.ibb.co/gd8fSQF/normal.jpg"
    );
    const roughness = this.textureLoader.load(
      "https://i.ibb.co/VS4N7fG/rough.jpg"
    );
    const metalness = this.textureLoader.load(
      "https://i.ibb.co/hcqwRTq/arm.jpg"
    );
    const height = this.textureLoader.load("https://i.ibb.co/CKp25B2/disp.jpg");

    color.colorSpace = THREE.SRGBColorSpace;

    this.gltfLoader.load("https://tinyurl.com/2p8ptszm", (gltf) => {
      this.turtle = gltf.scene;
      this.scene.add(this.turtle);

      this.turtle.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      this.createGround(
        color,
        ambientOcclusion,
        normal,
        roughness,
        metalness,
        height
      );
    });
  }

  // Create new method createGround
  createGround(color, ambientOcclusion, normal, roughness, metalness, height) {
    const boundingBox = new THREE.Box3().setFromObject(this.turtle);

    const groundMaterial = new THREE.MeshStandardMaterial({
      map: color,
      aoMap: ambientOcclusion,
      normalMap: normal,
      roughnessMap: roughness,
      metalnessMap: metalness,
      displacementMap: height,
      displacementScale: 0.1,
    });

    const groundGeometry = new THREE.PlaneGeometry(15, 15, 100, 100);
    groundGeometry.setAttribute(
      "uv2",
      new THREE.BufferAttribute(groundGeometry.attributes.uv.array, 2)
    );

    this.ground = new THREE.Mesh(groundGeometry, groundMaterial);
    this.ground.receiveShadow = true;
    this.ground.rotation.x = -Math.PI / 2;
    this.ground.position.y = boundingBox.min.y - 0.01;

    this.scene.add(this.ground);
  }

  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    this.camera.position.set(0, 0.85, 3.75);
    this.scene.add(this.camera);
  }

  setupLights() {
    // Directional Light
    this.directionalLight = new THREE.DirectionalLight("#835520", 10);
    this.directionalLight.position.set(-12, 5, 10);
    this.directionalLight.castShadow = true;
    this.directionalLight.shadow.camera.far = 50;
    this.directionalLight.shadow.mapSize.set(512, 512);
    this.directionalLight.shadow.bias = -0.005;
    this.scene.add(this.directionalLight);

    // Directional Light Helper
    // const directionalLightHelper = new THREE.DirectionalLightHelper(
    //   this.directionalLight,
    //   1.5
    // ); // 1.5 is the size of the helper
    // this.scene.add(directionalLightHelper);

    // Ambient Light
    this.ambientLight = new THREE.AmbientLight("#8a8a8a", 1);
    this.scene.add(this.ambientLight);
  }

  setupControls() {
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
  }

  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
    });
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.5;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  setupEventListeners() {
    window.addEventListener("resize", () => {
      // Update sizes
      this.sizes.width = window.innerWidth;
      this.sizes.height = window.innerHeight;

      // Update camera
      this.camera.aspect = this.sizes.width / this.sizes.height;
      this.camera.updateProjectionMatrix();

      // Update renderer
      this.renderer.setSize(this.sizes.width, this.sizes.height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
  }

  startAnimationLoop() {
    const tick = () => {
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
      window.requestAnimationFrame(tick);
    };
    tick();
  }

  // Method to initialize the scene
  static init() {
    return new RealisticRender();
  }
}

// Initialize the scene
RealisticRender.init();`;
