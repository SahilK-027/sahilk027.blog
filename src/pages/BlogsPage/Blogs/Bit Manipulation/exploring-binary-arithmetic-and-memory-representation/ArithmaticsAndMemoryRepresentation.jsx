import React, { useEffect, useState } from "react";
import Navbar from "../../../../../components/Navbar/Navbar";
import BlogsFooter from "../../../../../components/BlogsFooter/BlogsFooter";
import Footer from "../../../../../components/Footer/Footer";
import { blogPost } from "../../../../../data/BlogsData";
import LeftSidebar from "../../../../../components/LeftSideBar/LeftSidebar";
import { Link } from "react-router-dom";
import "../../Blogs.scss";
import BitsAnimation from "../../../../../components/BitsAnimation/BitsAnimation";
import InfoDiv from "../../../../../components/InfoDIV/InfoDiv";
import BlogImage from "../../../../../components/BlogImage/BlogImage";
import MustReadDiv from "../../../../../components/MustReadDIV/MustReadDiv";
import CodeSnippet from "../../../../../components/SyntaxHighlighter/CodeSnippet";
import img1 from "../../../../../assets/images/blogs-images/Bit Manipulation/Blog3/1.webp";
import img1l from "../../../../../assets/images/blogs-images/Bit Manipulation/Blog3/1l.webp";
import img2 from "../../../../../assets/images/blogs-images/Bit Manipulation/Blog3/2.webp";
import img2l from "../../../../../assets/images/blogs-images/Bit Manipulation/Blog3/2l.webp";
import img3 from "../../../../../assets/images/blogs-images/Bit Manipulation/Blog3/3.webp";
import img3l from "../../../../../assets/images/blogs-images/Bit Manipulation/Blog3/3l.webp";
import img4 from "../../../../../assets/images/blogs-images/Bit Manipulation/Blog3/4.webp";
import img4l from "../../../../../assets/images/blogs-images/Bit Manipulation/Blog3/4l.webp";
import img5 from "../../../../../assets/images/blogs-images/Bit Manipulation/Blog3/5.webp";
import img5l from "../../../../../assets/images/blogs-images/Bit Manipulation/Blog3/5l.webp";
import img6 from "../../../../../assets/images/blogs-images/Bit Manipulation/Blog3/6.webp";
import img6l from "../../../../../assets/images/blogs-images/Bit Manipulation/Blog3/6l.webp";
import img7 from "../../../../../assets/images/blogs-images/Bit Manipulation/Blog3/7.webp";
import img7l from "../../../../../assets/images/blogs-images/Bit Manipulation/Blog3/7l.webp";

const ArithmaticsAndMemoryRepresentation = ({
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
        return blog.blogNo === 5;
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

  const infoNote1 = `
  <div>
  <p>
  In the last blog, we learned about how computers interpret binary numbers as a series of ON and OFF states using transistors as switches. Each of these binary states is called a "bit" (short for Binary digit). Computers use sets of these bits to store and process numerical data.
  </p>
  </div>
  `;
  const infoNote2 = `
  <div>
  <p>
  One thing to note is that the 2's complement represents the negative of a number. Do you want to know why? We will discuss this in the upcoming sections.
  </p>
  </div>
  `;
  const infoNote3 = `
  <div>
  <p>
  In this section, I will be using C++ as my reference programming language. To explain the examples clearly, I am using code for better verification of the output.
  </p>
  </div>
  `;

  const mustRead = `
  <div>
  <p>
  Ohh, while discussing the future proofing, I just remembered a small story about it.
  </p>
  <br />
  <p>
  In 1996, the launch of the Ariane 5 rocket by the European Space Agency ended in tragedy within 40 seconds due to a critical oversight. The engineers who wrote the code for Ariane 5 reused outdated code from Ariane 4, which was designed for lower velocities. Ariane 4 used 16-bit number architecture, while Ariane 5 was designed for much higher velocities that could exceed the 16-bit number limit. During the flight, a 64-bit floating point velocity measurement was converted to a 16-bit signed integer, causing an integer overflow. This error disrupted the guidance system, resulting in incorrect course adjustments, full nozzle deflections, and ultimately, the rocket's destruction—a loss of €500 million. This incident underscores the critical need for meticulous data representation in computers.
  </p>
  <br />
  <p> 
  To read the story in more details, you can read the blog on
  <a href="https://jam.dev/blog/famous-bugs-rocket-launch/">Famous bugs rocket launch</a>. 
  </p>
  </div>
  `;

  const code1 = `
  "Original       :" 00011001
  "1s Complement  :" 11100110
  `;

  const code2 = `
  - "Positive Number: Let's start with +5."
       "Binary representation:" 00000101

  - "Inverting the bits (1's complement):"
       "1's complement of 00000101:" 11111010

  - "Adding 1 to the 1's complement:"
       "2's complement:" 11111010 + 1 = 11111011
  `;

  const code3 = `
  int x = 27; // here x is a 32-bit integer
  long long int y = 56; // here y is a 64-bit integer
  `;

  const code4 = `
  #include <bits/stdc++.h>
  using namespace std;
  
  int main() {
      bitset<32> one(1);
      bitset<32> minusone(-1);
      bitset<32> two(2);
      bitset<32> five(5);
      bitset<32> negfive(-5);
      bitset<32> UI_MAX(UINT_MAX);
  
      bitset<32> zero(0);
      bitset<32> three(3);
      bitset<32> four(4);
      bitset<32> I_MAX(INT_MAX);
  
      bitset<32> I_MIN(INT_MIN);
      bitset<32> I_MIN_PLUS_one(INT_MIN + 1);
      bitset<32> I_MIN_PLUS_two(INT_MIN + 2);
      bitset<32> I_MIN_PLUS_three(INT_MIN + 3);
      bitset<32> I_MIN_PLUS_four(INT_MIN + 4);
  
      cout << "Unsigned Integers"<<endl;
      cout << "0  : " << zero << endl;
      cout << "1  : " << one << endl;
      cout << "2  : " << two << endl;
      cout << "5  : " << five << endl;
      cout << "UINT_MAX (" << UINT_MAX << "): " << UI_MAX <<endl<<endl;
  
      cout << "Signed integers Cyclic Nature"<<endl;
      cout << "0: " << zero << endl;
      cout << "1: " << one << endl;
      cout << "2: " << two << endl;
      cout << "3: " << three << endl;
      cout << "4: " << four << endl;
      cout << "INT_MAX (" << INT_MAX << "): " << I_MAX << endl << endl;
  
      cout << "INT_MIN (" << INT_MIN << "): " << I_MIN << endl;
      cout << "INT_MIN + 1 (" << INT_MIN + 1 << "): " << I_MIN_PLUS_one << endl;
      cout << "INT_MIN + 2 (" << INT_MIN + 2 << "): " << I_MIN_PLUS_two << endl;
      cout << "INT_MIN + 3 (" << INT_MIN + 3 << "): " << I_MIN_PLUS_three << endl;
      cout << "INT_MIN + 4 (" << INT_MIN + 4 << "): " << I_MIN_PLUS_four << endl;
      cout << "-1: " << minusone << endl<<endl;
  
      cout << "Negative integer representation 2s complement"<<endl;
      cout << "-5: " << negfive << endl;
      cout << "Positive integer representation:"<<endl;
      cout << "5: " << five << endl;
  
      cout << "Negative numbers are represented using two's complement."<<endl;
      cout << "For example, -5 is represented as the two's complement of 5."<<endl;
      cout << "To get the two's complement: invert all bits of 5 and add 1."<<endl;
      cout << "This results in the binary representation of -5."<<endl;
  
      return 0;
  }
  `;

  const code5 = `
Finished in 0 ms
Unsigned Integers
0  : 00000000000000000000000000000000
1  : 00000000000000000000000000000001
2  : 00000000000000000000000000000010
5  : 00000000000000000000000000000101
UINT_MAX (4294967295): 11111111111111111111111111111111

Signed integers Cyclic Nature
0: 00000000000000000000000000000000
1: 00000000000000000000000000000001
2: 00000000000000000000000000000010
3: 00000000000000000000000000000011
4: 00000000000000000000000000000100
INT_MAX (2147483647): 01111111111111111111111111111111

INT_MIN (-2147483648): 10000000000000000000000000000000
INT_MIN + 1 (-2147483647): 10000000000000000000000000000001
INT_MIN + 2 (-2147483646): 10000000000000000000000000000010
INT_MIN + 3 (-2147483645): 10000000000000000000000000000011
INT_MIN + 4 (-2147483644): 10000000000000000000000000000100
-1: 11111111111111111111111111111111

Negative integer representation 2s complement
-5: 11111111111111111111111111111011
Positive integer representation:
5: 00000000000000000000000000000101
Negative numbers are represented using two's complement.
For example, -5 is represented as the two's complement of 5.
To get the two's complement: invert all bits of 5 and add 1.
This results in the binary representation of -5.`;

  /* ==========================================================
      ! Please make sure you have at max 8 sections in the array
  ========================================================== */
  const sections = [
    "Bits and Bytes in the Computer Memory",
    "Binary Arithmetics",
    "Number Complement Systems",
    "Numbers Represented",
    "Signed & UnSigned Integer",
    "Cyclic Integer Representation",
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
              <p className="blog-date">Published on: {currBlog?.blogDate}</p>
            </div>
          </div>
          <div className="main-blog-content" onScroll={handleScroll}>
            <BitsAnimation />
            <p className="open-txt">
              Welcome back to our bit manipulation series! 🙋‍♂️ In the previous
              blog, we dived into the basics of number systems and why computers
              speak the language of 0s and 1s. Today, we will build on that
              foundation by exploring how numbers are represented in computer
              memory and diving into binary operations. Let's get started!
            </p>

            <div className="blog-section">
              <h3 className="blog-section-title">
                Bits and Bytes in the Computer Memory
              </h3>
              <InfoDiv infoText={infoNote1} />

              <h4 className="sub-title">
                Where do computers store all these bits?
              </h4>

              <p>
                The computer has its smallest unit to store the data. The unit
                is called Register. A register is a small, fast storage location
                within the CPU used to hold data temporarily. Generally, we have
                an 8-bit Register, 16-bit Register, 32-bit Register, 64-bit
                Register, and that is why the computer has different
                architectures like 32-bit and 64-bit architecture. We can
                generally say that a computer with a 32-bit architecture has
                32-bit registers.
                <ul>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i> <b>Bits:</b> The
                    smallest unit of data in a computer, a bit can be either 0
                    or 1.
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i> <b>Bytes:</b> A
                    group of 8 bits.
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i> <b>Nibbles:</b> Half
                    of a byte, consisting of 4 bits.
                  </li>
                </ul>
              </p>
              <BlogImage
                imgDark={img1}
                imgLight={img1l}
                theme={theme}
                description={`Fig(1.0) How 32 bit register stores numbers.`}
              />
              <p>
                You might have observed one thing, to store the number 14
                computer would only need 4 bits, but usually we use standardized
                bit architectures such as min 8-bit, 16-bit, 32-bit, and 64-bit.
                The question arises, why standardize? Doesn't this lead to an
                increase in the use of redundant 0s? Are we wasting space?
              </p>

              <p>
                You're correct, using larger registers, such as 64-bit instead
                of 32-bit, can lead to more space being used to represent
                smaller numbers, potentially resulting in more zeros (redundant
                bits). This can seem like wasted space at first glance. However,
                there are important reasons why computers use larger registers
                despite this apparent inefficiency:
                <ul>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i> <b>Power of Two:</b>{" "}
                    Computers use binary (base-2) representation, and powers of
                    two (2^n) fit naturally into this system. This makes
                    operations simpler and more efficient.
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>{" "}
                    <b>Hardware Design:</b> Using standard bit sizes simplifies
                    the design of hardware components like processors, memory,
                    and buses. It also standardizes how data is stored and
                    transferred.
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>{" "}
                    <b>Addressing and Data Types:</b> Standard bit sizes align
                    with common data types and address lengths, making it easier
                    to handle data and memory addresses consistently.
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>{" "}
                    <b>Compatibility:</b> Standardizing on larger register sizes
                    (like 64-bit) ensures compatibility across different
                    hardware architectures and software applications. It allows
                    programs to run on different systems without modification,
                    assuming they adhere to the same architecture.
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>{" "}
                    <b>Future-Proofing:</b> As technology advances and memory
                    capacities increase, larger register sizes (64-bit) become
                    more practical and necessary. They provide more headroom for
                    future software and hardware advancements without requiring
                    immediate redesign.
                  </li>
                </ul>
              </p>
              <MustReadDiv mustReadText={mustRead} />
            </div>

            <div className="blog-section">
              <h3 className="blog-section-title">Binary Arithmetics</h3>
              <p>
                Binary arithmetic is the foundation of all computations in
                computer science.
              </p>
              <h4 className="sub-title">Binary Addition</h4>
              <p>
                Binary addition operates similarly to decimal addition but is
                even simpler because it only involves two digits: 0 and 1. Here
                are the basic rules for binary addition:
                <ul>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i> <b>0 + 0 = 0:</b>{" "}
                    Adding zero to zero yields zero.
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i> <b>0 + 1 = 1:</b>{" "}
                    Adding zero to one yields one.
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i> <b>1 + 0 = 1:</b>{" "}
                    Adding one to zero yields one
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i> <b>1 + 1 = 10:</b>{" "}
                    Adding one to one yields zero and a carry-over of one
                    (equivalent to 2 in decimal).
                  </li>
                </ul>
              </p>

              <h4 className="sub-title">Carry-Over Concept</h4>
              <p>
                When the sum of a column exceeds 1, a carry-over occurs, just
                like in decimal addition when the sum exceeds 9.
              </p>

              <h4 className="sub-title">Binary Subtraction</h4>
              <p>
                Binary subtraction, like binary addition, follows specific rules
                and involves borrowing when needed. Here are the basic rules for
                binary subtraction:
                <ul>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i> <b>0 - 0 = 0:</b>{" "}
                    Subtracting zero from zero yields zero.
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i> <b>1 - 0 = 1:</b>{" "}
                    Subtracting zero from one yields one.
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i> <b>1 - 1 = 0:</b>{" "}
                    Subtracting one from one yields zero.
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i> <b>0 - 1:</b>{" "}
                    Requires borrowing from the next higher bit.
                  </li>
                </ul>
              </p>

              <h4 className="sub-title">Borrow Concept</h4>
              <p>
                Borrowing in binary subtraction occurs when you subtract a
                larger digit from a smaller one. You borrow 1 from the next
                higher bit, which is equivalent to 2 in binary (since 10 in
                binary equals 2 in decimal).
              </p>
            </div>

            <div className="blog-section">
              <h3 className="blog-section-title">Number Complement Systems</h3>
              <h4 className="sub-title">1's Complement</h4>
              <p>
                To find the 1's complement, flip all the bits (0 becomes 1, and
                1 becomes 0).
              </p>
              <CodeSnippet codeText={code1} theme={theme} />
              <h4 className="sub-title">2’s Complement</h4>
              <p>
                The 2's complement is a mathematical operation used in computer
                systems to represent signed integers. It is especially useful
                because it simplifies the design of arithmetic logic units
                (ALUs) in digital computers, making it possible to perform both
                addition and subtraction operations easily.
              </p>
              <CodeSnippet codeText={code2} theme={theme} />

              <InfoDiv infoText={infoNote2} />
            </div>

            <div className="blog-section">
              <h3 className="blog-section-title">
                How Numbers are Represented in Computer
              </h3>
              <p>
                In computer science, one topic that has always confused me is
                how numbers are stored in a computer. How can computers
                differentiate between +1 and -1?
              </p>
              <p>Let’s solve this mystery once and for all.</p>
              <InfoDiv infoText={infoNote3} />

              <p>
                As we have discussed in previous sections, in the standard C/C++
                language, we see 32-bit or 64-bit integers. 32-bit integers are
                declared using the int keyword, while 64-bit integers are
                declared using the long keyword.
                <br />
                So when we write:
              </p>
              <CodeSnippet codeText={code3} theme={theme} language="cpp" />
              <p>
                You can simply imagine a 32-bit integer as an array of 32
                blocks, with each block having a size of 1 bit, similar to how
                we imagined a 32-bit register.
                <br />
                Now each bit value can be set (1) or unset (0). With this logic,
                what can be the maximum value that we can store inside a 32-bit
                integer? You might say that if this bit array has a maximum size
                of 32 bits, then to get the maximum number, we should set all 32
                bits to 1. Absolutely right 👍.
                <br />
                So the maximum 32-bit integer number becomes all 32 1s.
              </p>
              <BlogImage
                imgDark={img2}
                imgLight={img2l}
                theme={theme}
                description={`Fig(2.0) UINT_MAX value representation in 32-bit integer.`}
              />
              <p>
                This number is 4294967295, which in C++ as a programming
                language is called UINT_MAX. Now, if I ask what can be the
                minimum value we can store inside a 32-bit integer? You will say
                to assign all bits with 0s (also called: unset them all). The
                number becomes 0. So we can easily conclude that any 32-bit
                integer can hold any number between the range [0, 4294967295],
                i.e. [0, UINT_MAX].
              </p>
              <p>Wait, wait, wait...</p>
              <p>
                Sahil, you explained all the positive numbers, but how can we
                store -1, -3, or any other negative number in this 32-bit
                integer then? Yes, that’s the confusion I was talking about at
                the very beginning of this section. Let’s remove all the
                confusion. As of now, we have the idea that the total number of
                integers we can store in 32-bit integers is 4294967295. Let’s
                draw it on a number line. What if we split this line into two
                halves?
              </p>
              <p>
                Such that the first half will hold numbers from [0, 4294967295 / 2].
                <br />
                The second half will hold numbers from [-(4294967295 / 2), -1].
              </p>
              <BlogImage
                imgDark={img3}
                imgLight={img3l}
                theme={theme}
                description={`Fig(3.0) Integer representation on a number line.`}
              />
              <p>
                But 4294967295 in itself an odd number so we cannot divide it
                completely by two. So more sophisticatedly we can divide our
                ranges as:
                <br />
                <b>[-2714483648, -1] —- [0, 2714483647]</b>
                <br />
                So if you want to know the total numbers in this range are:
                <br />
                <b>2714483647 - (-2714483648) == 4294967295</b>
              </p>
              <p>
                Hurrey 🥳, problem solved! Now we have a way to represent at
                least half of the negative numbers in 32-bit INTEGER.
              </p>

              <h4 className="sub-title">Signed and Unsigned Integers</h4>
              <p>
                So finally we got our way out. The solution is to represent the
                negative numbers and positive numbers in a computer. But this
                solution ended up creating two whole new categories of numbers.
                Signed Integers and Unsigned Integers.
              </p>
              <BlogImage
                imgDark={img4}
                imgLight={img4l}
                theme={theme}
                description={`Fig(4.0) Signed and Unsigned Integer grouping.`}
              />
            </div>

            <div className="blog-section">
              <h3 className="blog-section-title">
                Representation of signed integers in computer.
              </h3>
              <p>
                From what we have learned so far, it’s very easy to understand
                how computers might represent unsigned integers. (i.e. Intergers
                in range [0, UINT_MAX]). By simply using all 32 bits and
                creating all the possible combinations of 0s and 1s to fill the
                gap and generate the numbers.
              </p>
              <p>
                But still, one question remains in our minds. How can we
                represent negative numbers in memory?
              </p>
              <p>
                So far what we have seen we have divided the whole range of
                unsigned integers into 2 to get half positive and half negative
                numbers to represent in signed integers group. Now if I ask you
                to take the maximum positive number from this range, that will
                be 2147283647, and represent it in its binary form, the number
                will look as: <b>01111111111111111111111111111111</b>
              </p>
              <p>
                So we can see we can still have 1 rightmost bit unused. One
                thing to note to represent the 2147283647 max signed integer we
                only require 31 bits. So can we use the last 32nd bit to
                differentiate the positive and negative numbers? Absolutely YES!
                And that’s what computer scientists across the globe would have
                thought initially.{" "}
              </p>
              <p>
                They gave this 32nd bit (MSB)the bit name SIGN-BIT. If for any
                signed integer the MSBth bit is 0 means the number is positive
                and if the MSBth bit is 1 it is a negative number.{" "}
              </p>

              <BlogImage
                imgDark={img5}
                imgLight={img5l}
                theme={theme}
                description={`Fig(5.0) Cyclic nature of signed integers.`}
              />

              <BlogImage
                imgDark={img6}
                imgLight={img6l}
                theme={theme}
                description={`Fig(6.0) Cyclic nature of signed integers.`}
              />
              <p>
                From the above two diagrams, we can easily see the cyclic nature
                of integers.{" "}
              </p>
            </div>

            <div className="blog-section">
              <h3 className="blog-section-title">
                Cyclic nature of integer representation. Why does 2s complement
                represent negative numbers?
              </h3>
              <p>
                The cyclic nature of integers in computing arises due to the way
                integers are represented and stored in computer systems,
                specifically using fixed-size binary numbers. This phenomenon is
                particularly evident in systems that use two's complement
                representation for signed integers.
              </p>
              <p>
                <b>Like why INT_MAX + 1 == INT_MIN?</b>
              </p>
              <p>
                Let's break down why adding 1 to the maximum integer value
                results in the minimum integer value in such systems.
              </p>
              <h4>Two's Complement Representation</h4>
              <p>
                Two's complement is the most common method for representing
                signed integers in binary. It allows for a simple binary
                arithmetic process and makes the representation of negative
                numbers straightforward.
              </p>
              <h4>Fixed Size Integers</h4>
              <p>
                In a typical 32-bit system:
                <ul>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i> The integer range is
                    from <b> −2^31 to 2^31 − 1</b>.
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i> The maximum integer
                    value <b>(`INT_MAX`) is 2^31−1</b>.
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i> The minimum integer
                    value <b>(`INT_MIN`) is −2^31</b>.
                  </li>
                </ul>
              </p>
              <h4>Binary Representation</h4>
              <p>
                For a 32-bit integer:
                <ul>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i> `INT_MAX`
                    (2147483647) in binary is: `01111111 11111111 11111111
                    11111111`.
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i> `INT_MIN`
                    (-2147483648) in binary is: `10000000 00000000 00000000
                    00000000`.
                  </li>
                </ul>
              </p>
              <h4>Integer Overflow</h4>
              <p>
                When you add 1 to `INT_MAX`, you get: `01111111 11111111
                11111111 11111111`+ 1 = `10000000 00000000 00000000 00000000`
              </p>
              <h4>Interpreting the Result</h4>
              <p>
                In two's complement, the most significant bit (MSB) is the sign
                bit. A 0 in the MSB indicates a positive number, while a 1
                indicates a negative number. - The binary number `10000000
                00000000 00000000 00000000` represents −2^31 in two's
                complement, which is `INT_MIN`.
              </p>

              <h4>Programming what we have learned so far:</h4>
              <CodeSnippet codeText={code4} theme={theme} language="cpp" />
              <BlogImage
                imgDark={img7}
                imgLight={img7l}
                theme={theme}
                description={`Fig(7.0) Output of the code snippet.`}
              />
            </div>

            <div className="blog-section">
              <h3 className="blog-section-title">Conclusion</h3>
              <p>
                In this blog, we've explored how computers store and manipulate
                binary data in memory, emphasizing standardization, efficiency,
                and the critical role of logical operations. Understanding these
                foundational concepts not only enhances our grasp of computer
                architecture but also underscores the significance of meticulous
                data handling in technological applications. Stay tuned for our
                next installment, where we'll delve into advanced binary
                arithmetic and practical applications in computing!
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

export default ArithmaticsAndMemoryRepresentation;
