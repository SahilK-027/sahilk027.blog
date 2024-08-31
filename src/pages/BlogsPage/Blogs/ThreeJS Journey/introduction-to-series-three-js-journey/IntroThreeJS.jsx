import React, { useEffect, useState } from "react";
import Navbar from "../../../../../components/Navbar/Navbar";
import Footer from "../../../../../components/Footer/Footer";
import { blogPost } from "../../../../../data/BlogsData";
import { Link } from "react-router-dom";
import BlogsFooter from "../../../../../components/BlogsFooter/BlogsFooter";
import LeftSidebar from "../../../../../components/LeftSideBar/LeftSidebar";
import InfoDiv from "../../../../../components/InfoDIV/InfoDiv";
import MustReadDiv from "../../../../../components/MustReadDIV/MustReadDiv";
import "../../Blogs.scss";
import SuzanneThreeBG from "../../../../../components/SuzanneThreeBG/SuzanneThreeBG";

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

  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrBlog(
      blogPost.find((blog) => {
        return blog.blogNo === 1;
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
          {/* Blog series poster */}
          <SuzanneThreeBG theme={theme} toggleTheme={toggleTheme} />
          <div className="main-blog-content" onScroll={handleScroll}>
            <p>
              Hey there, welcome to my little corner of the internet! I'm so
              excited to have you here. This isn't your usual informative blog
              post, instead, it's an opportunity for me to share my thoughts and
              plans with you, and also introduce myself properly.
            </p>
            <div className="blog-section">
              <h3 className="blog-section-title">Why This Blog Series?</h3>
              <p>
                The main reason for this lengthy introduction is the fact that
                this blog series is going to be quite big. It’s my commitment to
                writing a long and comprehensive guide on{" "}
                <a className="link" target="_blank" href="https://threejs.org/">
                  Three.js
                </a>{" "}
                ,{" "}
                <a
                  className="link"
                  target="_blank"
                  href="https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API"
                >
                  WebGL
                </a>
                , and{" "}
                <a
                  className="link"
                  target="_blank"
                  href="https://www.adobe.com/uk/creativecloud/illustration/discover/digital-art.html"
                >
                  digital art
                </a>
                . Yep, you heard it right. This is going to be a comprehensive
                guide that will help you understand the intricate puzzle of 3D
                development. Now, you're probably wondering why I'm doing this.
                Well, I'll be honest with you - <span>I just love writing</span>
                ! 😆 But that's not the only reason.
              </p>
              <p>
                Yes, there are many reasons behind writing a technical blog
                series revolving around one specific topic. But let me take you
                back to where it all began. When I started learning Three.js and
                WebGL, I struggled a lot at first. Don't get me wrong – the{" "}
                <a
                  href="https://discourse.threejs.org/"
                  target="_blank"
                  className="link"
                >
                  Three.js community
                </a>{" "}
                is fantastic, but even with their support, I still found myself
                wandering through endless internet rabbit holes, searching for
                wisdom to piece together the intricate puzzle of 3D development.
              </p>
              <p>
                All right, picture this: you've got this brilliant idea for a
                website, you want to create mesmerising user interactive landing
                page. After thnking for a while, you get an idea "let's add
                mind-blowing fluid simulations, you are exited but suddenly
                you're like, "Umm, but how?" That's exactly where I found myself
                with my recent project,{" "}
                <a
                  href="https://trinity-2024.vercel.app"
                  target="_blank"
                  className="link"
                >
                  Trinity 2024
                </a>
                . After searching the vast expanse of the internet and digging
                through countless blog posts, I stumbled upon a gem of wisdom
                that lit up my path. It was like finding the missing puzzle
                piece!
              </p>
              <InfoDiv infoText={infoTrinity} />
              <p>
                I built the website eventually, but it took me a lot of time to
                do so. And that got me thinking - why keep all this hard-earned
                knowledge to myself when I could share it with all of you? As a
                software developer, I believe that once you know the{" "}
                <span>why and what of something</span>, the <span>how</span>{" "}
                should never be an obstacle standing in the way of doing it. And
                that's why I'm writing this blog series.
              </p>
            </div>
            <div className="blog-section">
              <h3 className="blog-section-title">Who Am I?</h3>
              <p>
                Let me talk about myself for a second. I'm Sahil, a
                <span> front-end developer</span>, although I prefer to call
                myself a <span>creative web developer</span>. I've always been
                fascinated by the amazing websites people create, and watching
                them made me want to build something similar. I've been
                exploring the world of web development for a year and a half
                now, and with that, I learned lots of new technologies and built
                some{" "}
                <Link className="link" to="/projects">
                  {" "}
                  awesome projects{" "}
                </Link>{" "}
                along the way! So with this blog page, I want to share my
                experiences and discoveries with you. I don't just build cool
                front-ends, though. I also work on <span>Full-Stack</span> web
                applications. I've explored{" "}
                <span>
                  Python-Flask, node.js, MongoDB, AI, ML, OpenCV, Compiler
                  Design
                </span>{" "}
                and much more. Feel free to discuss any of these topics with me.
              </p>
            </div>
            <div className="blog-section">
              <h3 className="blog-section-title">What Will You Learn?</h3>
              <p>
                Buckle up, because we're diving deep into the world of Three.js!
                Get ready to unlock the secrets of this powerful JavaScript
                library and unleash your creativity like never before. In this
                blog series, I'm on a mission to equip you with the skills and
                knowledge you need to become a Three.js wizard. From the{" "}
                <span>basics to advanced techniques</span>, I'll cover it all,
                one blog post at a time. With a comprehensive series of{" "}
                <span>30+ blogs</span> planned, I'll leave no stone unturned.
                Whether you're a complete beginner or a developer looking to
                level up your skills, there's something here for everyone.
                <br />
                So, what exactly will you learn? Here's a sneak peek:
                <ul>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>{" "}
                    <b>Getting Started with Three.js:</b> We'll kick things off
                    by laying down the foundation. You'll learn how to set up
                    your development environment, grasp the core concepts of
                    Three.js, and get comfortable with its workflow.
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>{" "}
                    <b>Creating 3D Scenes:</b> Prepare to unleash your
                    creativity as we delve into the art of crafting breathtaking
                    3D scenes from scratch. From modeling and texturing to
                    lighting and scene composition, I'll cover it all.
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>{" "}
                    <b>Animating Your Creations:</b> Watch your creations come
                    to life as we explore the magical world of animations.
                    Whether it's simple movements or complex interactions,
                    you'll learn how to breathe soul into your 3D masterpieces.
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>{" "}
                    <b>Working with Materials and Shaders:</b> Ready to take
                    your visuals to the next level? We'll dive deep into the
                    realm of materials and shaders, teaching you how to add
                    depth, realism, and stunning visual effects to your scenes.
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>{" "}
                    <b>Post-Processing:</b> Discover the secrets of
                    post-processing as we explore techniques to enhance the
                    visual fidelity of your renders, add cinematic effects, and
                    elevate your creations to new heights of awesomeness.
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>{" "}
                    <b>Realistic Renders:</b> Ever wondered how to achieve
                    photorealistic renders in Three.js? We'll uncover the
                    techniques and best practices to make your scenes look like
                    they belong in a blockbuster movie.
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>{" "}
                    <b>FBO, Particles, GPU Intensive Stuff:</b> Brace yourself
                    for a deep dive into the more advanced realms of Three.js.
                    From Frame Buffer Objects (FBO) to GPU-intensive particle
                    systems, we'll explore the cutting-edge features that will
                    take your projects to the next level.
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>{" "}
                    <b>Optimizing Performance:</b> We'll wrap up our journey by
                    focusing on optimization techniques to ensure your creations
                    run like a well-oiled machine. Learn how to fine-tune your
                    code, optimize rendering performance, and deliver smooth,
                    high-performance experiences for your users.
                  </li>
                </ul>
              </p>
              <MustReadDiv mustReadText={mustRead} />
              <p>
                And that's just a taste of what's to come! With each topic, I'll
                provide hands-on examples, practical tips, and real-world
                insights. So, are you ready to embark on this adventure? Strap
                in, because we're about to take 3D web development to infinity
                and beyond! 🚀
              </p>
            </div>

            <div className="blog-section">
              <h3 className="blog-section-title">How to Get Involved?</h3>
              <p>
                Oh, and here's the cherry on top – this entire series is
                absolutely free! Yup, you heard that right. All you need to do
                is hit that <span>subscribe button</span> if you want to be the
                first to know when I drop a new blog post. And hey, if you ever
                find yourself scratching your head or stuck on a tricky concept,
                head over to my{" "}
                <a
                  href="https://github.com/sahilk027-blogs"
                  target="_blank"
                  className="link"
                >
                  GitHub organization
                </a>{" "}
                . I've set up separate repositories for each blog post, complete
                with discussion sections where you can connect with fellow
                learners, ask burning questions, and share your insights.
              </p>

              <p>
                So there you have it – a sneak peek into what's in store. I'm
                beyond excited to embark on this epic quest with you, my fellow
                adventurer. Get ready to roll up your sleeves, unleash your
                inner creative genius, and dive headfirst into the enchanting
                world of 3D web development. It's going to be one heck of a
                ride!
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

export default IntroThreeJS;
