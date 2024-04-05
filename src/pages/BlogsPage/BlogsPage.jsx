// Importing necessary libraries and tools
import React from "react";

// Importing necessary components and pages
import Navbar from "../../components/Navbar/Navbar";

// Importing styling and assets
import "./BlogsPage.scss";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import SignatureForBlackBg from "../../components/SVG-JSX/SignatureForBlackBg/SignatureForBlackBg";
import SignatureForWhiteBg from "../../components/SVG-JSX/SignatureForWhiteBg/SignatureForWhiteBg";

/**
 * `BlogIntroTxt` component is the introductory text for the blogs page.
 * @returns {JSX.Element} - JSX for the BlogIntroTxt component
 */
const BlogIntroTxt = () => {
  return (
    <div className="intro-container">
      <h1>
        Hey there <span className="wave">👋</span> ! I'm <span>Sahil K.</span>
      </h1>
      <br />
      <h1>
        Join me on this exciting journey. 🚀 Here, I share my experiences as a
        frontend developer, exploring <span> React</span>, <span>Angular</span>,{" "}
        <span>ThreeJS</span>, <span>WebGl</span>, <span>Shaders</span>,{" "}
        <span>R3F</span>, <span>JavaScript</span>, and much more. 💻
      </h1>
      <br />
    </div>
  );
};

/**
 *  NavigationButtons component
 * @returns {JSX.Element} - NavigationButtons component
 */
const NavigationButtons = () => {
  return (
    <div className="navigation-buttons">
      <Link to="/projects">
        <button className="btn">
          My Work{" "}
          <i
            style={{ marginLeft: 8 }}
            className="fa-regular fa-circle-check"
          ></i>
        </button>
      </Link>
      <a target="_blank" href="https://github.com/SahilK-027">
        <button className="btn">
          @SahilK-027{" "}
          <i style={{ marginLeft: 8 }} className="fa-brands fa-github"></i>
        </button>
      </a>
    </div>
  );
};

/**
 * AboutMe component
 * @returns {JSX.Element} - AboutMe component
 */
const AboutMe = ({ theme }) => {
  return (
    <>
      <h2 className="section-header">About Me</h2>
      <div className="about-me-container">
        <div className="left">
          <p>
            Hello, I'm Sahil, a front-end developer, but I prefer to call myself
            a creative web developer. I've always been fascinated by the amazing
            websites people create, and watching them made me want to build
            something similar. I've been exploring the world of web development
            for a year and a half now, and with that, I learned lots of new
            technologies and built some{" "}
            <Link className="link" to="/projects">
              awesome projects
            </Link>{" "}
            along the way! So with this blog page, I want to share my
            experiences and discoveries with you.
          </p>
          <br />
          <p>
            I don't just build cool front-ends, though. I also work on
            Full-Stack web applications. I've explored Python-Flask, node.js,
            MongoDB, AI, ML, OpenCV, and Compiler Design. Feel free to discuss
            any of these topics with me.
          </p>
        </div>
        <div className="right">
          <p>
            My journey in computer programming started with C++, a language that
            holds a special place in my heart. It laid the foundation for my
            problem-solving abilities. However, it's JavaScript that truly
            ignites my creativity. With JavaScript, I have the freedom to
            transform ideas into interactive web experiences and push the
            boundaries of what's possible in web development.
          </p>
          <br />
          <p>
            With that said, let's embark on this journey together and make
            meaningful contributions to the digital landscape.
          </p>
          <br />
          <div className="signature-container">
            —{" "}
            <div className="signature">
              {theme === "dark" ? (
                <SignatureForBlackBg />
              ) : (
                <SignatureForWhiteBg />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/**
 * BlogLetter component
 * @returns {JSX.Element} - BlogLetter component
 */
const BlogLetter = () => {
  return (
    <>
      <h2 className="section-header">Blogsletter</h2>
      <div className="blog-letter">
        <div className="blogletter-container">
          <div className="icons">
            <i className="fa-solid fa-paper-plane icon-plane"></i>
          </div>
          <h3>
            Subscribe to my blogsletter to receive the latest blog news
            delivered directly to your inbox
          </h3>
          <p>
            Stay Updated with the{" "}
            <Link className="link" to="/">
              Latest Blog
            </Link>{" "}
            News, Containing:
          </p>
          <ul>
            <li>
              <i className="fa-solid fa-circle-dot"></i> Insights into my latest
              projects, ideas, and discoveries.
            </li>
            <li>
              <i className="fa-solid fa-circle-dot"></i> Latest news as soon as
              I publish a new blog.
            </li>
            <li>
              <i className="fa-solid fa-circle-dot"></i> Tips and tricks to
              enhance your skills as a developer in frontend development,
              Three.JS, Competitive Programming, React Three Fiber, React,
              Shaders, DataBase, and more.
            </li>
          </ul>

          <form>
            <input
              type="email"
              placeholder="@ Enter your email address"
              required
            />
            <button className="btn" type="submit">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

/**
 *  BlogsPage component
 * @param {*} param0
 * @returns {JSX.Element} - BlogsPage component
 */
const BlogsPage = ({ openCMDCenter, controlMusic, isMusicPlaying, theme }) => {
  return (
    <>
      <Navbar
        openCMDCenter={openCMDCenter}
        controlMusic={controlMusic}
        isMusicPlaying={isMusicPlaying}
        theme={theme}
      />
      <div className="blogsPage-container page">
        <div className="section hero">
          <BlogIntroTxt />
          <NavigationButtons />
        </div>
        <div className="section about-me">
          <AboutMe theme={theme} />
        </div>
        <div className="section subscription">
          <BlogLetter />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogsPage;
