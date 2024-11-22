import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../../../../../components/Navbar/Navbar";
import BlogsFooter from "../../../../../components/BlogsFooter/BlogsFooter";
import Footer from "../../../../../components/Footer/Footer";
import { blogPost } from "../../../../../data/BlogsData";
import LeftSidebar from "../../../../../components/LeftSideBar/LeftSidebar";
import { Link } from "react-router-dom";
import "../../Blogs.scss";
import { animated, useSpring } from "react-spring";
import SuzanneThreeBG from "../../../../../components/SuzanneThreeBG/SuzanneThreeBG";
import BlogImage from "../../../../../components/BlogImage/BlogImage";
import InfoDiv from "../../../../../components/InfoDIV/InfoDiv";
import CodeSnippet from "../../../../../components/SyntaxHighlighter/CodeSnippet";
import InsightDiv from "../../../../../components/InsightDiv/InsightDIV";
import ImageSlider from "../../../../../components/ImageSlider/ImageSlider";
import { cssSandpack, htmlSandpack, jsSandpack } from "./utils/codeProvider";
import img1 from "./utils/assets/1.webp";
import img1l from "./utils/assets/1l.webp";
import img2 from "./utils/assets/2.webp";
import img2l from "./utils/assets/2l.webp";
import img3 from "./utils/assets/img3.webp";
import img4 from "./utils/assets/4.png";
import img5 from "./utils/assets/5.png";
import CodeSandpack from "../../../../../components/CodeSandpack/CodeSandpack";

const RealisticRender = ({
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
    window.scrollTo(0, 0);
    setCurrBlog(
      blogPost.find((blog) => {
        return blog.blogNo === 8;
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

  const initLoader = `import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

constructor() {
  //...old code
  this.initLoaders();
  this.createScene();
  //... old code
}

// Add it before createScene();
initLoaders() {
  this.gltfLoader = new GLTFLoader();
  this.dracoLoader = new DRACOLoader();
  this.dracoLoader.setDecoderPath("/static/draco/");
  this.dracoLoader.setDecoderConfig({ type: "js" });
  this.gltfLoader.setDRACOLoader(this.dracoLoader);
}`;

  const loadObject = `loadObject() {
  this.gltfLoader.load("/static/models/turtle_compressed.glb", (gltf) => {
      this.turtle = gltf.scene;
      this.scene.add(this.turtle);
  });
}`;

  const insightHDRIs = `<div>
    <h4>HDR vs. LDR Environment Maps</h4>
    <p>
    Before jumping in, let’s talk about two types of environment maps you’ll come across: HDR and LDR.
    </p>
    <ul>
      <li>
        <i class="fa-solid fa-arrow-right"></i>
        <b>HDR (High Dynamic Range): </b> HDR maps are like the heavyweights of environment maps. They come packed with detailed lighting data, covering a broad range of brightness levels. This makes them perfect for nailing subtle effects like soft sunlight, realistic shadows, and shiny reflections. But all that extra detail comes at a cost—they’re large in size and can be slow to render.
      </li>
      <li>
        <i class="fa-solid fa-arrow-right"></i>
        <b>LDR (Low Dynamic Range): </b> LDR maps, on the other hand, are the lightweight. They don’t carry as much lighting detail as HDR, but they’re small, compressed, and render much faster. If you’re building for the web, where performance is king, LDR maps are your go-to.
      </li>
    </ul>
  </div>`;

  const loadEnvironment = `// Inside initLoader add cubeTextureLoader
  initLoaders() {
    // ... Old code
    this.gltfLoader.setDRACOLoader(this.dracoLoader);

    this.cubeTextureLoader = new THREE.CubeTextureLoader();
  }
  
  // Create a new method instance this.loadEnvironment();
    constructor() {
    // ... Old code
    this.loadEnvironment();
    this.loadObject();
    // ... Old code
  }

  // Load environment

  loadEnvironment() {
    this.environmentMap = this.cubeTextureLoader.load([
      "/static/environmentMaps/beachEnv/px.png",
      "/static/environmentMaps/beachEnv/nx.png",
      "/static/environmentMaps/beachEnv/py.png",
      "/static/environmentMaps/beachEnv/ny.png",
      "/static/environmentMaps/beachEnv/pz.png",
      "/static/environmentMaps/beachEnv/nz.png",
    ]);

    this.scene.background = this.environmentMap;
    this.scene.environment = this.environmentMap;
  }`;

  const loadGround = `// Inside initLoader add cubeTextureLoader
initLoaders() {
  // ... Old code
  this.cubeTextureLoader = new THREE.CubeTextureLoader();
  this.textureLoader = new THREE.TextureLoader();
}

// Inside loadObject load our ground
loadObject() {
  // Load ground textures
  const color = this.textureLoader.load("/static/textures/ground/diff.jpg");
  const ambientOcclusion = this.textureLoader.load(
    "/static/textures/ground/ao.jpg"
  );
  const normal = this.textureLoader.load(
    "/static/textures/ground/normal.jpg"
  );
  const roughness = this.textureLoader.load(
    "/static/textures/ground/rough.jpg"
  );
  const metalness = this.textureLoader.load(
    "/static/textures/ground/arm.jpg"
  );
  const height = this.textureLoader.load("/static/textures/ground/disp.jpg");

  color.colorSpace = THREE.SRGBColorSpace;

  this.gltfLoader.load("/static/models/turtle_compressed.glb", (gltf) => {
    this.turtle = gltf.scene;
    this.scene.add(this.turtle);

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
  this.ground.rotation.x = -Math.PI / 2;
  this.ground.position.y = boundingBox.min.y - 0.01;

  this.scene.add(this.ground);
}`;

  const toneMapping = `setupRenderer() {
  // ... old code
  this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
  this.renderer.toneMappingExposure = 1.5;
}`;

  const antiAliasing = `setupRenderer() {
  this.renderer = new THREE.WebGLRenderer({
    canvas: this.canvas,
    alpha: true,
    // The antialias property must be set during the renderer's creation. 
    // Changing it afterward won't have any effect.
    antialias: true, 
  });
}`;

  const lightsAndShadows = `  constructor() {
  // ... Old code
  this.setupCamera();
  this.setupLights();

  // Add new methods
  setupLights() {
    // Directional Light
    this.directionalLight = new THREE.DirectionalLight("#835520", 10);
    this.directionalLight.position.set(-10, 5, 10);
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
  }`;

  const enableShadows = `  setupRenderer() {
    // ... old code
    this.renderer.toneMappingExposure = 1.5;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Activate it on the DirectionalLight
    setupLights() {
      // Directional Light
      // Old code...
      this.directionalLight.position.set(-10, 5, 10);
      this.directionalLight.castShadow = true;
      this.directionalLight.shadow.camera.far = 50;
      this.directionalLight.shadow.mapSize.set(512, 512);
      this.directionalLight.shadow.bias = -0.005;
    }

    // Activate it on objects
    this.turtle.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    this.ground.receiveShadow = true; 
  }`;
  /* ==========================================================
      ! Please make sure you have at max 8 sections in the array
  ========================================================== */
  const sections = [
    "What we will learn?",
    "Setup for the code",
    "Let's write the code",
    "Advanced Techniques and Applications",
    "Conclusion",
  ];

  const fileRealisticRender = useMemo(
    () => ({
      "/index.js": {
        code: jsSandpack,
      },
      "/index.html": {
        code: htmlSandpack,
      },
      "/styles.css": {
        code: cssSandpack,
      },
    }),
    []
  );

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
              If you've ever imported a 3D model into a web project, you’ve
              likely faced this frustration: the render never quite matches how
              it looked in Blender—or any other 3D software. As a developer, I
              understand how disheartening this can be.
            </p>
            <BlogImage
              imgDark={img1}
              imgLight={img1l}
              theme={theme}
              description={`Fig(1.0) Comparing different render results`}
            />
            <p className="open-txt">
              But, but, but, there are valid reasons for this disparity. First,
              Blender and similar tools use advanced rendering techniques that
              take significant time to compute (rendering usually takes anywhere
              from a few seconds to several hours or even days in extreme
              cases)—time we simply can’t afford in web-based 3D rendering,
              where every millisecond counts. Additionally, different rendering
              engines handle lighting and materials in unique ways, contributing
              to inconsistencies.
              <br />
              <br />
              However, if you aim to replicate the Blender render as closely as
              possible, there’s a handy trick called *baking*. In essence,
              baking involves UV unwrapping your 3D model and capturing
              Blender’s rendered details into a texture. This texture can then
              be applied to your model in your web scene. It’s a clever way to
              bring pre-rendered realism to your 3D content.
            </p>
            <BlogImage
              imgDark={img2}
              imgLight={img2l}
              theme={theme}
              description={`Fig(2.0) Rendering with baked textures`}
            />
            <p className="open-txt">
              But baking alone isn’t always enough for truly realistic renders.
              Whether you’re showcasing a real-life product, presenting a
              portfolio as a 3D artist, or simply striving for visual fidelity,
              achieving a life-like appearance requires a combination of
              techniques. Factors like lighting, environment mapping, shadows,
              and material properties all play critical roles—and when not
              handled correctly, even a great model can look underwhelming.
            </p>

            <div className="blog-section">
              <h3 className="blog-section-title">What we will learn?</h3>
              <p>
                Baking alone isn’t always enough for truly realistic renders.
                Whether you’re showcasing a real-life product, presenting a
                portfolio as a 3D artist, or simply striving for visual
                fidelity, achieving a life-like appearance requires a
                combination of techniques. Factors like lighting, environment
                mapping, shadows, and material properties all play critical
                roles—and when not handled correctly, even a great model can
                look underwhelming. In this blog, we’ll explore how to render
                imported 3D models with stunning realism. We’ll dive into
                essential strategies, including:
                <ul>
                  <li>
                    <i className="fa-solid fa-arrow-right"></i>{" "}
                    <b>Realistic lighting: </b> Creating natural and dynamic
                    illumination..
                  </li>
                  <li>
                    <i className="fa-solid fa-arrow-right"></i>{" "}
                    <b>Environment maps: </b> Using high-quality (low size)
                    textures to simulate surroundings.
                  </li>
                  <li>
                    <i className="fa-solid fa-arrow-right"></i>{" "}
                    <b>Efficient shadow rendering: </b> Balancing realism and
                    performance.
                  </li>
                  <li>
                    <i className="fa-solid fa-arrow-right"></i>{" "}
                    <b>Texture Application: </b> Enhance your scene with
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
                </ul>
                Keep in mind, though, that some of these techniques may impact
                performance or vary depending on your model. Adapting to your
                specific use case is key.
                <br />
                <br />
                With that said, let’s dive in and transform your web-based 3D
                models into visually stunning realistic render! 🏁
              </p>
            </div>

            <div className="blog-section">
              <h3 className="blog-section-title">Setup for the code</h3>
              <p>
                To showcase realistic rendering techniques, you can use any 3D
                model, but it’s ideal to pick one that comes with textures,
                normal maps, and other details. For this example, we’ll use a{" "}
                <a
                  href="https://sketchfab.com/3d-models/sea-turtle-ddb6789834f0412090863e8fd3c0c4db"
                  target="_blank"
                  className="link"
                >
                  Sea Turtle
                </a>{" "}
                model from Sketchfab.
              </p>
              <p>
                I’ve already downloaded the Sea Turtle and saved it in the{" "}
                <code>/static/models/</code> folder. The downloaded 3d model is
                lightweight—just 900KB after compression (including all
                textures). This demonstrates that you don’t need heavy,
                uncompressed models to achieve stunning results. A
                well-optimized, small model can still deliver impressive
                realism. It’s loaded and added to the scene, ready to work with.
              </p>
              <p>
                To refine our render, we’ll use lil-gui, a handy tool for
                tweaking various parameters in real-time. This level of control
                is essential when striving for a perfect render, allowing
                adjustments to lighting, material properties, and
                post-processing effects without diving back into the code
                repeatedly.
              </p>
              <InfoDiv
                infoText={`
                  <p> Instead of starting from scratch, we’ll be building on top of what we have already learned so far in this series. To get started, download the starter files from github using the button below, setup the code by following readme and follow along by adding the provided code snippets into your <code>main.js</code> file in the specified order.</p>
                  <br>
                  <p class="div-flex-row">
                    <a href="./utils/starter_code/realistic_render.zip" download>
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
            </div>

            <div className="blog-section">
              <h3 className="blog-section-title">Let's write the code</h3>
              <h4>
                <span>Step 1:</span> Loading the 3D model
              </h4>
              <p>
                Let’s start by loading our Sea Turtle model. First, we’ll
                instantiate the <b>GLTFLoader</b> . To keep things organized,
                we’ll group all our loaders into a new method called{" "}
                <code>initLoaders</code> . This approach ensures everything is
                neatly managed in one place.
              </p>
              <CodeSnippet
                language={"javascript"}
                codeText={initLoader}
                theme={theme}
              />
              <p>
                Since the model is compressed, we’ll also use the{" "}
                <code>DRACOLoader</code>. If your model isn’t Draco-compressed,
                you can skip this part and stick with just the GLTFLoader. We
                need the <br />
                <br />
                Now, let’s load the model, located at
                <code>/static/models/turtle_compressed.glb</code>.
              </p>
              <CodeSnippet
                language={"javascript"}
                codeText={loadObject}
                theme={theme}
              />
              <p>
                When you first load it, the model will appear completely black.
              </p>
              <BlogImage
                imgDark={img3}
                imgLight={img3}
                theme={theme}
                description={`Fig(3.0) Render results`}
              />
              <p>
                That’s because its materials are instances of{" "}
                <code>MeshStandardMaterial</code> , which depend on lighting to
                display properly. For now, we’ll leave it as it is and focus on
                getting the model to load successfully. Adding proper lighting
                comes next. Remember to take it one step at a time—ensure the
                model loads without errors before moving forward.
              </p>
              <h4>
                <span>Step 2:</span> Adding a Cube Texture Environment Map
              </h4>
              <p>
                Now that our model is loaded, it’s time to give it some life and
                realism. Enter <code>environment maps</code> a game-changing
                technique for making 3D objects look like they truly belong in a
                scene. Whether it’s shiny metal surfaces, smooth glass, or
                reflective textures, an environment map simulates how your
                objects reflect their surroundings. This subtle touch goes a
                long way in creating a realistic render.
                <InsightDiv insightText={insightHDRIs} />
                For high-quality HDRIs,{" "}
                <a
                  className="link"
                  target="_blank"
                  href="https://polyhaven.com/"
                >
                  Polyhaven
                </a>{" "}
                - is one of the best resources out there. In this example, I’ve
                already downloaded an environment map called{" "}
                <a
                  className="link"
                  target="_blank"
                  href="https://polyhaven.com/a/umhlanga_sunrise"
                >
                  Umhlanga Sunrise
                </a>{" "}
                (8K HDR) from Polyhaven. The texture is already saved in the
                <code>/static/environmentMaps/</code> folder, ready to go.
                However, 8K HDR textures tend to be hefty—the original file is
                around <code>93MB</code> , which is far from ideal for web
                performance.
              </p>
              <p>
                To optimize this, I used{" "}
                <a
                  className="link"
                  target="_blank"
                  href="https://matheowis.github.io/HDRI-to-CubeMap/"
                >
                  HDRI to CubeMap Converter
                </a>{" "}
                to generate cube map textures. The result? Compact textures that
                are around
                <code>400KB</code> each—a massive reduction without sacrificing
                too much quality. This is a great example of why bigger isn’t
                always better when it comes to web rendering. 😂
              </p>
              <h4>So, let's discuss now Why Go with LDR for Web Rendering?</h4>
              <p>
                When working on web-based 3D rendering, performance is
                everything. Here’s why LDR maps often win out over HDR:
                <ul>
                  <li>
                    <i className="fa-solid fa-arrow-right"></i>{" "}
                    <b>Performance-Friendly: </b> On the web, we aim for a frame
                    render time of 16ms or less to hit 60 FPS. LDR maps keep
                    things snappy without sacrificing too much quality.
                  </li>
                  <li>
                    <i className="fa-solid fa-arrow-right"></i>{" "}
                    <b>Smaller File Sizes: </b> LDR maps are compressed, meaning
                    they load faster and consume less bandwidth. Your users (and
                    their devices) will thank you.
                  </li>
                  <li>
                    <i className="fa-solid fa-arrow-right"></i>{" "}
                    <b>Balanced Realism: </b> Sure, HDR looks amazing, but LDR
                    can deliver impressive visuals too—perfect for small scenes
                    or performance-constrained devices.
                  </li>
                </ul>
                Bringing it all together, for our scene, we’ll stick with an LDR
                environment map to keep everything smooth and responsive. Up
                next, we’ll add the cube map to our scene and see the magic
                happen as our model reflects its surroundings. Time to light it
                up—let’s go! 🎨
              </p>
              <p>
                Because these textures are composed of 6 images (like the faces
                of a cube), we have to use a <code>CubeTextureLoader</code>.
              </p>
              <CodeSnippet
                language={"javascript"}
                codeText={loadEnvironment}
                theme={theme}
              />
              <h4>Adding the Environment Map as a Background</h4>
              <p>
                The simplest way to add an environment map is by setting it as
                the background of the scene. A basic approach would involve
                creating a massive cube around your scene, applying the texture
                to its interior faces, and calling it a day. While this works,
                it's limited—serving only as a static background.
                <br />
                <br />
                Thankfully, Three.js has a built-in feature that simplifies this
                process. After creating both the <code>environmentMap</code> and
                the scene, we can assign the map to the scene’s{" "}
                <code>background</code> property like this:
                <br />
                <br />
              </p>
              <CodeSnippet
                language={"bash"}
                codeText={"scene.background = environmentMap"}
                theme={theme}
              />
              <p>
                This makes the map wrap around the entire scene, giving the
                illusion of depth and context without the need for a physical
                cube.
              </p>
              <h4>Using the Environment Map for Lighting</h4>
              <p>
                To achieve truly realistic rendering, we need the environment
                map to not only serve as the backdrop but also act as a light
                source for the model. In a previous step, we saw how to apply an
                environment map to a material (like{" "}
                <code>MeshStandardMaterial</code> ) using the{" "}
                <code>envMap</code> property.
                <br />
                <br />
                For scene-wide lighting, Three.js allows us to assign the same
                environment map to the scene’s <code>environment</code>{" "}
                property. This automatically lights up the model with the
                environment map's colors and tones:
              </p>
              <CodeSnippet
                language={"bash"}
                codeText={"scene.environment = environmentMap"}
                theme={theme}
              />
              <p>
                With this dual functionality, your scene will not only look
                cohesive but also interact with the environment map in ways that
                enhance realism—reflecting light and shadows more naturally. In
                the next step, we’ll continue refining our scene to bring out
                even more photorealistic details.
              </p>
              <h4>
                <span>Step 3:</span> Adding ground with textures
              </h4>
              <p>
                One of the most annoying things when using an environment map as
                the background is that objects often look like they're floating.
                This happens because the environment map is set to appear
                infinitely far away, and there's no sense of scale or a grounded
                surface for the objects to sit on. To fix this, we need to
                create a plane beneath the model, making it feel like part of
                the environment, interacting with the surrounding lighting and
                reflections.
                <br />
                <br />
                By adding a textured ground, we not only give the model
                something to “stand” on, but we also enhance the overall
                immersion of the 3D scene. A realistic ground will help our
                model blend seamlessly into the environment, making the entire
                scene feel more cohesive. It also allows us to take full
                advantage of the lighting and environment map to achieve the
                best possible render.
              </p>
              <CodeSnippet
                language={"javascript"}
                codeText={loadGround}
                theme={theme}
              />
              <p>
                By now, we’ve added a textured and realistic ground beneath our
                model, which helps prevent that "floating" feeling caused by the
                environment map.
              </p>
              <BlogImage
                imgDark={img4}
                imgLight={img4}
                theme={theme}
                description={`Fig(4.0) Progress So Far. Normal lighting and simple render`}
              />
              <p>
                So far the progress look okayish, which not that bad but not
                that great as well. Going forward we will try to make this scene
                realistic, with good colors, lighting, shadow, sharp lines etc.
              </p>
              <h4>
                <span>Step 4:</span> Enhancing the Tone with Tone mapping
              </h4>
              <p>
                Tone mapping is an essential technique for achieving realistic
                renders, especially when working with HDR and LDR textures.
                While the HDR environment map provides rich lighting data, tone
                mapping in Three.js helps us adjust the color and brightness to
                make the scene look more natural and visually balanced.
                <br />
                <br />
                In simple terms, tone mapping simulates how human eyes perceive
                light and color. In 3D rendering, when using HDR images or high
                dynamic range lighting, the colors often look too extreme or
                unnatural. Tone mapping compresses these values into a range
                that is suitable for display on standard monitors, giving a more
                realistic look. To change the tone mapping, update the{" "}
                <code>toneMapping</code> property on the WebGLRenderer.
                <br />
                <br />
                Three.js gives us several tone mapping options to choose from,
                each with its own effect on the scene:
                <ul>
                  <li>
                    <i className="fa-solid fa-arrow-right"></i>{" "}
                    <code>THREE.NoToneMapping</code> (default)
                  </li>
                  <li>
                    <i className="fa-solid fa-arrow-right"></i>{" "}
                    <code>THREE.LinearToneMapping</code>
                  </li>
                  <li>
                    <i className="fa-solid fa-arrow-right"></i>{" "}
                    <code>THREE.ReinhardToneMapping</code>
                  </li>
                  <li>
                    <i className="fa-solid fa-arrow-right"></i>{" "}
                    <code>THREE.CineonToneMapping</code>
                  </li>
                  <li>
                    <i className="fa-solid fa-arrow-right"></i>{" "}
                    <code>THREE.ACESFilmicToneMapping</code>
                  </li>
                </ul>
                For our project, we’ll stick with{" "}
                <code>THREE.ACESFilmicToneMapping</code>, as it strikes a
                perfect balance between performance and visual quality!
              </p>
              <CodeSnippet
                language={"javascript"}
                codeText={toneMapping}
                theme={theme}
              />
              <p>
                Tone mapping doesn’t just balance light—it takes our scene
                closer to photographic realism. Think of it as mimicking how a
                camera with proper settings captures light. This technique
                ensures that bright areas don’t appear overly harsh, and darker
                areas retain subtle details, striking a beautiful balance in the
                final render.
                <br /> <br />A crucial aspect of tone mapping is the exposure
                setting. With this, you control how much light is "let into" the
                scene, much like adjusting a camera's aperture. This makes tone
                mapping highly adaptable to different lighting conditions. A
                higher exposure value brightens the scene, while a lower value
                darkens it. To tweak this, update the{" "}
                <code>toneMappingExposure</code> property directly on the
                renderer. This simple adjustment has a significant impact on how
                your scene looks, allowing you to fine-tune the lighting
                dynamics and overall tone. <br /> <br />
                Play around with this value to find the sweet spot where your
                scene feels most lifelike—it's worth the effort!
              </p>
              <h4>
                <span>Step 5:</span> Adding Antialiasing to renderer
              </h4>
              <p>
                When rendering 3D scenes, you may sometimes notice a jagged,
                stair-like effect along the edges of geometries, especially if
                your screen has a low pixel ratio. This visual artifact, called
                aliasing, occurs because the edges of 3D objects rarely align
                perfectly with the pixel grid of your screen.
              </p>
              <h4>Why Does Aliasing Happen?</h4>
              <p>
                Rendering a pixel involves determining which geometry is visible
                in that pixel, calculating its color, and then displaying that
                color. However, since geometry edges typically don't align with
                the vertical or horizontal lines of the pixel grid, you end up
                with the jagged edges we call aliasing.
              </p>
              <p>
                Common Solutions to Aliasing: Developers have tackled this
                problem for years, and several methods have emerged to minimize
                aliasing:
                <ul>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>
                    <b>Super Sampling Anti-Aliasing (SSAA): </b> This method
                    increases the renderer's resolution by a factor (e.g.,
                    doubling it). When the image is resized back to normal, each
                    pixel's color is averaged from the colors of the rendered
                    sub-pixels. This produces smooth edges but requires
                    rendering up to 4x more pixels, which can cause performance
                    issues.
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>
                    <b>Multi Sampling Anti-Aliasing (MSAA): </b> MSAA focuses on
                    the edges of geometries, rendering multiple values (e.g., 4)
                    per pixel only on the edges. These values are averaged to
                    produce the final pixel color. MSAA is far more efficient
                    than SSAA because it minimizes the number of extra pixels
                    being calculated.
                    <br />
                    <br />
                    Most modern GPUs support MSAA, and Three.js makes it
                    incredibly easy to enable. You just need to set the
                    <code>antialias</code> property to <code>true</code> when
                    creating your WebGL renderer.
                  </li>
                </ul>
              </p>
              <CodeSnippet
                language={"javascript"}
                codeText={antiAliasing}
                theme={theme}
              />
              <p>
                While our model may already look fine due to its high level of
                detail, antialiasing is crucial for scenes with sharp edges or
                bright contrasts. By smoothing out these edges, your 3D render
                will look much more polished and professional.
              </p>
              <h4>
                <span>Step 6:</span> Lights and shadows for illumination
              </h4>
              <p>
                One important addition for a realistic render is to add shadows.
                Since the environment map is like a light coming from every
                direction, it can’t cast shadows. We need to add a light that
                roughly matches the lighting of the environment map and use it
                to cast shadows.
              </p>
              <CodeSnippet
                language={"javascript"}
                codeText={lightsAndShadows}
                theme={theme}
              />
              <h4>Activate the shadows</h4>
              <p>
                Now that we have a light that can cast a shadow, toggle the
                shadows on the WebGLRenderer instance. Then, change the shadow
                type to <code>THREE.PCFSoftShadowMap</code>.
              </p>
              <CodeSnippet
                language={"javascript"}
                codeText={enableShadows}
                theme={theme}
              />
              <h4>
                <span>Step 7:</span> Final Adjustments
              </h4>
              <p>
                With everything in place, it's time to fine-tune the details.
                Experiment with values, explore different environment maps,
                adjust shadow settings, and test various tone mapping options.
                This is your creative playground—take your time to perfect the
                scene.
                <ul>
                  <li>
                    <i className="fa-solid fa-arrow-right"></i> Take breaks and
                    revisit your render with fresh eyes.
                  </li>
                  <li>
                    <i className="fa-solid fa-arrow-right"></i> Observe
                    real-world references for accurate details.
                  </li>
                  <li>
                    <i className="fa-solid fa-arrow-right"></i> Calibrate your
                    screen to ensure colors are displayed correctly.
                  </li>
                  <li>
                    <i className="fa-solid fa-arrow-right"></i> Share your work
                    with friends or colleagues to get constructive feedback and
                    an external perspective.
                  </li>
                </ul>
                Here's a comparison highlighting how much realism we've added
                while keeping performance at its peak with minimal resource
                requirements:
              </p>
              <ImageSlider
                leftImage={img4}
                rightImage={img5}
                caption={
                  "Side-by-Side Comparison: Standard Scene vs. Enhanced Realism with Advanced Rendering Techniques"
                }
              />
              <p>Here’s the final render! 😉</p>
              <CodeSandpack
                files={fileRealisticRender}
                theme={theme}
                layout="preview"
              />{" "}
            </div>

            <div className="blog-section">
              <h3 className="blog-section-title">
                Advanced Techniques and Applications
              </h3>
              <p>
                Once you've mastered the basics of realistic 3D rendering, there
                are several advanced techniques and applications that can take
                your renders to the next level. These methods can further
                enhance the realism of your scenes and open up new creative
                possibilities for your projects.
                <ul>
                  <li>
                    {" "}
                    <i class="fa-solid fa-arrow-right"></i>
                    <b>Physically Based Rendering (PBR): </b> One of the most
                    powerful rendering techniques used in photorealism is
                    Physically Based Rendering (PBR). This approach simulates
                    the way light interacts with materials in the real world,
                    taking into account properties like reflectivity, roughness,
                    and refraction. By using PBR workflows, you can ensure that
                    materials in your scene behave more realistically under
                    different lighting conditions. Three.js offers built-in
                    support for PBR materials, which allows you to achieve more
                    accurate and dynamic results.
                  </li>
                  <li>
                    {" "}
                    <i class="fa-solid fa-arrow-right"></i>
                    <b>Subsurface Scattering (SSS): </b> Subsurface scattering
                    is an essential technique for simulating how light
                    penetrates and diffuses within translucent materials like
                    skin, wax, or marble. This effect is crucial for creating
                    lifelike characters or organic objects. While it can be
                    computationally intensive, it’s a must-try for projects
                    aiming for photorealism in organic rendering.
                    <br />
                    In Three.js, you can implement basic subsurface scattering
                    with MeshStandardMaterial and tweaking the subsurface
                    property, although more advanced implementations might
                    require custom shaders for better control and realism.
                  </li>
                  <li>
                    {" "}
                    <i class="fa-solid fa-arrow-right"></i>
                    <b>Real-Time Reflections with Ray Tracing: </b> Ray tracing
                    is an advanced rendering technique that simulates the path
                    of light as it interacts with surfaces, allowing for
                    reflections, refractions, and shadows with incredible
                    realism. Real-time ray tracing is becoming increasingly
                    viable on the web with advancements in hardware and
                    software.
                    <br />
                    While Three.js doesn’t directly support full ray tracing,
                    you can still simulate reflections in real-time using
                    techniques like screen-space reflections (SSR) or cube map
                    reflections. For complex reflections, consider combining ray
                    tracing with environment maps or reflection probes to
                    enhance realism.
                  </li>
                  <li>
                    {" "}
                    <i class="fa-solid fa-arrow-right"></i>
                    <b>Post-Processing Effects : </b> Once you’ve set up your
                    scene, post-processing effects can add the final touches of
                    realism. These effects, applied after the scene is rendered,
                    include things like bloom, depth of field, motion blur, and
                    film grain. These effects can make your renders feel more
                    cinematic and immersive.
                    <br />
                    Three.js offers a post-processing stack that allows you to
                    easily add a variety of effects to your scene. By combining
                    multiple post-processing passes, you can create a wide range
                    of visual styles, from hyper-realistic to artistic.
                  </li>
                </ul>
              </p>
            </div>

            <div className="blog-section">
              <h3 className="blog-section-title">Conclusion</h3>
              <p>
                Creating photorealistic 3D renders in a web environment is no
                small feat. By combining techniques like baking textures,
                leveraging environment maps, and fine-tuning lighting and
                shadows, you can transform your 3D scenes into visually
                stunning, immersive experiences. Each of these elements—when
                applied thoughtfully—bridges the gap between raw imports and
                polished artistry.
              </p>
              <p>
                As we’ve seen, achieving realism isn’t about using the heaviest
                models or the most resource-intensive textures—it’s about
                balance. Web-based rendering thrives on optimization,
                creativity, and smart compromises, allowing us to deliver
                engaging visuals while keeping performance in check.
              </p>
              <p>
                Now, it’s your turn to experiment! Whether you’re building
                product showcases, creating interactive art, or developing
                immersive portfolios, the techniques covered here will help you
                elevate your projects to the next level. Remember, the key lies
                in iteration: adjust, refine, and let your creativity flow.
              </p>
              <p>
                Keep exploring, and who knows? Your next render might just set a
                new benchmark for web-based photorealism. 🌟
              </p>
              <p>Happy 3D rendering! 🎨</p>
            </div>
          </div>
        </div>
      </div>
      <BlogsFooter theme={theme} />
      <Footer toggleTheme={toggleTheme} />
    </>
  );
};

export default RealisticRender;
