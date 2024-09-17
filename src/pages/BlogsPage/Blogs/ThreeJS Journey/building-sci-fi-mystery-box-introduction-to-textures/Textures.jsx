import React, { useEffect, useState } from "react";
import Navbar from "../../../../../components/Navbar/Navbar";
import BlogsFooter from "../../../../../components/BlogsFooter/BlogsFooter";
import Footer from "../../../../../components/Footer/Footer";
import { blogPost } from "../../../../../data/BlogsData";
import LeftSidebar from "../../../../../components/LeftSideBar/LeftSidebar";
import { Link } from "react-router-dom";
import "../../Blogs.scss";
import SuzanneThreeBG from "../../../../../components/SuzanneThreeBG/SuzanneThreeBG";
import CodeSandpack from "../../../../../components/CodeSandpack/CodeSandpack";
import { cssSandpack, htmlSandpack, jsSandpack } from "./utils/codeProviders";
import sciFiBoxVideo from "../../../../../assets/videos/general/sci-fi-box.mp4";
import sciFiBoxThumbnail from "../../../../../assets/images/blogs-images/ThreeJS/Blog3/sci-fi-box-thumbnail.webp";
import BlogImage from "../../../../../components/BlogImage/BlogImage";
import MustReadDiv from "../../../../../components/MustReadDIV/MustReadDiv";
import CodeSnippet from "../../../../../components/SyntaxHighlighter/CodeSnippet";
import InfoDiv from "../../../../../components/InfoDIV/InfoDiv";
import ao from "./utils/assets/ao.webp";
import color from "./utils/assets/Color.webp";
import all from "./utils/assets/AllMaps.webp";
import height from "./utils/assets/displacement.webp";
import metal from "./utils/assets/metalness.webp";
import normal from "./utils/assets/Normal.webp";
import roughness from "./utils/assets/roughness.webp";
import uvImg from "./utils/assets/uv.webp";
import { animated, useSpring } from "react-spring";

const TexturesBlog = ({
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
    const blog = blogPost.find((blog) => blog.blogNo === 6);
    setCurrBlog(blog);
  }, []);

  const sidebarAnimation = useSpring({
    opacity: isSidebarVisible ? 1 : 0,
    config: { tension: 100, friction: 50 },
  });

  const handleScroll = () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    const fullHeight = scrollHeight - clientHeight;
    const scrolled = (scrollTop / fullHeight) * 100;
    setScrollPercentage(scrolled);

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
  }, []);

  const sections = [
    "Recap: Where We Left Off",
    "Textures: Introduction",
    "Let's start coding",
    "UV Unwrapping: An Introduction",
    "Conclusion",
  ];

  const mustRead = `
  <div>
  <p>Physically Based Rendering (PBR) is a cutting-edge approach that models the interaction of light with surfaces in a way that mimics the real world. While this blog won't dive into the intricate details of PBR, it's an essential topic for anyone looking to elevate their understanding of rendering in 3D graphics.
  </p>
  <p> 👉 Curious minds can explore these excellent resources: </p>
  <ul>
    <li>
      <i class="fa-solid fa-arrow-right"></i>
      <a href="https://marmoset.co/posts/basic-theory-of-physically-based-rendering/" target="_blank">Basic Theory of Physically Based Rendering</a>
    </li>
    <li>
      <i class="fa-solid fa-arrow-right"></i>
      <a href="https://marmoset.co/posts/physically-based-rendering-and-you-can-too/" target="_blank">Physically Based Rendering, And You Can Too!
      </a>
    </li>
  </ul>
  <p>
  While there are many other techniques, PBR is becoming the standard for realistic renders, and many software, engines, and libraries are using it.
  </p>
  </div>
  `;

  const orbitControlsText = `import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
/**
 * Previous code ...
*/
// Orbit controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true; // Smooths out the movement`;

  const textureLoader = `/**
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
`;
  const textureLoader2 = `// Load textures
const textures = {
  ambientOcclusion: "https://i.ibb.co/b39GPJK/AO.webp",
  color: "https://i.ibb.co/s29KQb3/Color.webp",
  height: "https://i.ibb.co/C57vdmZ/Height.webp",
  metalness: "https://i.ibb.co/HzGhhSc/Metalness.webp",
  normal: "https://i.ibb.co/LQfY9n1/normal.webp",
  roughness: "https://i.ibb.co/FnyjDdB/roughness.webp",
  emissive: "https://i.ibb.co/HGhsvfk/Emmision.webp",
};

const textureMap = {};
for (const [key, url] of Object.entries(textures)) {
  textureMap[key] = textureLoader.load(url);
}`;

  const textureLoader3 = `// Set texture properties
textureMap.color.colorSpace = THREE.SRGBColorSpace;
textureMap.color.wrapS = THREE.RepeatWrapping;
textureMap.color.wrapT = THREE.RepeatWrapping;
textureMap.color.minFilter = THREE.NearestFilter;
textureMap.color.magFilter = THREE.NearestFilter;
`;

  const textureApply = `/**
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
`;

  const lights = `/**
 * Lighting
 */
// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.position.set(-1, 1, -1);
scene.add(directionalLight);

// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);`;

  const AOAttrib = `/**
 * Previous code ...
 */
// Create mesh
const mesh = new THREE.Mesh(geometry, material);
mesh.rotation.y = Math.PI;
scene.add(mesh);

// Set uv2 attribute for ambient occlusion map
geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(geometry.attributes.uv.array, 2)
);`;

  const colorAnimation = `const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Create a disco effect by animating the emissive color
  const hue = (elapsedTime * 0.075) % 1;
  material.emissive = new THREE.Color().setHSL(hue, 1, 0.5);

  // Rotate the cube on X, Y, Z axes
  mesh.rotation.x = elapsedTime * 0.7;
  mesh.rotation.y = elapsedTime * 0.7;

  // Render scene
  renderer.render(scene, camera);

  // Request next frame
  window.requestAnimationFrame(tick);
};

tick();`;

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
              In the previous blog posts, we explored the basics of setting up a
              3D scene and dipped our toes into the wonderful waters of
              Three.js. If you’ve been following along, you’ve already got your
              hands dirty with scenes and cameras, and maybe even created some
              simple 3D objects. Now, it’s time to level up and dive deeper into
              the field of Textures. Ready to explore the magic behind what
              makes 3D objects look so realistic? Let’s get started!
            </p>

            <div className="blog-section">
              <h3 className="blog-section-title">Recap: Where We Left Off</h3>
              <p>
                Before we jump in, let's quickly recap. In our{" "}
                <a
                  href="/blogs/three-js-journey/into-the-3rd-dimension-build-your-first-3d-project"
                  target="_blank"
                  className="link"
                >
                  {" "}
                  last blog
                </a>
                , we built a simple 3D project where we covered the essentials
                of Three.js: creating a scene, adding a camera, and rendering it
                all to the screen. If you missed it, or just need a refresher, I
                highly recommend going back and reading it to ensure you’re up
                to speed. But if you're ready to move forward, let’s create
                something cool and realistic looking using three.js{" "}
                <a
                  href="https://threejs.org/docs/#api/en/textures/Texture"
                  className="link"
                  target="_blank"
                >
                  Textures
                </a>{" "}
                .
                <br />
              </p>
              <p>What we will build?</p>
              <div className="video-container">
                <video
                  className="video"
                  loop
                  autoPlay
                  muted={true}
                  preload="auto"
                  poster={sciFiBoxThumbnail}
                >
                  <source src={sciFiBoxVideo} type="video/mp4" />
                </video>
              </div>
            </div>

            <div className="blog-section">
              <h3 className="blog-section-title">Textures: Introduction</h3>
              <p>
                Bored with your purple sphere yet? It's time to add some
                textures. We will create a cool looking SCI-FI mystery box,
                looking at first it might seem advance to you but don't worry
                it's damn easy to build.
                <br />
                When working with 3D models, different types of textures are
                used to create a realistic and detailed appearance by simulating
                various surface characteristics. Below are explanations of the
                common types of textures:
                <ul>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>{" "}
                    <b>Ambient Occlusion (AO) Map:</b> Simulates the soft
                    shadows that occur in crevices, corners, and other areas
                    where ambient light is occluded or blocked. AO maps add
                    depth to your model by darkening areas where light is less
                    likely to reach, enhancing the sense of realism without the
                    need for complex lighting calculations.
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>{" "}
                    <b>Color (Diffuse) Map:</b> Determines the base color of the
                    surface. This is the most straightforward type of texture
                    map, applying the main color to the object. It gives the
                    model its visual appearance in terms of color and basic
                    patterns.
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i> <b>Height Map:</b>{" "}
                    Represents the elevation or depth of the surface. Height
                    maps are often used for displacement mapping, where the
                    geometry is physically altered based on the values in the
                    texture. High values raise the surface, while low values
                    create depressions, adding actual depth and complexity to
                    the surface.
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>{" "}
                    <b>Roughness Map:</b> Controls the smoothness or roughness
                    of the surface. Roughness maps influence how light interacts
                    with the surface by determining how sharp or blurred
                    reflections appear. A surface with high roughness will
                    scatter light more, appearing dull and matte, while a low
                    roughness value will create a glossy, reflective surface.
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>{" "}
                    <b>Metalness Map:</b> Defines which parts of the surface are
                    metallic and which are non-metallic. Metalness maps help
                    simulate the reflective properties of metals. A value of 1
                    indicates a fully metallic surface that reflects its
                    environment and interacts with light differently than
                    non-metals. A value of 0 means the surface behaves like a
                    non-metallic material, often paired with a roughness map to
                    achieve realistic effects.
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i> <b>Normal Map:</b>{" "}
                    Adds fine detail to the surface without changing the actual
                    geometry. Normal maps simulate small surface details such as
                    bumps, wrinkles, or grooves by altering the way light
                    interacts with the surface. They give the illusion of
                    complex surface detail while keeping the underlying geometry
                    simple.
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i> <b>Emissive Map:</b>{" "}
                    Makes parts of the surface appear to emit light. Emissive
                    maps make certain areas of the texture glow as if they are
                    self-illuminated, independent of the scene’s lighting. This
                    effect is commonly used for things like glowing screens,
                    neon signs, or any element that needs to appear as a light
                    source.
                  </li>
                </ul>
              </p>

              <div className="multiple-image-container">
                <BlogImage
                  imgDark={"https://i.ibb.co/b39GPJK/AO.webp"}
                  imgLight={"https://i.ibb.co/b39GPJK/AO.webp"}
                  theme={theme}
                  description={`AO`}
                />
                <BlogImage
                  imgDark={"https://i.ibb.co/s29KQb3/Color.webp"}
                  imgLight={"https://i.ibb.co/s29KQb3/Color.webp"}
                  theme={theme}
                  description={`Color`}
                />
                <BlogImage
                  imgDark={"https://i.ibb.co/C57vdmZ/Height.webp"}
                  imgLight={"https://i.ibb.co/C57vdmZ/Height.webp"}
                  theme={theme}
                  description={`Height`}
                />
                <BlogImage
                  imgDark={"https://i.ibb.co/HzGhhSc/Metalness.webp"}
                  imgLight={"https://i.ibb.co/HzGhhSc/Metalness.webp"}
                  theme={theme}
                  description={`Metalness`}
                />
                <BlogImage
                  imgDark={"https://i.ibb.co/LQfY9n1/normal.webp"}
                  imgLight={"https://i.ibb.co/LQfY9n1/normal.webp"}
                  theme={theme}
                  description={`Normal`}
                />
                <BlogImage
                  imgDark={"https://i.ibb.co/FnyjDdB/roughness.webp"}
                  imgLight={"https://i.ibb.co/FnyjDdB/roughness.webp"}
                  theme={theme}
                  description={`Roughness`}
                />
                <BlogImage
                  imgDark={"https://i.ibb.co/HGhsvfk/Emmision.webp"}
                  imgLight={"https://i.ibb.co/HGhsvfk/Emmision.webp"}
                  theme={theme}
                  description={`Emission`}
                />
                <div></div>
                <div></div>
              </div>
              <MustReadDiv mustReadText={mustRead} />
            </div>

            <div className="blog-section">
              <h3 className="blog-section-title">Let's start coding</h3>
              <p>
                Let's dive into setting up the project. To start, you'll need to
                initialize the project by creating a Vite app.
              </p>
              <InfoDiv
                infoText={`
                  <p> Continuing from Where We Left Off </p>
                  <p>In our previous blog, <a href="/blogs/three-js-journey/into-the-3rd-dimension-build-your-first-3d-project" target="_blank">"Into the 3rd Dimension: Build Your First 3D Project"</a>, we covered the basic setup needed to start creating a 3D scene. If you haven't checked it out yet, we recommend starting there to get the foundational knowledge and setup. </p>
                  <br>
                  <p>
                  In this post, we'll build on that setup. Instead of starting from scratch, we’ll be using the knowledge from the previous blog. To get started, download the starter files from github using the button below, setup the code by following readme and follow along by adding the provided code snippets into your <code>index.js</code> file in the specified order.
                  </p>
                  <br>
                  <p class="div-flex-row">
                    <a href="www.google.com" target="_blank">
                      <button type="button">Starter Code</button>
                    </a>
                    <b class="animated-gradient">✨ If you wish you can use vite and try to code your own starter pack!</b>
                  </p>
                `}
              />
              <br />
              <p>
                We already have the base setup from our starter code, which
                includes creating a scene, setting up a camera, and adding a
                simple rotating cube. But now, we’re going to level up by adding
                textures, loading them correctly, and applying them to our
                mysterious sci-fi box.
              </p>
              <h4>
                <span>Step 1:</span> Add OrbitControls
              </h4>
              <p>
                Before diving into textures, let’s enhance the user experience
                by allowing camera control. OrbitControls will enable you to
                rotate around the scene, zoom in, and pan, providing a more
                interactive way to explore the 3D scene.
              </p>
              <CodeSnippet
                language={"javascript"}
                codeText={orbitControlsText}
                theme={theme}
              />
              <br />
              <p>
                With this, you can now click and drag to rotate around your
                scene. Try it out!
              </p>
              <h4>
                <span>Step 2:</span> Managing Texture Loading
              </h4>
              <p>
                Textures are an essential part of making our sci-fi box look
                realistic. But loading textures can sometimes be tricky,
                especially when dealing with multiple files. That’s where
                LoadingManager comes into play.
              </p>
              <CodeSnippet
                language={"javascript"}
                codeText={textureLoader}
                theme={theme}
              />
              <p>
                We’ve set up a LoadingManager to handle the process and log
                different stages of texture loading. This will help you debug
                any issues or delays during loading.
              </p>
              <h4>
                <span>Step 3:</span> Loading the Textures
              </h4>
              <p>
                Now, let’s load the textures. These textures will give our box a
                sci-fi feel, with metallic surfaces, glowing lights, and
                intricate details. We’ll load each texture using the
                TextureLoader and store them in a textureMap object for easy
                access.
              </p>
              <CodeSnippet
                language={"javascript"}
                codeText={textureLoader2}
                theme={theme}
              />
              <p>
                We’ve used placeholder URLs for the textures, but you can
                replace them with your own images if you like. The textures are
                now loaded and ready to be applied to our box.
              </p>
              <h4>
                <span>Step 4:</span> Setting Texture Properties
              </h4>
              <p>
                Not all textures are created equal. Some need to be repeated
                across a surface, while others should remain static. We’ll set
                properties for our textures to ensure they display correctly.
              </p>
              <CodeSnippet
                language={"javascript"}
                codeText={textureLoader3}
                theme={theme}
              />
              <p>
                These settings ensure that our color texture repeats across the
                surface and retains sharp details, perfect for the metallic,
                detailed look of a sci-fi box.
              </p>
              <h4>
                <span>Step 5:</span> Creating the Sci-Fi Box
              </h4>
              <p>
                Now comes the fun part—applying the textures to our box! We’ll
                use MeshStandardMaterial because it supports all the different
                maps we want to use (e.g., normal, roughness, metalness, etc.).
              </p>
              <CodeSnippet
                language={"javascript"}
                codeText={textureApply}
                theme={theme}
              />
              <p>
                This code adds multiple layers of detail to our box, making it
                look like it’s straight out of a sci-fi movie. Each map
                contributes to the final look—whether it’s the metallic sheen or
                the glowing edges.
              </p>
              <h4>
                <span>Step 6:</span> UV Mapping for Ambient Occlusion
              </h4>
              <p>
                To ensure that our Ambient Occlusion (AO) map is applied
                correctly, we need to set up a second set of UV coordinates.
                This step is crucial for adding depth and realism to the shadows
                on our box.
              </p>
              <CodeSnippet
                language={"javascript"}
                codeText={AOAttrib}
                theme={theme}
              />
              <p>
                This simple line of code will allow the AO map to interact with
                the geometry correctly, giving those subtle shadows that make a
                world of difference.
              </p>
              <h4>
                <span>Step 7:</span> Adding Interactive Lighting
              </h4>
              <p>
                Lighting can make or break your 3D scene. We already have
                directional and ambient light set up, but let’s tweak it a bit
                to enhance the overall effect.
              </p>
              <CodeSnippet
                language={"javascript"}
                codeText={lights}
                theme={theme}
              />
              <p>
                These lights ensure that our textures pop, creating a dynamic
                and immersive experience.
                <br />
                See impact of adding each map separately,
              </p>
              <div className="multiple-image-container-lg">
                <BlogImage
                  imgDark={color}
                  imgLight={color}
                  theme={theme}
                  description={`fig. Scene after applying only color map.`}
                />
                <BlogImage
                  imgDark={normal}
                  imgLight={normal}
                  theme={theme}
                  description={`fig. Scene after applying only color + normal map.`}
                />
                <BlogImage
                  imgDark={height}
                  imgLight={height}
                  theme={theme}
                  description={`fig. Scene after applying height map.`}
                />
                <BlogImage
                  imgDark={ao}
                  imgLight={ao}
                  theme={theme}
                  description={`fig. Scene after applying Ambient Occlusion map.`}
                />
                <BlogImage
                  imgDark={metal}
                  imgLight={metal}
                  theme={theme}
                  description={`fig. Scene after applying metalness map.`}
                />
                <BlogImage
                  imgDark={roughness}
                  imgLight={roughness}
                  theme={theme}
                  description={`fig. Scene after applying Roughness map.`}
                />
                <BlogImage
                  imgDark={all}
                  imgLight={all}
                  theme={theme}
                  description={`fig. Final impact of adding all the maps.`}
                />
                <div></div>
                <div></div>
              </div>
              <h4>
                <span>Step 8:</span> Animating the Box
              </h4>
              <p>
                Finally, let’s bring our box to life with some animation. We’ll
                add a disco effect by animating the emissive color, which will
                make the box look even more futuristic.
              </p>
              <CodeSnippet
                language={"javascript"}
                codeText={colorAnimation}
                theme={theme}
              />
              <p>
                This code snippet will not only rotate your box but also make it
                glow with shifting colors, adding that extra touch of sci-fi
                mystery.
              </p>
              <p>
                Here’s the final render! Popping up the scene by adding some
                constant value changes. 😉
              </p>
              <CodeSandpack
                files={fileTextureRender}
                theme={theme}
                layout="preview"
              />
            </div>

            <div className="blog-section">
              <h3 className="blog-section-title">
                UV Unwrapping: An Introduction
              </h3>
              <p>
                While it’s quite logical how to place a texture on a cube—where
                each face corresponds directly to a square section of the
                texture—things can get a little trickier for more complex
                geometries. You might ask, "What if I have a complex 3D model?
                How do I add a texture to it?"
                <br />
                This is where UV unwrapping becomes essential.
              </p>
              <b>The Challenge with Complex Models</b>
              <p>
                Imagine you’re working with a 3D model of a character, an
                intricate vehicle, or a detailed landscape. Unlike a cube, these
                models don’t have simple, flat surfaces that directly match a
                texture image. If you were to apply a texture without any
                preparation, the result could be chaotic—stretched, squished, or
                misaligned textures that make the model look unprofessional.
              </p>
              <p>
                UV unwrapping solves this problem by converting the complex 3D
                surface into a 2D layout that can be easily textured. Without UV
                unwrapping, applying textures to complex models would be nearly
                impossible to control, resulting in distorted or misplaced
                details. UV unwrapping gives you the control needed to ensure
                your textures look natural and professional, even on the most
                intricate 3D shapes.
              </p>
              <p>
                You can actually see those UV 2D coordinates in the
                geometry.attributes.uv property:
              </p>
              <CodeSnippet
                codeText={`console.log(geometry.attributes.uv)`}
                language="js"
                theme={theme}
              />
              <p>
                These UV coordinates are automatically created by Three.js for
                built-in primitives. However, if you create custom geometry,
                you'll need to manually specify the UV coordinates. If you're
                using 3D software to model the geometry, you'll need to perform
                UV unwrapping to ensure proper texture mapping.
              </p>
              <BlogImage
                imgDark={uvImg}
                imgLight={uvImg}
                theme={theme}
                description={`fig. UV Unwrapped 3D model of a character.`}
              />
            </div>

            <div className="blog-section">
              <h3 className="blog-section-title">Conclusion</h3>
              <p>
                Congratulations! 🎉 You've just leveled up your Three.js skills
                by creating a mesmerizing sci-fi mystery box complete with
                intricate textures and dynamic animations. From setting up the
                scene and loading textures to applying complex materials and
                adding interactive controls, you've explored key aspects of 3D
                rendering that bring your projects to life.
              </p>
              <p>
                Here’s a quick recap of what you have learned:
                <ul>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>{" "}
                    <b>Texture Loading:</b> We learned how to load and manage
                    different types of textures, each adding a unique detail to
                    our mystery box.
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>{" "}
                    <b>Applying Textures:</b> We applied these textures to our
                    3D object using MeshStandardMaterial, enhancing its realism
                    with maps for color, normal, height, and more.
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>{" "}
                    <b>UV Unwrapping:</b> We understood the importance of UV
                    mapping in accurately projecting 2D textures onto 3D models.
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>{" "}
                    <b>Adding Controls & Animation:</b> We used Orbit Controls
                    to give users the ability to interact with the scene and
                    explore from different angles. Finally, we added a fun disco
                    effect to the emissive color and created a smooth animation
                    loop to keep the scene dynamic and engaging.
                  </li>
                </ul>
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

export default TexturesBlog;
