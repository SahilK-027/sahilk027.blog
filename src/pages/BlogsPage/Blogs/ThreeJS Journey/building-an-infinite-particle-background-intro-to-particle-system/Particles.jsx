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
    window.scrollTo(0, 0);
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

  const sections = ["Why, what and how we will learn?"];

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
              <p>What we will build?</p>
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
          </div>
        </div>
      </div>
      <BlogsFooter theme={theme} />
      <Footer toggleTheme={toggleTheme} />
    </>
  );
};

export default ParticlesBlog;
