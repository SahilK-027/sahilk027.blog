import React, { useEffect, useState } from "react";
import Navbar from "../../../../components/Navbar/Navbar";
import Footer from "../../../../components/Footer/Footer";
import { blogPost } from "../../../../data/BlogsData";
import { Link } from "react-router-dom";
import "./IntroThreeJS.scss";
import BlogsFooter from "../../../../components/BlogsFooter/BlogsFooter";
import LeftSidebar from "../../../../components/LeftSideBar/LeftSidebar";
import InfoDiv from "../../../../components/InfoDIV/InfoDiv";
import MustReadDiv from "../../../../components/MustReadDIV/MustReadDiv";

const calculateTimeRemaining = () => {
  const now = new Date();
  // April 27th, 2024 at 9:00 PM
  const targetDate = new Date("2024-04-27T21:00:00");
  const difference = targetDate - now;

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};

const IntroThreeJS = ({
  openCMDCenter,
  controlMusic,
  isMusicPlaying,
  theme,
  toggleTheme,
}) => {
  const [currBlog, setCurrBlog] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrBlog(
      blogPost.find((blog) => {
        return blog.blogNo === 1;
      })
    );
  }, [currBlog]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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

  // ! Please make sure you have at max 8 sections in the array
  const sections = [
    "Why This Blog Series?",
    "Who Am I?",
    "What Will You Learn?",
    "How to Get Involved?",
  ];

  const infoTrinity = `
  <div>
  <p>No doubt I will be writing a blog on this topic but till then if you want to check out which blog post I referred to while building fluid simulation for Trinity 2024 head over to this 
  <a href="https://mofu-dev.com/en/blog/stable-fluids/" target="_blank">blog</a>
  post.
  </p>
  </div>`;

  const mustRead = `
  <div>
  <p>While FBO, Shaders and Post processing are some of the fascinating topics, this blog will not focus on them. These are rather advanced topics and each subject listed here deserves its own blog post.
  </p>
  <p> 👉 But your curious mind can further read more about them here: </p>
  <ul>
    <li>
      <i class="fa-solid fa-arrow-right"></i>
      <a href="https://barradeau.com/blog/?p=621" target="_blank">FBO particles</a>
    </li>
    <li>
      <i class="fa-solid fa-arrow-right"></i>
      <a href="https://thebookofshaders.com/" target="_blank">The Book of Shaders
      </a>
    </li>
    <li>
      <i class="fa-solid fa-arrow-right"></i>
      <a href="https://tympanus.net/codrops/2022/11/29/sketchy-pencil-effect-with-three-js-post-processing/" target="_blank">Post-Processing</a>
    </li>
  </ul>
  <p>
  😉 Don't worry, I will be writing a blog on these topics in the future. So stay tuned!
  </p>
  </div>
  `;

  return (
    <>
      <Navbar
        openCMDCenter={openCMDCenter}
        controlMusic={controlMusic}
        isMusicPlaying={isMusicPlaying}
        theme={theme}
        pageTitle={currBlog?.blogTitle}
      />
      {timeRemaining.days > 0 &&
      timeRemaining.hours > 0 &&
      timeRemaining.minutes > 0 &&
      timeRemaining.seconds > 0 ? (
        <div className="page countdown-container">
          <div className="countdown">
            <h1>Publishing soon...🚀</h1>
            <h1 className="timer">
              {timeRemaining.days}d {timeRemaining.hours}h{" "}
              {timeRemaining.minutes}m {timeRemaining.seconds}s
            </h1>
            <p>
              Stay tuned and make sure to subscribe to blog letter, so that you
              will get notification as soon I publish the first blog 🤩.
            </p>
          </div>
        </div>
      ) : (
        <div className="page countdown-container"></div>
      )}
      <Footer toggleTheme={toggleTheme} />
    </>
  );
};

export default IntroThreeJS;
