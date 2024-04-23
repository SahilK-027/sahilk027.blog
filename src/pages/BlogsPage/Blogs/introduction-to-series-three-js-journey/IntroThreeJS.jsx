import React, { useEffect, useState } from "react";
import Navbar from "../../../../components/Navbar/Navbar";
import Footer from "../../../../components/Footer/Footer";
import { blogPost } from "../../../../data/BlogsData";
import { Link } from "react-router-dom";
import "./IntroThreeJS.scss";
import BlogsFooter from "../../../../components/BlogsFooter/BlogsFooter";

const IntroThreeJS = ({
  openCMDCenter,
  controlMusic,
  isMusicPlaying,
  theme,
  toggleTheme,
}) => {
  const [currBlog, setCurrBlog] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrBlog(
      blogPost.find((blog) => {
        return blog.blogNo === 1;
      })
    );
  }, [currBlog]);

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
        <div className="section-top">
          <Link to={"/"}>
            <i className="fa-solid fa-arrow-left-long back-link"></i>&nbsp; Home
          </Link>
          <div className="container">
            <div className="blog-series-header">
              <h1>{currBlog?.blogTitle}</h1>
              <p className="blog-date">Published on: {currBlog?.blogDate}</p>
            </div>
          </div>
          <div className="main-blog-content"></div>
        </div>
      </div>
      <BlogsFooter theme={theme} />
      <Footer toggleTheme={toggleTheme} />
    </>
  );
};

export default IntroThreeJS;
