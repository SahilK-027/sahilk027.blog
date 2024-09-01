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

  const sections = []; // Ensure you populate this array with sections if needed

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
            <p className="open-txt">THIS IS NEW BLOG</p>
            <div className="blog-section">
              <h3 className="blog-section-title">The Final Render</h3>
              <p>Here’s your first render!</p>
              <CodeSandpack
                files={fileTextureRender}
                theme={theme}
                layout="preview"
              />
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
