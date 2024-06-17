import React, { useEffect, useState } from "react";
import Navbar from "../../../../../components/Navbar/Navbar";
import BlogsFooter from "../../../../../components/BlogsFooter/BlogsFooter";
import Footer from "../../../../../components/Footer/Footer";
import { blogPost } from "../../../../../data/BlogsData";
import LeftSidebar from "../../../../../components/LeftSideBar/LeftSidebar";
import { Link } from "react-router-dom";
import "../../Blogs.scss";
import BronoSimonVideo from "../../../../../assets/videos/general/bruno-simon.mp4";
import CoastalWorldVideo from "../../../../../assets/videos/general/coastal-world.mp4";
import LusionVideo from "../../../../../assets/videos/general/lusion.mp4";
import ActiveTheoryVideo from "../../../../../assets/videos/general/active-theory.mp4";
import InfoDiv from "../../../../../components/InfoDIV/InfoDiv";
import { cssSandpack, htmlSandpack } from "../../../../../data/SandpackUtils";
import CodeSnippet from "../../../../../components/SyntaxHighlighter/CodeSnippet";
import InsightDiv from "../../../../../components/InsightDiv/InsightDIV";
import ImageSlider from "../../../../../components/ImageSlider/ImageSlider";
import withLightImage from "../../../../../assets/images/with-lights.png";
import noLightImage from "../../../../../assets/images/no-lights.png";
import CodeSandpack from "../../../../../components/CodeSandpack/CodeSandpack";

const First3DProject = ({
  openCMDCenter,
  controlMusic,
  isMusicPlaying,
  theme,
  toggleTheme,
}) => {
  const [currBlog, setCurrBlog] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrBlog(
      blogPost.find((blog) => {
        return blog.blogNo === 2;
      })
    );
  }, [currBlog]);

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
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  // Function to toggle video playback
  const toggleVideo = (videoId) => {
    const video = document.getElementById(videoId);
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  // ! Please make sure you have at max 8 sections in the array
  const sections = [
    "Meet Three.js: Your Coolest Sidekick",
    "Some of my Favorite Three.js Projects",
    "The ABCs of Three.js",
    "Setting Up the Project",
    "Conclusion",
  ];
  const infoFavProjects = `
  <div>
  <p>
  Just four? I know, it's like trying to pick just one flavor of ice cream at an all-you-can-eat buffet - impossible! But hey, I've managed to narrow the list down to these four gems amidst the vast sea of creativity out there. 
  <br/>
  <br/>
  But wait, don't worry! I've got a long list of other jaw-dropping projects that deserve their moment in the spotlight. It's like having a playlist with endless hits, but for web development. So, to keep this blog on track and avoid going down the rabbit hole, I've limited myself to just these four. But hey, I promise to spill the beans on all the other mind-blowing projects I've stumbled upon. 
  </p>
  <br/>
  <br/>
  <p> 👉 Here is a list of some mesmerizing web experiences to watch out for:</p>
  <ul>
    <li>
      <i class="fa-solid fa-arrow-right"></i>
      <a href="https://midwam.com/en" target="_blank">Midwam</a>
    </li>
    <li>
      <i class="fa-solid fa-arrow-right"></i>
      <a href="https://www.oculus.com/medal-of-honor/" target="_blank">Medal of  Honor
      </a>
    </li>
    <li>
      <i class="fa-solid fa-arrow-right"></i>
      <a href="https://heraclosgame.com/" target="_blank">Heraclos Game</a>
    </li>
    <li>
      <i class="fa-solid fa-arrow-right"></i>
      <a href="https://bambukstudio.com/" target="_blank">Bambuk Studio</a>
    </li>
    <li>
      <i class="fa-solid fa-arrow-right"></i>
      <a href="https://www.knguru.de/en" target="_blank">Knguru</a>
    </li>
  </ul>
  <p>
  😉 Take some time and make sure that you visit them all!
  </p>
  </div>
  `;

  const infoABCs = `
  <div>
    <p>
      In this section, I will be writing some basic lines of code no need to code them along the way they are just there so that you will get familiar. Otherwise, we will start building our 3D playground in the next section.
    </p>
  </div>
  `;

  const insightCamera = `
  <div>
    <p>
    What are all those numbers? Let's break it down:
    </p>
    <ul>
      <li>
        <i class="fa-solid fa-arrow-right"></i>
        <b>Field of View (75): </b> The field of view is the extent of the observable world that is seen at any given moment. It's specified in degrees along the vertical axis. A higher value results in a wider field of view, providing a more expansive view of the 3D scene.
      </li>
      <li>
        <i class="fa-solid fa-arrow-right"></i>
        <b>Aspect Ratio (window.innerWidth / window.innerHeight): </b> The aspect ratio is the ratio of the camera's width to its height. It is typically set to the width of the browser window divided by the height, ensuring that the scene appears undistorted based on the dimensions of the viewing area.
      </li>
      <li>
        <i class="fa-solid fa-arrow-right"></i>
        <b>Near Clipping Plane (0.1): </b> The near clipping plane represents the closest distance from the camera at which objects are visible.
      </li>
      <li>
        <i class="fa-solid fa-arrow-right"></i>
        <b>Far Clipping Plane (1000): </b> The far clipping plane is the farthest distance at which objects are visible. Objects beyond this distance won't be rendered.
      </li>
    </ul>
  </div>
`;

  const sceneCode = `// How to set up the scene?
const scene = new THREE.Scene();`;

  const cameraCode = `// How to set up the camera?
const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  1000
);`;

  const rendererCode = `// How to set up the renderer?
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);`;

  const geometryCode = `// How to create the geometry?
const geometry = new THREE.BoxGeometry();`;

  const materialCode = `// How to create a material?
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
`;

  const meshCode = `// How to create a mesh?
// Combine geometry and material to create a mesh
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);`;

  const lightsCode = `// How to add lights?
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1).normalize();
scene.add(light);`;

  const consoleText = `npm create vite@latest
cd project-name
npm install three
npm run dev`;

  const filesStep2 = {
    "/index.js": {
      code: `/**
* Imports
*/
import './styles.css';
import * as THREE from 'three';
console.log(THREE);
`,
    },
    "/index.html": {
      code: htmlSandpack,
    },
    "/styles.css": {
      code: cssSandpack,
    },
  };

  const filesStep3 = `/**
* Imports
*/
import './styles.css';
import * as THREE from 'three';
console.log(THREE);

/**
* Canvas
*/
const canvas = document.querySelector("canvas.webgl");
`;

  const filesStep4 = `// ... Previous code

/*
* Scene
*/
const scene = new THREE.Scene();
`;

  const filesStep5 = `// ... Previous code

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
`;

  const filesStep6 = `// ... Previous code

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
`;

  const filesStep7 = `// ... Previous code

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
`;

  const filesStep8 = `// ... Previous code

/*
* Renderer
*/
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true
});
renderer.setSize(sizes.width, sizes.height);
`;

  const filesStep9 = `// ... Previous code

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

  const filesFirstRender = {
    "/index.js": {
      code: `/**
* Imports
*/
import './styles.css';
import * as THREE from 'three';
console.log(THREE);
      
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
`,
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
        <LeftSidebar
          scrollPercentage={scrollPercentage}
          activeSection={activeSection}
          sections={sections}
          setActiveSection={setActiveSection}
        />
        <div className="section-top">
          <Link to={currBlog?.seriesUrl}>
            <i className="fa-solid fa-arrow-left-long back-link"></i>&nbsp;
            Journey
          </Link>
          <div className="container">
            <div className="blog-series-header">
              <h1>{currBlog?.blogTitle}</h1>
              <p className="blog-date">Published on: {currBlog?.blogDate}</p>
            </div>
          </div>
          <div className="main-blog-content" onScroll={handleScroll}>
            <p>
              Have you ever looked at a website and thought, "How on earth did
              they make this magic happen? 😲" Well, I can relate to that, I was
              constantly amazed by some mesmerising websites built by creative
              French developers. Yeah, I am saying “French” and that’s for a
              reason. In France, there are a lot of creative web dev studios.
              And let's be real, a visit to{" "}
              <a href="http://awwwards.com/" target="_blank" className="link">
                awwwards.com
              </a>{" "}
              for me was always like stepping into a candy store of inspiration.
              In my free time, I'd linger there, watching the pixelated wonders
              and dreaming of creating my own masterpiece.
            </p>
            <br />
            <br />
            <p>
              Then, one fine day in December 2022, I stumbled upon{" "}
              <a
                className="link"
                href="https://bruno-simon.com/"
                target="_blank"
              >
                Bruno Simon's
              </a>{" "}
              mind-bending portfolio. It wasn't your normal website where you
              scroll and browse; it was an immersive playground of colours,
              physics, and sheer interactivity. I don’t know whether it was the
              physics, the vibrant colours, the seamless movements, or the joy
              of driving a virtual car through a website, whatever it was, I
              knew one thing for sure—I had to learn how to create such a
              wonder. And so began my journey into the world of{" "}
              <a href="https://threejs.org/" target="_blank">
                {" "}
                Three.js,
              </a>
              <br />
              <br />
              Fast forward to today, and here I am, having dived headfirst into
              the world of 3D web development. What started as a quest to
              unravel the mysteries behind Bruno Simon's portfolio turned into a
              delightful journey of learning, experimenting, and making my slice
              of 3D wonder.
              <br />
              <br />
              And guess what? I've decided to share the incredible things I've
              learned along the way with you all. Buckle up, my fellow
              developers, because I'm about to take you on a ride through the
              mesmerizing world of 3D web development. Let's turn your curiosity
              into creation and build something truly awesome together!
            </p>
            <div className="blog-section">
              <h3 className="blog-section-title">
                Meet Three.js: Your Coolest Sidekick
              </h3>
              <p>
                Now that we've set the stage for our 3D journey, let's take a
                closer look at our trusty sidekick—Three.JS!
                <ul>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>{" "}
                    <b>Three.js in a Nutshell:</b> Three.js is a JavaScript
                    library that speaks the language of browsers, allowing you
                    to build awesome animated 3D experiences in a snap. Ever
                    heard of{" "}
                    <a
                      target="_blank"
                      className="link"
                      href="https://en.wikipedia.org/wiki/WebGL#:~:text=WebGL%20(short%20for%20Web%20Graphics,effects%20in%20the%20HTML%20canvas."
                    >
                      WebGL
                    </a>
                    ? (Don’t worry if you haven’t 🤓) It's like the secret sauce
                    behind the scenes, and Three.js uses it to make your browser
                    a stage for dazzling 3D performances.
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>{" "}
                    <b>No High-End PCs Required:</b> Forget about needing a
                    supercomputer for breathtaking 3D visuals. Three.js lets you
                    create jaw-dropping scenes with nothing but your everyday
                    devices. Grab your smartphone, open a web browser, and
                    voila! You're now the proud owner of a pocket-sized 3D
                    theatre. Who needs a console when you've got Three.js in
                    your corner?
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>{" "}
                    <b>Three.js Ecosystem:</b> Three.JS is an{" "}
                    <a
                      href="https://github.com/mrdoob/three.js"
                      className="link"
                      target="_blank"
                    >
                      open-source project
                    </a>{" "}
                    hosted on GitHub where web developers alike gather to build
                    and maintain this awesome library.
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>{" "}
                    <b>Craft Anything, Anywhere:</b> Whether you're building a
                    game, directing a virtual music video, visualizing
                    scientific data, or want to build an interactive web
                    experience, Three.js is your versatile paintbrush for the
                    digital canvas. No need for a special device. If you have a
                    functioning laptop and a browser, you're all set to start
                    your creativity wherever and whenever you want.
                  </li>
                </ul>
              </p>
            </div>

            <div className="blog-section">
              <h3 className="blog-section-title">Some of my Favorite Three.js Projects</h3>{" "}
              <p>
                <div className="projects-grid">
                  <div className="project">
                    <a
                      href="https://bruno-simon.com/"
                      target="_blank"
                      onMouseEnter={() => toggleVideo("bruno-simon-video")}
                      onMouseLeave={() => toggleVideo("bruno-simon-video")}
                    >
                      <video
                        id="bruno-simon-video"
                        src={BronoSimonVideo}
                        loop
                        className="project-video"
                      ></video>
                    </a>
                  </div>
                  <div className="project">
                    <a
                      href="https://lusion.co/"
                      target="_blank"
                      onMouseEnter={() => toggleVideo("lusion-video")}
                      onMouseLeave={() => toggleVideo("lusion-video")}
                    >
                      <video
                        id="lusion-video"
                        src={LusionVideo}
                        loop
                        className="project-video"
                      ></video>
                    </a>
                  </div>
                  <div className="project">
                    <a
                      href="https://activetheory.net/"
                      target="_blank"
                      onMouseEnter={() => toggleVideo("active-theory-video")}
                      onMouseLeave={() => toggleVideo("active-theory-video")}
                    >
                      <video
                        id="active-theory-video"
                        src={ActiveTheoryVideo}
                        loop
                        className="project-video"
                      ></video>
                    </a>
                  </div>
                  <div className="project">
                    <a
                      href="https://coastalworld.com/"
                      target="_blank"
                      onMouseEnter={() => toggleVideo("coastal-world-video")}
                      onMouseLeave={() => toggleVideo("coastal-world-video")}
                    >
                      <video
                        id="coastal-world-video"
                        src={CoastalWorldVideo}
                        loop
                        className="project-video"
                      ></video>
                    </a>
                  </div>
                </div>
              </p>
              <InfoDiv infoText={infoFavProjects} />
            </div>

            <div className="blog-section">
              <h3 className="blog-section-title">The ABCs of Three.js</h3>
              <p>
                Alright, let's dig into the fundamental building blocks of
                Three.js.
              </p>
              <InfoDiv infoText={infoABCs} />
              <p>
                <ul>
                  <li>
                    <i class="fa-regular fa-circle-dot"></i>{" "}
                    <b> Scene - The Stage for Your 3D World:</b> In the world of
                    Three.js, a 'Scene' is the collection of all the objects,
                    the stage where you gather your 3D stuff to interact; it's
                    where you'll place your objects, lights, and cameras.
                  </li>
                  <CodeSnippet codeText={sceneCode} theme={theme} />
                  <br />
                  <li>
                    <i class="fa-regular fa-circle-dot"></i>{" "}
                    <b> Camera - Your virtual DSLR: </b> The 'Camera' determines
                    what part of the 3D world is visible to the user. The camera
                    is like eyes through which your audience will spectate the
                    3D world.
                  </li>
                  <CodeSnippet codeText={cameraCode} theme={theme} />
                  <InsightDiv insightText={insightCamera} />
                  <br />
                  <li>
                    <i class="fa-regular fa-circle-dot"></i>{" "}
                    <b> Renderer - The Assistant: </b> The 'Renderer' transforms
                    your 3D scene into pixels visible on the screen.
                  </li>
                  <CodeSnippet codeText={rendererCode} theme={theme} />
                  <br />
                  <li>
                    <i class="fa-regular fa-circle-dot"></i>{" "}
                    <b>Geometry - The Building Blocks: </b> 'Geometry' is where
                    you define the shape and structure of your 3D objects. This
                    is like the blueprint for your 3D objects. There are many 3D
                    as well as 2D geometries that Three.js provides like cones,
                    torus, cubes, circles, and hearts but I will let you
                    discover those. Head over to this link to get to know more
                    about Three.js geometries.
                  </li>
                  <CodeSnippet codeText={geometryCode} theme={theme} />
                  <br />
                  <li>
                    <i class="fa-regular fa-circle-dot"></i>{" "}
                    <b>Material - The Skin of Your Objects: </b> 'Material' is
                    the outer layer of your 3D objects, defining their
                    appearance. Like if you have a sphere and you want it to
                    look like our globe then you can add that particular
                    Material to your geometry. Materials are not something crazy
                    stuff they are just JPG or PNG image files or can also be
                    colors that you wanna define, that’s it!
                  </li>
                  <CodeSnippet codeText={materialCode} theme={theme} />
                  <br />
                  <li>
                    <i class="fa-regular fa-circle-dot"></i>{" "}
                    <b>Mesh - Bringing Geometry and Material Together: </b> I
                    define 'Mesh' as the marriage of geometry and material 😂,
                    creating a tangible 3D object. It creates the complete
                    renderable object.
                    <br />
                    If Geometry == Skeleton && Material == Flesh and skin then
                    Mesh == Complete Body
                  </li>
                  <CodeSnippet codeText={meshCode} theme={theme} />
                  <br />
                  <li>
                    <i class="fa-regular fa-circle-dot"></i>{" "}
                    <b>Lights & shadows - Illuminating the Stage: </b>
                    Before explaining you about Lights and shadows let me tell
                    you a story of the invisible 3D model!
                    <br />
                    <br />
                    So in 2023, I was building my first 3D website{" "}
                    <a
                      href="https://trinity-2023.vercel.app/"
                      target="_blank"
                      className="link"
                    >
                      Trinity-2023
                    </a>{" "}
                    , all excited. The canvas and background both were black. I
                    imported the 3D model of a fighter drone (Trinity bot as we
                    call it) and added it to the scene. But wait, where is it? I
                    was confused, what did I do wrong? I was left scratching my
                    head for hours, changing the blender export setting,
                    deleting the imported file, and re-importing it. But nothing
                    was actually happening.
                    <br />
                    <br />
                    Hours passed by, and I was trying to figure out the mystery.
                    Why is my model invisible? Then, I read a post on the
                    internet. Someone had dropped a simple truth bomb – "Don't
                    forget the lights.”
                    <br />
                    <br />
                    Lights? Really? I add lights to the scene, and boom! There
                    it is – my 3D model, finally visible. I can almost hear a
                    cheer from my computer. Lesson learned: Lights are like the
                    sunshine for 3D stuff. Without them, your creations are just
                    hiding in the shadows. So, note to self and fellow coders:
                    When things go invisible, turn on the lights! 🌟😅
                    <br />
                    <br />
                    Lights and shadows add realism and depth to your 3D scene If
                    it’s not already dark.
                  </li>
                  <ImageSlider
                    leftImage={withLightImage}
                    rightImage={noLightImage}
                    caption={
                      "Comparison of Scene with lights and shadows and Scene without lights and shadows."
                    }
                  />
                  <CodeSnippet codeText={lightsCode} theme={theme} />
                </ul>
              </p>
            </div>

            <div className="blog-section">
              <h3 className="blog-section-title">Setting Up the Project</h3>
              <p>
                Alright, no more chit-chat theory, let’s get started with
                setting up your first 3D playground!
                <br />
                <br />
                Initialize the project by creating the vite app. Vite is a build
                tool that aims to provide a faster and leaner development server
                for modern web projects. Run the following commands in your CLI:
              </p>
              <h4>
                <span>Step 1:</span> Get the dependencies
              </h4>
              <CodeSnippet
                language={"bash"}
                codeText={consoleText}
                theme={theme}
              />
              <br />
              <h4>
                <span>Step 2:</span> Import Three.JS to the project
              </h4>
              <CodeSandpack files={filesStep2} theme={theme} layout="preview" />
              <p>
                After console logging the the THREE variable you can notice it
                contains most of the classes and properties you might need on a
                Three.js project. Unfortunately, not all classes are inside this
                variable, but we will see later how to access them.
              </p>
              <InfoDiv
                infoText={`<p>Don't worry, for some time we won't be seeing anything until we add all the required things to build our scene, so just make sure to follow along! And as the HTML-css files will remain the same I will only add JS snippets below</p>
                
                <br/>
                <p>
                Make sure to write all the code one after the other in given sequence only in your main.js file.
                </p>`}
              />
              <br />
              <h4>
                <span>Step 3:</span> Grab the canvas from the HTML doc
              </h4>
              <CodeSnippet codeText={filesStep3} theme={theme} />
              <br />
              <h4>
                <span>Step 4:</span> Define your 3D scene
              </h4>
              <p>
                You place your objects, models, particles, lights, etc. in it,
                and at some point, you ask Three.js to render that scene. To
                create a scene, use the{" "}
                <a
                  target="_blank"
                  className="link"
                  href="https://threejs.org/docs/index.html#api/en/scenes/Scene"
                >
                  Scene
                </a>{" "}
                class:
              </p>
              <CodeSnippet codeText={filesStep4} theme={theme} />
              <br />
              <h4>
                <span>Step 5:</span> Mesh = Geometry + Material
              </h4>
              <p>
                To create that cool purple sphere, we need to create a geometry
                and a material and then combine them to create a mesh. There are
                many geometries and many materials, but we will keep things
                simple for now and create a{" "}
                <a
                  href="https://threejs.org/docs/index.html?q=sphere#api/en/geometries/SphereGeometry"
                  target="_blank"
                  className="link"
                >
                  SphereGeometry
                </a>{" "}
                and a{" "}
                <a
                  href="https://threejs.org/docs/index.html?q=MeshPhongMaterial#api/en/materials/MeshPhongMaterial"
                  target="_blank"
                  className="link"
                >
                  MeshPhongMaterial
                </a>
                .
              </p>
              <CodeSnippet codeText={filesStep5} theme={theme} />
              <br />

              <h4>
                <span>Step 6:</span> Let’s add lights
              </h4>
              <CodeSnippet codeText={filesStep6} theme={theme} />
              <br />

              <h4>
                <span>Step 7:</span> Camera
              </h4>
              <p>
                The camera is not visible. It's more like a theoretical point of
                view. When we will do a render of your scene, it will be from
                that camera's point of view.
                <br />
                <br />
                You can have multiple cameras just like on a movie set, and you
                can switch between those cameras as you please. Usually, we only
                use one camera.
                <br />
                <br />
                There are different types of cameras, and we will talk about
                these in a future lesson. For now, we simply need a camera that
                handles perspective (making close objects look more prominent
                than far objects).
              </p>
              <CodeSnippet codeText={filesStep7} theme={theme} />
              <br />

              <h4>
                <span>Step 8:</span> Renderer
              </h4>
              <p>
                The renderer's job is to do the render. Bet you didn't see that
                coming!
                <br />
                <br />
                We will simply ask the renderer to render our scene from the
                camera's point of view, and the result will be drawn into a
                canvas. You can create the canvas by yourself, or let the
                renderer generate it and then add it to your page. For this
                exercise, we will add the canvas to the HTML and send it to the
                renderer.
              </p>
              <CodeSnippet codeText={filesStep8} theme={theme} />
              <br />

              <h4>
                <span>Step 9:</span> Update the renderer on each frame
              </h4>
              <p>
                In real-time 3D applications, it's crucial to continuously
                render the scene to provide smooth visual updates. This loop
                ensures that the scene is redrawn at the appropriate frame rate,
                typically 60 frames per second (FPS) for smooth animations.
                <br />
                <br />
                By updating the position, rotation, and other properties of
                objects in the scene gradually over time (based on deltaTime),
                animations appear smooth and natural to the viewer's eye.
                Without this time-based approach, animations might appear choppy
                or inconsistent, especially on devices with varying frame rates.
              </p>
              <CodeSnippet codeText={filesStep9} theme={theme} />
              <br />

              <p>Here’s your first render!</p>
              <CodeSandpack
                files={filesFirstRender}
                theme={theme}
                layout="preview"
              />
            </div>

            <div className="blog-section">
              <h3 className="blog-section-title">Conclusion</h3>
              <p>
                Congratulations on taking your first steps into the mesmerizing
                world of 3D web development with Three.js! Throughout this
                article, you've delved into the fundamentals of creating
                immersive 3D scenes, learned to use the power of lights,
                materials, geometries, and cameras, and even added interactive
                controls to your scenes.
                <br />
                <br />
                As you continue your exploration of Three.js and 3D web
                development, remember that practice, curiosity, and persistence
                are keys. Embrace the challenges, celebrate your successes, and
                don't hesitate to dive deeper into the vast resources available,
                including documentation, tutorials, and online communities.
                <br />
                <br />
                So, fellow developer, let your curiosity guide you, your
                creativity fuel you, and your passion for learning push you
                forward. 🚀
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

export default First3DProject;
