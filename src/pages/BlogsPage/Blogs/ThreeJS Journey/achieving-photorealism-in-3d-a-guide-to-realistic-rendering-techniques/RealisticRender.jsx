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
        /* ==========================================================
            ! Change this to the blog number of the new blog
        ========================================================== */
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
  const sections = [];

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
            {/* ==========================================================
               ! Change the content of the new blog here
            ========================================================== */}
            <p className="open-txt">THIS IS NEW BLOG</p>
          </div>
        </div>
      </div>
      <BlogsFooter theme={theme} />
      <Footer toggleTheme={toggleTheme} />
    </>
  );
};

export default RealisticRender;
