import React, { useEffect, useState } from "react";
import Navbar from "../../../../../components/Navbar/Navbar";
import BlogsFooter from "../../../../../components/BlogsFooter/BlogsFooter";
import Footer from "../../../../../components/Footer/Footer";
import { blogPost } from "../../../../../data/BlogsData";
import LeftSidebar from "../../../../../components/LeftSideBar/LeftSidebar";
import { Link } from "react-router-dom";
import "../../Blogs.scss";
import { animated, useSpring } from "react-spring";
import SuzanneThreeBG from "../../../../../components/SuzanneThreeBG/SuzanneThreeBG";
import BlueYardVideo from "./utils/assets/blueyard.mp4";
import DalaVideo from "./utils/assets/dala.mp4";
import DracarysVideo from "./utils/assets/dracarys.mp4";
import PendereckiVideo from "./utils/assets/penderecki.mp4";
import VideoGrid from "../../../../../components/VideoGrid/VideoGrid";
import ParticlesVideo from "./utils/assets/particles.mp4";
import ParticlesThumbnail from "./utils/assets/particles-tn.webp";
import InfoDiv from "../../../../../components/InfoDIV/InfoDiv";
import CodeSnippet from "../../../../../components/SyntaxHighlighter/CodeSnippet";
import { cssSandpack, htmlSandpack, jsSandpack } from "./utils/codeProvider";
import CodeSandpack from "../../../../../components/CodeSandpack/CodeSandpack";

const ParticlesBlog = ({
  openCMDCenter,
  controlMusic,
  isMusicPlaying,
  theme,
  toggleTheme,
}) => {
  const [currBlog, setCurrBlog] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  useEffect(() => {
    // window.scrollTo(0, 0);
    setCurrBlog(
      blogPost.find((blog) => {
        return blog.blogNo === 7;
      })
    );
  }, [currBlog]);

  const sidebarAnimation = useSpring({
    opacity: isSidebarVisible ? 1 : 0,
    config: { tension: 100, friction: 50 },
  });

  const handleScroll = (e) => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

    const fullHeight = scrollHeight - clientHeight;
    const scrolled = (scrollTop / fullHeight) * 100;
    setScrollPercentage(scrolled);

    // Determine the active section based on scroll position
    const sections = document.querySelectorAll(".blog-section");
    sections.forEach((section, index) => {
      const { offsetTop, offsetHeight } = section;
      if (
        scrollTop >= offsetTop - 300 &&
        scrollTop < offsetTop + offsetHeight - 300
      ) {
        setActiveSection(index);
      }
    });

    // Determine if the sidebar should be visible
    setIsSidebarVisible(scrolled < 100);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const videosData = {
    blueyard: {
      url: "https://www.blueyard.com/",
      video: BlueYardVideo,
    },
    dala: {
      url: "https://dala.craftedbygc.com/",
      video: DalaVideo,
    },
    dracarys: {
      url: "https://dracarys.robertborghesi.is/",
      video: DracarysVideo,
    },
    penderecki: {
      url: "https://pendereckisgarden.pl/en",
      video: PendereckiVideo,
    },
  };

  const sections = [
    "Why, what and how we will learn?",
    "Let's start coding",
    "Going Further: Advanced Techniques and Applications",
    "Conclusion: Your Journey into the World of Particles",
  ];

  const fileTextureRender = {
    "/index.js": {
      code: jsSandpack,
    },
    "/index.html": {
      code: htmlSandpack,
    },
    "/styles.css": {
      code: cssSandpack,
    },
  };

  const installDep = `npm install lil-gui`;
  const constructor = `  constructor() {
    this.initScene();
    this.initCamera();
    this.initRenderer();
    this.initParticles();
    this.initGUI();
    this.addEventListeners();
    this.animate();
  }
  `;

  const initScene = `initScene() {
    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();
    this.cursor = { x: 0, y: 0 }; // Track mouse position for effects
}
  `;

  const initCamera = `  initCamera() {
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
  `;

  const initParticles = `  initParticles() {
    const starGeometry = new THREE.BufferGeometry();
    this.particlesCount = 3500;
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

    let sprite = new THREE.TextureLoader().load("/texture.png");

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
  `;

  const initGUI = `initGUI() {
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
  }`;

  const initAnimation = `addEventListeners() {
    window.addEventListener("resize", () => this.onResize());
    window.addEventListener("mousemove", (event) => this.onMouseMove(event));
  }
  // ... prev code
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
  `;

  return (
    <>
      <Navbar
        openCMDCenter={openCMDCenter}
        controlMusic={controlMusic}
        isMusicPlaying={isMusicPlaying}
        theme={theme}
        pageTitle={currBlog?.blogTitle}
      />
      <div className="page blog-series-page">
        <animated.div className="left-sidebar" style={sidebarAnimation}>
          {isSidebarVisible && (
            <LeftSidebar
              scrollPercentage={scrollPercentage}
              activeSection={activeSection}
              sections={sections}
              setActiveSection={setActiveSection}
            />
          )}
        </animated.div>
        <div className="section-top">
          <Link to={currBlog?.seriesUrl}>
            <i className="fa-solid fa-arrow-left-long back-link"></i>&nbsp;
            Journey
          </Link>
          <div className="container">
            <div className="blog-series-header">
              <h1>{currBlog?.blogTitle}</h1>
              <div className="div-flex-row">
                <p className="blog-date">
                  📆 Published on: {currBlog?.blogDate}
                </p>
                <p className="blog-date">
                  🤓 Readtime (Approx): {currBlog?.readtime}
                </p>
              </div>
            </div>
          </div>
          <SuzanneThreeBG theme={theme} />
          <div className="main-blog-content" onScroll={handleScroll}>
            <p className="open-txt">
              Welcome to a new lesson on particle systems in computer graphics!
              In this blog, we'll delve deep into the fascinating world of
              particles and explore their applications in creating stunning
              visual effects. From the vast expanse of galaxies to the intricate
              details of smoke and fire, particles are the best tool to help you
              create scenes that can feel truly magical 🪄.
            </p>
            <br />
            <p className="open-txt">
              Particles can breathe life into static scenes, add depth to
              environments, and create immersive, dynamic atmospheres that
              captivate viewers. Whether you're working on a space simulation, a
              fantasy game, or an abstract art piece, mastering particle systems
              will significantly enhance your ability to create compelling
              visual experiences.
            </p>
            <br />
            <p className="open-txt">
              However, creating a particle system can also feel quite
              intimidating at first. The concepts of attributes and buffer
              geometries might appear complex, but fear not! This blog is
              designed to explore these concepts and provide you with a solid
              foundation in particle-based scene creation. Throughout this
              guide, I'll share some tips and techniques that I have learned
              from my experience working with particle systems.
            </p>

            <div className="blog-section">
              <h3 className="blog-section-title">
                Why, what and how we will learn?
              </h3>
              <p>
                Here are a few mesmerizing 3D experiences that showcase the
                power of particle systems in web development. These examples
                demonstrate why learning to work with particles is essential for
                creating stunning web experiences:
              </p>
              <VideoGrid videos={videosData} />
              <br />
              <p>
                Here's what you will learn:
                <ul>
                  <li>
                    <i className="fa-solid fa-arrow-right"></i>{" "}
                    <b>Efficient Particle Systems: </b> Creating particle
                    systems using both standard and buffer geometries.
                  </li>
                  <li>
                    <i className="fa-solid fa-arrow-right"></i>{" "}
                    <b>Customization: </b> Dive deep into tailoring particle
                    appearance and behaviour. Explore techniques for controlling
                    particle size, colour, opacity, and movement patterns to
                    achieve your desired visual effects.
                  </li>
                  <li>
                    <i className="fa-solid fa-arrow-right"></i>{" "}
                    <b>Performance Optimization: </b> Discover advanced
                    techniques for the smooth rendering of thousands of
                    particles.
                  </li>
                  <li>
                    <i className="fa-solid fa-arrow-right"></i>{" "}
                    <b>Texture Application: </b> Enhance your particles with
                    textures to create more realistic or stylized effects.
                    Applying what we learned in the{" "}
                    <Link
                      className="link"
                      to={
                        "/blogs/three-js-journey/building-sci-fi-mystery-box-introduction-to-textures"
                      }
                      target="_blank"
                    >
                      previous blog
                    </Link>
                    .
                  </li>
                  <li>
                    <i className="fa-solid fa-arrow-right"></i>{" "}
                    <b>Infinite Trails: </b> Creating endless particle effects
                    with constant rendering. Explore techniques like particle
                    recycling, seamless looping, and camera tricks to create the
                    illusion of infinite particle systems without overwhelming
                    system resources.
                  </li>
                </ul>
                By the end of this blog, you'll have the knowledge and
                confidence to experiment with particle systems and create your
                mesmerizing effects. So, let's embark on this exciting journey
                into the world of particles and unlock new realms of creative
                possibilities in your projects!
              </p>
              <p>What will we build?</p>
              <div className="video-container">
                <video
                  className="video"
                  loop
                  autoPlay
                  muted={true}
                  preload="auto"
                  poster={ParticlesThumbnail}
                >
                  <source src={ParticlesVideo} type="video/mp4" />
                </video>
              </div>
            </div>

            <div className="blog-section">
              <h3 className="blog-section-title">Let's start coding</h3>
              <p>
                Now that we've explored the fascinating world of particle
                systems, it's time to roll up our sleeves and dive into the
                practical aspect. We're going to build an infinite particle
                background that will mesmerize your viewers and add a touch of
                magic to your web projects. 🌟
              </p>
              <InfoDiv
                infoText={`
                  <p> Instead of starting from scratch, we’ll be building on top of what we have already learned so far in this series. To get started, download the starter files from github using the button below, setup the code by following readme and follow along by adding the provided code snippets into your <code>main.js</code> file in the specified order.</p>
                  <br>
                  <p class="div-flex-row">
                    <a href="https://github.com/SahilK-027/threejs-template/archive/refs/heads/main.zip">
                      <button type="button">Starter Code</button>
                    </a>
                    <b class="animated-gradient">✨ If you wish you can use vite and try to code your own starter pack!</b>
                  </p>
                  <br/>
                  <p>
                  With this we will have the base setup from our starter code, which includes scene, setting up a camera, and adding a simple rotating cube.
                  </p>
                `}
              />
              <h4>
                <span>Step 1:</span> Installing dependencies
              </h4>
              <p>
                Before starting with code install important libraries, we will
                need lil-gui. Lil-gui is a JavaScript interface that allows
                users to change the properties of any JavaScript object during
                runtime.
              </p>
              <CodeSnippet
                language={"bash"}
                codeText={installDep}
                theme={theme}
              />
              <h4>
                <span>Step 2:</span> Initialize constructor
              </h4>
              <p>
                In the project we are building we don't need orbit controls,
                lights and mesh so remove them, and we will need to add the
                things we need. Add the following methods to constructor
                initParticles(), initGUI().
              </p>
              <CodeSnippet
                language={"js"}
                codeText={constructor}
                theme={theme}
              />
              <h4>
                <span>Step 3:</span> Initialize Scene and Camera
              </h4>
              <p>
                Next, we will enhance our scene setup. The final code introduces
                a camera group for better control over camera movements.
              </p>
              <CodeSnippet language={"js"} codeText={initScene} theme={theme} />
              <p>
                <b> Explanation:</b> We added a cursor object to track mouse
                movements, which will be used later for creating interactive
                effects.
              </p>
              <h4>
                <span>Step 4:</span> Create a Camera Group
              </h4>
              <p>
                In the final code, we create a camera group that allows for more
                complex camera movements.
              </p>
              <CodeSnippet
                language={"js"}
                codeText={initCamera}
                theme={theme}
              />
              <p>
                <b> Explanation:</b> The camera is now part of a group, allowing
                us to manipulate its position more effectively. The field of
                view and near/far planes have been adjusted for better
                visibility of particles.
              </p>
              <h4>
                <span>Step 5:</span> Initialize Particles
              </h4>
              <p>
                The core of our transformation is adding particles. We will
                create a buffer geometry to hold multiple particles efficiently.
              </p>
              <CodeSnippet
                language={"js"}
                codeText={initParticles}
                theme={theme}
              />
              <p>
                <b>Explanation:</b> This code snippet defines an{" "}
                <code>initParticles</code> method that initializes a particle
                system using Three.js, a popular JavaScript 3D library. The
                method starts by creating a new <code>BufferGeometry</code>{" "}
                object called <code>starGeometry</code>, which is designed to
                hold the structure of the particles. A total of 3500 particles
                are defined by setting <code>this.particlesCount</code>. An
                empty array, <code>this.points</code>, is initialized to store
                the 3D positions of these particles.
              </p>
              <p>
                A loop runs 3500 times to generate random positions for each
                particle within a 3D space, assigning random values to the{" "}
                <code>x</code>, <code>y</code>, and <code>z</code> coordinates.
                Each particle is also given custom properties for{" "}
                <code>velocity</code> and <code>acceleration</code>, which can
                be utilized for particle movement in the future. The generated
                particles are pushed into the <code>this.points</code> array.
              </p>
              <p>
                After establishing the particles’ positions, a{" "}
                <code>Float32Array</code> is created to hold color values for
                each particle. A separate loop populates this array with random
                color values ranging from 0 to 1.5 for each particle's RGB
                components. The colors are then set as an attribute of the{" "}
                <code>starGeometry</code> object.
              </p>
              <p>
                The code proceeds to load a texture image to use as a sprite for
                each particle. The <code>PointsMaterial</code> is created to
                define how the particles will appear, including parameters like
                color, size, and blending mode. The particles' appearance is
                enhanced with additive blending, making overlapping particles
                appear brighter.
              </p>
              <p>
                Finally, the particle system is constructed using the{" "}
                <code>starGeometry</code> and the material defined earlier. The
                completed particle system is then added to the scene, allowing
                it to be rendered within the 3D environment. This setup provides
                a visually appealing and dynamic representation of a starfield
                or similar effect in a 3D scene.
              </p>
              <h4>
                <span>Step 6:</span> Add GUI Controls
              </h4>
              <p>
                To make our particle system interactive, we introduce GUI
                controls that allow users to modify particle properties in
                real-time.
              </p>
              <CodeSnippet language={"js"} codeText={initGUI} theme={theme} />
              <p>
                <b>Explanation:</b> The GUI lets users adjust the size, speed,
                rotation speed of particles, and their color dynamically.
              </p>
              <h4>
                <span>Step 7:</span> Implement Animation Logic
              </h4>
              <p>
                Finally, we need to animate our particles and handle user
                interactions through event listeners.
              </p>
              <CodeSnippet
                language={"js"}
                codeText={initAnimation}
                theme={theme}
              />
              <p>
                <b>Explanation:</b> The GUI lets users adjust the size, speed,
                rotation speed of particles, and their color dynamically.
              </p>
              <p>Here’s the final render! 😉</p>{" "}
              <CodeSandpack
                files={fileTextureRender}
                theme={theme}
                layout="preview"
              />{" "}
            </div>

            <div className="blog-section">
              <h3 className="blog-section-title">
                Going Further: Advanced Techniques and Applications
              </h3>
              <p>
                As we delve deeper into the world of particle systems, there are
                numerous advanced techniques you can explore to elevate your
                particle effects even further. Here are a few concepts that can
                help you push the boundaries of what you can achieve with
                particle systems:
              </p>
              <p>
                <ul>
                  <li>
                    {" "}
                    <i class="fa-solid fa-arrow-right"></i>
                    <b>Particle Lifecycles: </b> Understanding and implementing
                    lifecycles for particles can significantly enhance realism.
                    Particles can be programmed to fade, change size, or even
                    change color over their lifespan. By controlling these
                    attributes, you can create effects like smoke dissipating or
                    fireworks exploding.
                  </li>
                  <li>
                    {" "}
                    <i class="fa-solid fa-arrow-right"></i>
                    <b>Collisions and Interactions: </b> Incorporating
                    interactions between particles or between particles and
                    other objects in your scene can add a layer of complexity
                    and realism. For example, simulating gravity, wind, or other
                    forces can create dynamic behaviors. Libraries such as
                    Cannon.js or Physijs can be integrated with Three.js to
                    simulate physical interactions.
                  </li>
                  <li>
                    {" "}
                    <i class="fa-solid fa-arrow-right"></i>
                    <b>Shaders for Custom Effects: </b> Using shaders can open
                    up new possibilities for visual effects in your particle
                    systems. GLSL shaders allow you to create intricate effects
                    like distortion, refraction, or even custom lighting models.
                    By leveraging shaders, you can achieve unique appearances
                    that standard materials may not provide. Don't worry we will
                    learn shaders in details in upcoming blogs.
                  </li>
                </ul>
              </p>
            </div>

            <div className="blog-section">
              <h3 className="blog-section-title">
                Conclusion: Your Journey into the World of Particles
              </h3>
              <p>
                By mastering particle systems, you can transform your web
                projects from static displays into immersive experiences that
                captivate users. The skills and techniques covered in this blog
                will serve as a foundation for your exploration of this
                fascinating area of computer graphics. Remember, the journey
                into particle systems is ongoing, and experimentation is key.
              </p>
              <p>
                Take the time to play with the parameters and explore different
                behaviors. As you gain confidence, try implementing more
                advanced techniques and concepts. With creativity and practice,
                you can unlock the full potential of particle systems in your
                projects and create visually stunning effects that leave a
                lasting impression.
              </p>
              <p>
                Thank you for joining me on this exciting adventure into the
                world of particles! Keep coding, stay curious, and let your
                imagination guide you to create mesmerizing experiences. Happy
                coding! 🎉
              </p>
            </div>
          </div>
        </div>
      </div>
      <BlogsFooter theme={theme} />
      <Footer toggleTheme={toggleTheme} />
    </>
  );
};

export default ParticlesBlog;
