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
import sciFiBoxThumbnail from "../../../../../assets/images/blogs-images/ThreeJS/Blog3/sci-fi-box-thumbnail.png";
import BlogImage from "../../../../../components/BlogImage/BlogImage";
import MustReadDiv from "../../../../../components/MustReadDIV/MustReadDiv";

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

  useEffect(() => {
    window.scrollTo(0, 0);
    const blog = blogPost.find((blog) => blog.blogNo === 6);
    setCurrBlog(blog);
  }, []);

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
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sections = [
    "Recap: Where We Left Off",
    "Textures: Introduction",
    "Let's start coding",
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

  const fileTextureRender = {
    "/index.js": { code: jsSandpack },
    "/index.html": { code: htmlSandpack },
    "/styles.css": { code: cssSandpack },
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
                  imgDark={"https://i.ibb.co/GWJ36Pw/AO.jpg"}
                  imgLight={"https://i.ibb.co/GWJ36Pw/AO.jpg"}
                  theme={theme}
                  description={`AO`}
                />
                <BlogImage
                  imgDark={"https://i.ibb.co/PZFKrTV/COLOR.jpg"}
                  imgLight={"https://i.ibb.co/PZFKrTV/COLOR.jpg"}
                  theme={theme}
                  description={`Color`}
                />
                <BlogImage
                  imgDark={"https://i.ibb.co/3TRptG3/HEIGHT.png"}
                  imgLight={"https://i.ibb.co/3TRptG3/HEIGHT.png"}
                  theme={theme}
                  description={`Height`}
                />
                <BlogImage
                  imgDark={"https://i.ibb.co/0JXpbCV/METALNESS.jpg"}
                  imgLight={"https://i.ibb.co/0JXpbCV/METALNESS.jpg"}
                  theme={theme}
                  description={`Metalness`}
                />
                <BlogImage
                  imgDark={"https://i.ibb.co/D9pDc23/NORMAL.jpg"}
                  imgLight={"https://i.ibb.co/D9pDc23/NORMAL.jpg"}
                  theme={theme}
                  description={`Normal`}
                />
                <BlogImage
                  imgDark={"https://i.ibb.co/1vmWhFr/ROUGHNESS.jpg"}
                  imgLight={"https://i.ibb.co/1vmWhFr/ROUGHNESS.jpg"}
                  theme={theme}
                  description={`Roughness`}
                />
                <BlogImage
                  imgDark={"https://i.ibb.co/jrr2XKF/EMMISIVE.jpg"}
                  imgLight={"https://i.ibb.co/jrr2XKF/EMMISIVE.jpg"}
                  theme={theme}
                  description={`Emission`}
                />
                <div></div>
                <div></div>
              </div>
              <MustReadDiv mustReadText={mustRead} />
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

{
  /* <CodeSandpack files={fileTextureRender} theme={theme} layout="preview" />; */
}

// ambientOcclusion: "",
// color: "",
// height: "",
// metalness: "",
// normal: "",
// roughness: "",
// emissive: "",
