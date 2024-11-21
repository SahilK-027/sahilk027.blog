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
import img1 from "./utils/assets/1.webp";
import img1l from "./utils/assets/1l.webp";
import img2 from "./utils/assets/2.webp";
import img2l from "./utils/assets/2l.webp";

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

  /* ==========================================================
      ! Please make sure you have at max 8 sections in the array
  ========================================================== */
  const sections = ["What we will learn?"];

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
          </div>
        </div>
      </div>
      <BlogsFooter theme={theme} />
      <Footer toggleTheme={toggleTheme} />
    </>
  );
};

export default RealisticRender;
