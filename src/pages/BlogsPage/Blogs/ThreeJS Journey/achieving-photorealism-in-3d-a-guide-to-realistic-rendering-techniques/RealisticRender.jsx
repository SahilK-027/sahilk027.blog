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
import BlogImage from "../../../../../components/BlogImage/BlogImage";
import InfoDiv from "../../../../../components/InfoDIV/InfoDiv";
import CodeSnippet from "../../../../../components/SyntaxHighlighter/CodeSnippet";
import img1 from "./utils/assets/1.webp";
import img1l from "./utils/assets/1l.webp";
import img2 from "./utils/assets/2.webp";
import img2l from "./utils/assets/2l.webp";
import img3 from "./utils/assets/img3.webp";
import img4 from "./utils/assets/4.png";
import InsightDiv from "../../../../../components/InsightDiv/InsightDIV";

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
    // window.scrollTo(0, 0);
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

  const loadEnvironment = ` // Inside initLoader add cubeTextureLoader
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

  const loadGround = ` // Inside initLoader add cubeTextureLoader
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
  /* ==========================================================
      ! Please make sure you have at max 8 sections in the array
  ========================================================== */
  const sections = [
    "What we will learn?",
    "Setup for the code",
    "Let's write the code",
  ];

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
                <br />
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
                Thankfully, Three.js has a built-in feature that simplifies this
                process. After creating both the <code>environmentMap</code> and
                the scene, we can assign the map to the scene’s{" "}
                <code>background</code> property like this:
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
                So far the progress look okish, which not that bad but not that
                great as well. Going forward we will try to make this scene
                realistic, with good colors, lighting, shadow, sharp lines etc.
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

export default RealisticRender;
