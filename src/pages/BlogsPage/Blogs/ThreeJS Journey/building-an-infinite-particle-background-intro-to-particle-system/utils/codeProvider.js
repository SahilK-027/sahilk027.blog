export const htmlSandpack = `<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon_white.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Infinite Particles</title>
  </head>

  <body>
    <canvas class="webgl"></canvas>
    <script type="module" src="/index.js"></script>
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

export const jsSandpack = `import './styles.css'
import * as THREE from "three";
import GUI from "lil-gui";

class ParticleSystem {
  constructor() {
    this.initScene();
    this.initCamera();
    this.initRenderer();
    this.initParticles();
    this.initGUI();
    this.addEventListeners();
    this.animate();
  }

  initScene() {
    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();
    this.cursor = { x: 0, y: 0 };
  }

  initCamera() {
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    this.cameraGroup = new THREE.Group();
    this.scene.add(this.cameraGroup);

    this.camera = new THREE.PerspectiveCamera(
      60,
      this.sizes.width / this.sizes.height,
      1,
      1000
    );
    this.camera.position.z = 1;
    this.camera.rotation.x = Math.PI / 2;
    this.cameraGroup.add(this.camera);
  }

  initRenderer() {
    this.canvas = document.querySelector("canvas.webgl");
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
    });
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  initParticles() {
    const starGeometry = new THREE.BufferGeometry();
    this.particlesCount = 3000;
    this.points = [];

    for (let i = 0; i < this.particlesCount; i++) {
      const star = new THREE.Vector3(
        Math.random() * 600 - 300,
        Math.random() * 600 - 300,
        Math.random() * 600 - 300
      );
      star.velocity = 0;
      star.acceleration = 0.02;
      this.points.push(star);
    }

    const colors = new Float32Array(this.particlesCount * 3);
    for (let i = 0; i < this.particlesCount * 3; i++) {
      colors[i] = Math.random() * 1.5;
    }
    starGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    let sprite = new THREE.TextureLoader().load("https://i.ibb.co/x6nR9gc/texture.png");

    this.particlesMaterial = new THREE.PointsMaterial({
      color: "#fff",
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      map: sprite,
      size: 2.5,
      vertexColors: false
    });
    this.particlesMaterial.vertexColors = true;

    this.particles = new THREE.Points(starGeometry, this.particlesMaterial);
    this.scene.add(this.particles);
  }

  initGUI() {
    this.gui = new GUI();
    this.parameters = {
      starSize: 2.5,
      starSpeed: 1,
      rotationSpeed: 0.0005,
      starColor: "#ffffff",
    };

    this.gui.add(this.parameters, "starSize", 0.1, 10).onChange((value) => {
      this.particlesMaterial.size = value;
    });

    this.gui.add(this.parameters, "starSpeed", 0, 5).step(0.1);

    this.gui.add(this.parameters, "rotationSpeed", 0, 0.01).step(0.0001);

    this.gui.addColor(this.parameters, "starColor").onChange((value) => {
      this.particlesMaterial.color.set(value);
    });
  }

  addEventListeners() {
    window.addEventListener("resize", () => this.onResize());
    window.addEventListener("mousemove", (event) => this.onMouseMove(event));
  }

  onResize() {
    this.sizes.width = window.innerWidth;
    this.sizes.height = window.innerHeight;
    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  onMouseMove(event) {
    this.cursor.x = event.clientX / this.sizes.width - 0.5;
    this.cursor.y = -(event.clientY / this.sizes.height - 0.5);
  }

  animate() {
    const elapsedTime = this.clock.getElapsedTime();
    const deltaTime = elapsedTime - this.previousTime || 0;
    this.previousTime = elapsedTime;

    // Parallax effect
    const parallaxX = this.cursor.x * 0.5;
    const parallaxY = this.cursor.y * 0.5;
    this.cameraGroup.position.x +=
      (parallaxX - this.cameraGroup.position.x) * 1 * deltaTime;
    this.cameraGroup.position.y +=
      (parallaxY - this.cameraGroup.position.y) * 1 * deltaTime;

    // Update particles
    this.particlesMaterial.size = this.parameters.starSize;
    this.particles.rotation.y += this.parameters.rotationSpeed;

    this.points.forEach((star) => {
      star.y -= this.parameters.starSpeed + window.scrollY * 0.001;
      if (star.y < -300) {
        star.y = 300;
        star.velocity = 0;
      }
    });

    this.particles.geometry.setFromPoints(this.points);
    this.particles.geometry.attributes.position.needsUpdate = true;

    // Render
    this.renderer.render(this.scene, this.camera);

    // Call animate again on the next frame
    window.requestAnimationFrame(() => this.animate());
  }
}

// Initialize the Particle System
new ParticleSystem();
`;
