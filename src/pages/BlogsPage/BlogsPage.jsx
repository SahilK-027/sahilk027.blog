// Importing necessary libraries and tools
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

// Importing necessary components and pages
import Navbar from "../../components/Navbar/Navbar";

// Importing styling and assets
import "./BlogsPage.scss";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import SignatureForBlackBg from "../../components/SVG-JSX/SignatureForBlackBg/SignatureForBlackBg";
import SignatureForWhiteBg from "../../components/SVG-JSX/SignatureForWhiteBg/SignatureForWhiteBg";
import { mostRecentBlog } from "../../data/BlogsData";
import { blogSeries } from "../../data/BlogsData";
import Environment from "../../data/Environment";
import { animated, useSpring } from "react-spring";
import SubscriberCount from "../../components/SubscriberCount/SubscriberCount";
import Tooltip from "../../components/Tooltip/Tooltip";

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
        <span>R3F</span>, <span>JavaScript</span>, <span>CS Fundamentals</span>{" "}
        and much more. 💻
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
            for over two years now, and with that, I learned lots of new
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
  const [mail, setMail] = useState("");
  const [isMakingNWCall, setIsMakingNWCall] = useState(false);
  const [success, setSuccess] = useState(false);

  // Define animation properties
  const thanksAnimation = useSpring({
    opacity: success ? 1 : 0,
    transform: success ? "translateY(0px)" : "translateY(-20px)",
  });

  const env = Environment;
  let SERVER_LINK = "";
  if (env === "development") {
    SERVER_LINK = "http://localhost:2710";
  } else if (env === "production") {
    SERVER_LINK = "https://api-sk-blog-server.vercel.app";
  }
  const handleSubscriptionCall = async (e) => {
    e.preventDefault();
    const EMAIL_TEST = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,7})+$/;
    const isValidMail = EMAIL_TEST.test(mail);

    if (!isValidMail) {
      toast.error("Please enter a valid email address. 👀", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    try {
      setIsMakingNWCall(true);
      const response = await fetch(`${SERVER_LINK}/subscribe`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: mail,
        }),
      });

      if (response.ok) {
        toast.success("Thank you for subscribing to my blogs 🙇‍♂️!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setSuccess(true);
      } else {
        const error = await response.json();
        toast.info(error.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }
    } catch (error) {
      toast.error(
        "Oops 😬! Something went wrong on server side. Please try again later.",
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
    } finally {
      setIsMakingNWCall(false);
    }
  };

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
            <Link className="link" to={mostRecentBlog.blogUrl}>
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

          {/* <SubscriberCount /> */}

          <form onSubmit={handleSubscriptionCall}>
            <input
              type="email"
              placeholder="@ Enter your email address"
              required
              onChange={(e) => setMail(e.target.value)}
            />
            <button
              className="btn"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              type="submit"
              disabled={isMakingNWCall}
            >
              {isMakingNWCall ? (
                <div className="spinner-loader"></div>
              ) : (
                <span>Subscribe</span>
              )}
            </button>
          </form>
          {success ? (
            <animated.p id="thanks" style={thanksAnimation}>
              Thanks for subscribing 💖! You will receive welcome mail soon!
            </animated.p>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

/**
 * BlogSeries component
 * @returns {JSX.Element} - BlogSeries component
 */
const BlogSeries = ({ blogSeriesData }) => {
  return (
    <>
      <h2 className="section-header">Blog Series</h2>
      <div className="blog-series-container">
        {blogSeriesData.map((series, index) => (
          <a href={series.seriesUrl}>
            <div key={index} className="blog-series-card">
              <div className="blog-series-card-info">
                <h3
                  style={{
                    background: series.titleColor,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                  className="blog-series-card-header"
                >
                  {series.seriesTitle}
                </h3>
                <p className="blog-series-start-date">
                  Publish Date: {series.startDate}
                </p>
              </div>
              <div className="buttons">
                <a target="_blank" href="https://github.com/SahilK-027/sahilk027.blog/discussions">
                  <Tooltip content="Discussion">
                    <button>
                      <i className="fa-solid fa-comments"></i>
                    </button>
                  </Tooltip>
                </a>
              </div>
            </div>
          </a>
        ))}
      </div>
    </>
  );
};

/**
 * GetInTouch component
 * @returns {JSX.Element} - GetInTouch component
 */
const GetInTouch = () => {
  return (
    <>
      <h2 className="section-header">Get In Touch</h2>
      <div className="get-in-touch-container">
        <p>
          Have a question or want to suggest a topic for blog series or a post?
        </p>
        <p>
          Write me at{" "}
          <a
            target="_blank"
            className="link"
            href="mailto:sahilkandhare027@gmail.com"
          >
            sahilkandhare027@gmail.com
          </a>
          . OR Follow me at{" "}
          <a
            target="_blank"
            className="link"
            href="https://github.com/SahilK-027"
          >
            @SahilK-027
          </a>
          . OR 💡 Suggest idea for next blog series or post at{" "}
          <a
            target="_blank"
            className="link"
            href="https://github.com/SahilK-027/sahilk027.blog/discussions"
          >
            Discussions
          </a>
          .
        </p>
      </div>
    </>
  );
};

/**
 *  BlogsPage component
 * @param {*} param0
 * @returns {JSX.Element} - BlogsPage component
 */
const BlogsPage = ({
  openCMDCenter,
  controlMusic,
  isMusicPlaying,
  theme,
  toggleTheme,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Navbar
        openCMDCenter={openCMDCenter}
        controlMusic={controlMusic}
        isMusicPlaying={isMusicPlaying}
        theme={theme}
        pageTitle="Hello 👋 ! I'm Sahil"
      />
      <div className="blogsPage-container page">
        <div className="section-top hero">
          <BlogIntroTxt />
          <NavigationButtons />
        </div>
        <div className="section about-me">
          <AboutMe theme={theme} />
        </div>
        {/* <div className="section subscription">
          <BlogLetter />
        </div> */}
        <div className="section blog-series">
          <BlogSeries blogSeriesData={blogSeries} />
        </div>
        <div className="section get-in-touch">
          <GetInTouch />
        </div>
      </div>
      <Footer toggleTheme={toggleTheme} />
    </>
  );
};

export default BlogsPage;
