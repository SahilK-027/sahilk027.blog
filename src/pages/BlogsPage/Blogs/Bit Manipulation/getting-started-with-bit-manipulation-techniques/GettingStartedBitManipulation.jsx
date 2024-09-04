import React, { useEffect, useState } from "react";
import Navbar from "../../../../../components/Navbar/Navbar";
import BlogsFooter from "../../../../../components/BlogsFooter/BlogsFooter";
import Footer from "../../../../../components/Footer/Footer";
import { blogPost } from "../../../../../data/BlogsData";
import LeftSidebar from "../../../../../components/LeftSideBar/LeftSidebar";
import { Link } from "react-router-dom";
import "../../Blogs.scss";
import BitsAnimation from "../../../../../components/BitsAnimation/BitsAnimation";
import img1 from "../../../../../assets/images/blogs-images/Bit Manipulation/Blog2/1.webp";
import img1l from "../../../../../assets/images/blogs-images/Bit Manipulation/Blog2/1l.webp";
import img2 from "../../../../../assets/images/blogs-images/Bit Manipulation/Blog2/2.webp";
import img2l from "../../../../../assets/images/blogs-images/Bit Manipulation/Blog2/2l.webp";
import img3 from "../../../../../assets/images/blogs-images/Bit Manipulation/Blog2/3.webp";
import img3l from "../../../../../assets/images/blogs-images/Bit Manipulation/Blog2/3l.webp";
import img4 from "../../../../../assets/images/blogs-images/Bit Manipulation/Blog2/4.webp";
import img4l from "../../../../../assets/images/blogs-images/Bit Manipulation/Blog2/4l.webp";
import img5 from "../../../../../assets/images/blogs-images/Bit Manipulation/Blog2/5.webp";
import img5l from "../../../../../assets/images/blogs-images/Bit Manipulation/Blog2/5l.webp";
import img6 from "../../../../../assets/images/blogs-images/Bit Manipulation/Blog2/6.webp";
import img6l from "../../../../../assets/images/blogs-images/Bit Manipulation/Blog2/6l.webp";
import InfoDiv from "../../../../../components/InfoDIV/InfoDiv";
import MustReadDiv from "../../../../../components/MustReadDIV/MustReadDiv";
import CodeSnippet from "../../../../../components/SyntaxHighlighter/CodeSnippet";
import BlogImage from "../../../../../components/BlogImage/BlogImage";
import { animated, useSpring } from "react-spring";

const GettingStartedWithBitManipulation = ({
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
        return blog.blogNo === 4;
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

  const sections = [
    "Number Systems & Number Representation",
    "Why do computers only understand 0s and 1s?",
    "Representing numbers in the binary system?",
    "Number Conversion",
    "Conclusion",
  ];

  const infoNote = `
  <div>
  <p>
  So far we have only discussed decimal numbers and octal numbers, because they are much more intutive and easy to understand first, in upcoming sections, our main focus will be on binary numbers. So we will see in detail the conversion of decimal to binary and all the stuff like that.
  </p>
  </div>
  `;

  const infoNote2 = `
  <div>
  <p>
  Wait can you explain what is that LSB and MSB?
  </p>

  <p>
  Certainly! LSB and MSB stand for "Least Significant Bit" and "Most Significant Bit," respectively. 
  </p>
  <ul>
    <li>
      <i class="fa-solid fa-arrow-right"></i>
      <b>Least Significant Bit (LSB): </b>  is the rightmost bit in a binary number. It represents the smallest value in the number because it corresponds to 2^0, which is 1.
    </li>
    <li>
      <i class="fa-solid fa-arrow-right"></i>
      <b>Most Significant Bit (MSB): </b> is the leftmost bit in a binary number. It represents the highest value in the number based on its position. For a n-bit number, the MSB corresponds to 2^{n-1}.
    </li>
  </ul>
  <br/>
  <p>
  🧠 Fun Fact Reasoning: Wanna know, Why did we write remainder in reverse order while converting decimal to binary?
  </p>

  <p>
  When converting from decimal to binary using the division-remainder method, the first remainder corresponds to the LSB because it comes from the first division by 2. Each subsequent remainder corresponds to increasingly significant bit positions. Therefore, to construct the binary number correctly, you must read the remainders in reverse order (from bottom to top) to place the bits in the correct positions, with the last remainder as the MSB.
  </p>
  </div>
  `;

  const mustRead = `
  <div>
  <p>
  In case you want to understand how transistor as a switch works, then you must read this article.
  <a href="https://www.geeksforgeeks.org/transistor-as-a-switch/">Transistor as a Switch</a>. 
  </p>

  </div>
  `;

  const decToBin = `
  Division   Quotient   Remainder
  25 / 2     = 12         1 (LSB)
  12 / 2     = 6          0
  6 / 2      = 3          0
  3 / 2      = 1          1
  1 / 2      = 0          1 (MSB)
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
          {/* Blog series poster */}
          <BitsAnimation />
          <div className="main-blog-content" onScroll={handleScroll}>
            <p className="open-txt">
              Welcome to the first installment of our bit manipulation series
              😉! If you've ever wondered how computers handle the data at the
              most fundamental level like at the core memory and CPU level, then
              you're in the right place. Let's get started with 10010101110s.
            </p>
            <div className="blog-section">
              <h3 className="blog-section-title">
                Number Systems & Number Representation
              </h3>
              <p>
                Before diving into the technical details, let's first grasp the
                concept of number systems and their fundamental role in computer
                operations. A number system is a method of representing numbers
                using a consistent set of symbols. Different number systems are
                used for different purposes, with the most common ones being:
                <ul>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>{" "}
                    <b>Decimal Number System (Base-10):</b> Set of symbols that
                    can be used to generate numbers: 0, 1, 2, 3, 4, 5, 6, 7, 8,
                    9. {" => "} Total symbols: 10.
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>{" "}
                    <b>Octal Number System (Base-8):</b> Set of symbols that can
                    be used to generate numbers: 0, 1, 2, 3, 4, 5, 6, 7.{" "}
                    {" => "} Total symbols: 8.
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>{" "}
                    <b>Hexadecimal Number System (Base-16):</b> Set of symbols
                    that can be used to generate numbers: 0, 1, 2, 3, 4, 5, 6,
                    7, 8, 9, A, B, C, D, E, F {" => "} Total symbols: 16.
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>{" "}
                    <b>Binary Number System (Base-2):</b> Set of symbols that
                    can be used to generate numbers: 0, 1 {" => "} Total
                    symbols: 2.
                  </li>
                </ul>
              </p>

              <p>
                We, as human beings, commonly use the decimal system to
                represent numbers, using digits from 0 to 9. This allows us to
                create infinite numbers through permutations and combinations of
                these decimal digits. Let’s take a closer look with an example
                of how we can generate numbers in any number system using the
                principles of permutation and combination of symbols in that
                system:
              </p>

              <BlogImage
                imgDark={img1}
                imgLight={img1l}
                theme={theme}
                description={`Fig(1.0) How do we actually generate integers in any number
                  system.`}
              />

              <p>
                In the Fig(1.0) above, we can clearly see that in the decimal
                number system, the number 8 comes after the number 7, whereas in
                the octal number system, the number 10 comes after the number 7.
                So, are the numbers octal(10) and decimal(8) identical? The
                short answer is yes, they are the same.
              </p>

              <p>
                But why? This is all because the radix of both these number
                systems is not the same. Now, what is this radix? The technical
                definition states that “The radix, also known as the base, of a
                number system is the number of unique digits, including zero,
                that a positional numeral system uses to represent numbers.” In
                simple terms, this means that the radix of the decimal number
                system is 10 because there are 10 unique digits (0-9) in the
                decimal number system. On the other hand, the radix of an octal
                number system is 8 because there are 8 unique digits (0-7) in
                it.
              </p>

              <p>
                So, how is this radix helpful? The radix of any number system
                can be used to convert a number from that system to any other
                system.
              </p>

              <BlogImage
                imgDark={img2}
                imgLight={img2l}
                theme={theme}
                description={`Fig(2.0) Number representation in Decimal number system.`}
              />

              <BlogImage
                imgDark={img3}
                imgLight={img3l}
                theme={theme}
                description={`Fig(3.0) Number representation in Octal number system.`}
              />

              <p>
                With the above example, I hope it is quite clear how the
                representation in different number systems works. In the decimal
                number system, we have the units place, tens place, hundreds
                place, and thousands place. Today, with this radix concept, you
                really understand why it is the way it is.
              </p>

              <p>
                In our day-to-day lives, we regularly use decimal numbers,
                although the exact reason for choosing a base-10 number system
                is not clear to me. But I think creating a number system with
                only 10 digits, using the Radix 10, makes operations like
                multiplication much easier for humans. And we always wanted to
                make things easier for ourselves! 😂. So, in the first place,
                it’s not very clear why we cannot simply use decimal numbers in
                computers. As WE, humans designed computers, then why we didn't
                choose a decimal number system for computers and instead opted
                for a binary number system?
              </p>

              <InfoDiv infoText={infoNote} />
            </div>

            <div className="blog-section">
              <h3 className="blog-section-title">
                Why do computers only understand 0s and 1s? (Binary Number
                System)
              </h3>
              <p>
                Ok to answer
                <b>"Why do computers only understand 0s and 1s?"</b> let's delve
                into the world of computers and electronics. Think about when a
                computer turns on. It happens when you switch the power button
                to ON. And when does it turn off? It's when you switch off the
                power supply. Unlike us humans who can interpret data in various
                ways, computers only understand two states: Power ON and Power
                OFF. In technical terms, computers comprehend only electrical
                signals, which can be either high voltage or low voltage. This
                is why the binary system, which has the digits 0 and 1, is used.
                The term <b>"bit"</b> actually originated from{" "}
                <b>"binary digit”</b>.
              </p>

              <BlogImage
                imgDark={img4}
                imgLight={img4l}
                theme={theme}
                description={`Fig(4.0) ON-OFF light bulb analogy to understand binary numbers.`}
              />

              <p>
                So how do computers only speak in binary? How do they solve such
                complex problems representing information only using binary?
                Simply put, in a computer, 0 represents no electrical signal or
                charges present, while 1 represents the presence of an
                electrical charge in the memory. This is crucial because, inside
                a computer, there are millions of tiny switches called
                "transistors" - when these transistors are flipped on, they
                represent 1, and when they are off, they represent 0. So,
                essentially, the entire functioning of a computer is based on
                millions of these little switches representing either 0 or 1.
              </p>

              <MustReadDiv mustReadText={mustRead} />

              <p>
                And with that very simple mechanism of whether electricity is
                there or not, any computer can simply understand and speak the
                language of 0s and 1s.
              </p>
            </div>

            <div className="blog-section">
              <h3 className="blog-section-title">
                How do we go about representing numbers in the binary system?
              </h3>

              <p>
                So if we have only 2 symbols 0 and 1 how can we count higher
                numbers say numbers like 10 or 27 for that instance, you might
                think? To understand this let’s go to our PnC strategy again. In
                binary representation, each digit (bit) can be either 0 or 1.
                When considering permutations, we are interested in the
                different ways we can arrange a set of items. For binary
                numbers, the items are the bits (0s and 1s).
              </p>
              <p>
                For a binary number of length n:
                <ul>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i> Each position in the
                    number can be occupied by either a '0' or a '1'.
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i> The total number of
                    unique permutations for an n-bit binary number is 2^n.
                  </li>
                </ul>
                You can infer more about this using the diagram below.
              </p>

              <BlogImage
                imgDark={img5}
                imgLight={img5l}
                theme={theme}
                description={`Fig(5.0) Binary representation of numbers and their permutations.`}
              />
            </div>

            <div className="blog-section">
              <h3 className="blog-section-title">
                Binay to Decimal & Decimal to Binary Conversion
              </h3>
              <p>Here's how to represent numbers in the binary system:</p>
              <BlogImage
                imgDark={img6}
                imgLight={img6l}
                theme={theme}
                description={`Fig(6.0) Binary to Decimal conversion.`}
              />
              <p>
                In the above diagram Fig(6.0) we have just seen the way to
                convert binary to decimal. The method remains same, as we saw
                previously for octal to decimal conversion as well. Just Radix
                changes.
              </p>

              <h4>Let's see How To Convert Decimal To Binary:</h4>
              <p>
                The good news is it’s very easy. To convert a decimal to binary
                you simply divide the number by 2 recursively until you get
                to 0 and note down any remainder.
              </p>
              <p>
                That probably sounds a little confusing, so let me show you an
                example with the number 25:
              </p>
              <CodeSnippet codeText={decToBin} theme={theme} />
              <p>
                Yes!!! (25)10 = (11001)2. All you have to do is write down the
                remainder in reverse order, bottom to up.
              </p>

              <InfoDiv infoText={infoNote2} />
            </div>

            <div className="blog-section">
              <h3 className="blog-section-title">Conclusion</h3>
              <p>
                In this blog, we've explored why computers exclusively use 0s
                and 1s—known as the binary system—to represent and process data.
                Understanding binary's fundamentals, from its place value system
                to the roles of LSB and MSB, illuminates how computers manage
                and manipulate information at its core. This foundational
                understanding sets the stage for deeper insights into binary
                arithmetic and practical applications in computing. Stay tuned
                as we delve further into the world of binary operations in my
                upcoming bit streams!
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

export default GettingStartedWithBitManipulation;
