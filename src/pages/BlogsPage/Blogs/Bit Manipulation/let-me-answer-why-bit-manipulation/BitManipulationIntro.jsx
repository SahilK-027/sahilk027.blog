import React, { useEffect, useState } from "react";
import Navbar from "../../../../../components/Navbar/Navbar";
import BlogsFooter from "../../../../../components/BlogsFooter/BlogsFooter";
import Footer from "../../../../../components/Footer/Footer";
import { blogPost } from "../../../../../data/BlogsData";
import LeftSidebar from "../../../../../components/LeftSideBar/LeftSidebar";
import { Link } from "react-router-dom";
import "../../Blogs.scss";
import BitsAnimation from "../../../../../components/BitsAnimation/BitsAnimation";

const BitManipulationIntro = ({
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
        return blog.blogNo === 3;
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
    "Introduction to the New Series",
    "Overcoming the Mental Barrier",
    "Embarking on the Bit Manipulation Journey",
    "Conclusion",
  ];

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
          <BitsAnimation />
          <div className="main-blog-content" onScroll={handleScroll}>
            <p className="open-txt">
              This is just a small series intro kind of blog. As I don’t want to
              start this series directly with “101010010110”. Also, it doesn't
              feel right to not explain the reason behind starting this new
              series before finishing my ongoing blog series "
              <Link
                className="link"
                target="_blank"
                to="/blogs/three-js-journey"
              >
                three-js-journey
              </Link>
              ". Don't worry, I won't discontinue that series; I will also add
              new blogs there.
            </p>
            <div className="blog-section">
              <h3 className="blog-section-title">
                Introduction to the New Series
              </h3>
              <p>
                Why am I suddenly starting to write a new blog series about bit
                manipulation? Well, the reason is simple. Instead of learning
                something else first, why not learn the language that the
                computer understands? I'm not saying we should learn machine
                language (you can if you want though, all the best for that 😉).
                But I think we should always start by understanding the
                fundamentals right from the beginning.
              </p>
            </div>

            <div className="blog-section">
              <h3 className="blog-section-title">
                Overcoming the Mental Barrier
              </h3>
              <p>
                One of the mistakes I think I made was considering bit
                manipulation as a very advanced topic in computer science. Up
                until a few months ago, I hadn't taken the time to understand
                these techniques and tricks. If we go back to 2021, when I
                wanted to learn Competitive Programming, I started with C-lang,
                then moved on to pointers, arrays, linked lists, stacks, and
                queues. After that, I gradually progressed to other intermediate
                topics such as recursion trees, heaps, graphs, dynamic
                programming, and similar topics. However, when it came time to
                learn advanced concepts like Fenwick trees, segment trees, or
                optimizing dynamic programming recursive problems, I got stuck.
                What was I stuck on? Bit manipulation. I knew I was stuck on it,
                but I avoided it. I had this mentality that it was hard and
                advanced, so there was always a mental barrier that kept me from
                trying bit manipulation in my code.
              </p>
              <p>
                I have always been both mesmerized and daunted by seeing someone
                like{" "}
                <a
                  target="_blank"
                  className="link"
                  href="https://leetcode.com/u/lee215/"
                >
                  lee215
                </a>{" "}
                or{" "}
                <a
                  target="_blank"
                  className="link"
                  href="https://leetcode.com/u/votrubac/"
                >
                  Votrubac
                </a>{" "}
                writing one-liner codes or using bitmasks to solve very
                difficult problems. I agree understanding topics like Fenwick
                trees or bitmasking can be challenging at first, especially if
                you are not familiar with bit manipulation concepts. I enjoy
                seeing operators like {">>"}, {"<<"}, ^, ~, &, | suddenly
                appearing in code and reducing 10 lines from the code, but we
                don't do it because we think it's hard to understand. However,
                now I know that they are not as hard as I used to think. I think
                you can avoid the mistake I made of thinking that bit
                manipulation is advanced and can be learned later in your
                programming journey. I came across this thought on the internet
                stating that{" "}
                <b>
                  bit manipulation and bitwise operators are difficult to
                  understand, but only if you don't understand how computers
                  work
                </b>
                . Personally, I find it shameful that even as a computer
                engineer, I don't understand the language that computers speak.
                So, I finally learned it. And so I have decided to write down
                all my learnings for you to benefit from!
              </p>
            </div>

            <div className="blog-section">
              <h3 className="blog-section-title">
                Embarking on the Bit Manipulation Journey
              </h3>
              <p>
                Now I realize I should have approached learning bit manipulation
                much earlier. Because If you understand how computers
                fundamentally operate, everything else builds upon that
                knowledge. In competitive programming, understanding how to
                optimize your code with bit manipulation can give you an edge.
                It's not just about reducing lines of code but making your
                solutions more efficient. I want to demystify bit manipulation,
                making it as approachable and understandable as possible.
              </p>
              <p>
                Throughout this entire series, I will make an effort to answer
                all the WHYs you may have. For example, why does this work? Why
                do computers only understand 0s and 1s? Why can't a computer
                understand decimal numbers? I will address all sorts of
                questions. If at any point I fail to clearly explain the reason,
                please feel free to ask your questions in the GitHub discussion
                section. I want to make sure that no unanswered questions stay
                in your mind after reading this series, stopping you from using
                bit manipulation in your code. That's why I'm writing this
                series in the first place.
              </p>
            </div>

            <div className="blog-section">
              <h3 className="blog-section-title">Conclusion</h3>
              <p>
                This series is about sharing my journey and learnings with you,
                helping you avoid the same pitfalls and mental blocks I had. I
                will try to break down these concepts into digestible parts,
                showing you that with the right mindset and approach, you can
                master them too. Together, we'll explore bit manipulation from
                the ground up, making it an integral part of our programming
                toolkit. Let's embark on this journey of understanding the very
                language that computers speak, one bit at a time.
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

export default BitManipulationIntro;
