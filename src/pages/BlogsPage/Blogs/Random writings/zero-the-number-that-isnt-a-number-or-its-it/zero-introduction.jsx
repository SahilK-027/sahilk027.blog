import React, { useEffect, useState } from "react";
import Navbar from "../../../../../components/Navbar/Navbar";
import BlogsFooter from "../../../../../components/BlogsFooter/BlogsFooter";
import Footer from "../../../../../components/Footer/Footer";
import { blogPost } from "../../../../../data/BlogsData";
import LeftSidebar from "../../../../../components/LeftSideBar/LeftSidebar";
import { Link } from "react-router-dom";
import "../../Blogs.scss";
import { animated, useSpring } from "react-spring";
import Random from "../../../../../components/Random/Random";
import BlogImage from "../../../../../components/BlogImage/BlogImage";
import img1l from "./utils/assets/1l.png";
import img1d from "./utils/assets/1d.png";
import img2l from "./utils/assets/2l.png";
import img2d from "./utils/assets/2d.png";
import InsightDiv from "../../../../../components/InsightDiv/InsightDIV";
import MustReadDiv from "../../../../../components/MustReadDIV/MustReadDiv";
import InfoDiv from "../../../../../components/InfoDIV/InfoDiv";

const ZeroIntroduction = ({
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
    // window.scrollTo(0, 0);
    setCurrBlog(
      blogPost.find((blog) => {
        return blog.blogNo === 9;
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
  const sections = [
    "The World Without Zero",
    "The Shift from Quantity to Concept: Why Zero Took So Long",
    "Zero as a Placeholder: The Birth of Positional Notation",
    "Zero as a Number: The Rules, The Power, The Paradox",
    "The Real Limits of Math Without Zero",
    "The Invention of an Idea",
  ];

  const insightZero = `<div>
  <p>
  It wasn’t ignorance that kept Greeks and Romans from embracing Zero, it was ideology. Philosophers like Aristotle argued that “nature abhors a vacuum,” and thus, true “nothingness” was both physically and mathematically unacceptable. This cultural resistance delayed its adoption, even when other mathematical breakthroughs were flourishing.
  </p>
  <p>
  📚 You can read more about this history here:
  </p>
  <ul>
    <li>
      <i class="fa-solid fa-arrow-right"></i>
      <b>Kaplan, R. (1999): </b> <a href="https://books.google.com.vc/books?id=s_VZ7L24HJwC&printsec=frontcover&source=gbs_vpt_read#v=onepage&q&f=false" target="_blank">The Nothing That Is: A Natural History of Zero</a>
    </li>
    <li>
      <i class="fa-solid fa-arrow-right"></i>
      <b>Seife, C. (2000): </b> <a href="https://app.thestorygraph.com/books/41498ad1-7aff-426a-8773-6d7cd12dccfa " target="_blank">Zero: The Biography of a Dangerous Idea</a>
    </li>
  </ul>
</div>`;

  const mustRead = `
<div>
<p>
Brahmagupta’s Brahmasphutasiddhanta was written in 628 CE and is one of the most revolutionary texts in mathematical history. Not only did he describe Zero as a number, he formalized operations with negative values centuries before they were accepted in the West. This book was translated into Arabic in the 8th century and helped shape Islamic and, eventually, European mathematics.
</p>
<br />
<p> 
📖 Dive into the history here:
</p>
<ul>
  <li>
      <i class="fa-solid fa-arrow-right"></i>
      <b>Plofker, K. (2009): </b> Mathematics in India: 500 BCE to 1800 CE
  </li>
  <li>
      <i class="fa-solid fa-arrow-right"></i>
      <b>Blog reference: </b> <a href="https://www.open.ac.uk/blogs/MathEd/index.php/2022/08/25/the-men-who-invented-Zero/" target="_blank">The men who invented Zero</a>
  </li>
</ul>
</div>
`;

  const infoNote1 = `
<div>
<p>
In one of blogs I have already explained this concept of binary representation, if you want to know more you can read more about it <a style="cursor: pointer" target="_blank" href="/blogs/cs-fundamentals-bit-manipulation/getting-started-with-bit-manipulation-techniques-the-basics">here</a>.
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
          <Random
            message={`
              "Jab Zero diya mere Bharat ne, Bharat ne mere Bharat ne, Duniya ko tab ginti aayi
              Taaron ki bhasha Bharat ne Duniya ko pehle sikhlaayi
              Deta na dashamlav Bharat toh Yoon chaand pe jaana mushkil tha
              Dharti aur chaand ki doori ka Andaaza lagana mushkil tha"
              \n
              (Only when my India invented the Zero, only then the world learnt counting. The language of the stars, India taught that first to the world. Had India not invented the decimal point, it would've been difficult to reach the moon. Even estimating the distance between Earth and the Moon would've been a challenge.)`}
          />
          <div className="main-blog-content" onScroll={handleScroll}>
            <p className="open-txt">
              These or similar lines, filled with rhythm and pride, have echoed
              through generations in{" "}
              <a
                href="https://youtu.be/nI3gYPcyCTw?feature=shared"
                target="_blank"
                className="link"
              >
                songs
              </a>
              , speeches, and schoolbooks. As kids, we recited them with a sense
              of wonder, but without truly understanding their weight. I
              remember hearing that line about India gifting Zero to the world
              and thinking,{" "}
              <span className="bold-text">
                “Seriously? The world figured out every number but forgot Zero?
                😂”
              </span>{" "}
              It seemed almost laughable.
            </p>
            <p className="open-txt">
              Back then, it felt more like a fun fact than a fundamental idea,
              the kind of thing you’d memorize for a quiz, not question too
              deeply. So, like many childhood curiosities, I let it pass. We all
              grew up learning 1, 2, 3, and so on, using numbers daily without
              ever stopping to question them. They're just there, so naturally,
              we rarely notice how remarkable they are.
            </p>
            <p className="open-txt">
              Zero, of course, is one of them. Of all the numbers we’ve named
              and tamed, Zero has always felt odd. Not because it’s rare, in
              fact, it's <span className="bold-text">everywhere</span>. It’s in
              our books, phones, prices, passwords, and practically every part
              of life. But then I wondered: why do people say Zero was invented
              by{" "}
              <a
                className="link"
                href="https://en.wikipedia.org/wiki/Aryabhata"
                target="_blank"
              >
                Aryabhata
              </a>
              ? Why not just say he introduced it, like the other numbers? What
              was so special about it? After all, 1 and 2 and 3 were also
              created at some point in history, so why does Zero stand apart?
            </p>
            <p className="open-txt">
              At first, the question felt almost silly. But the more I thought
              about it, the more it started to bother me. Because if Zero is
              just another number, why does it hold this almost mythic status in
              math? And if it’s not just a number, then... what exactly is it?
            </p>

            <BlogImage
              imgDark={img1d}
              imgLight={img1l}
              theme={theme}
              description={`Fig(1.0) Understanding Invention of Zero`}
            />

            <div className="blog-section">
              <h3 className="blog-section-title">The World Without Zero</h3>
              <p>
                Most ancient cultures had systems for counting but no way to
                represent <span className="bold-text">"nothing"</span>. The
                Greeks had philosophy, geometry, and even early calculus, but
                their number system never included Zero. Romans used letters as
                numbers: I, V, X, L, C, D, M. You can write 3 as III and 30 as
                XXX. But try writing “zero” in Roman numerals, you can’t. The
                concept simply didn’t exist.
              </p>
              <p>
                Even more limiting, there was no placeholder. In the decimal
                system, 207 is different from 27 because position matters. But
                without, Zero, how do you distinguish 207 from 27? You can’t.
                Roman numerals had no positional logic, and while they served
                for records, tracking count and inscriptions, their system made
                arithmetic bulky and inefficient. Operations like Addition,
                subtraction, multiplication, division are hard to perform in
                roman number system.
              </p>
              <p>
                That’s what makes Zero remarkable. It’s not just another number
                it’s an idea. A conceptual turning point in human thought.
                Writing “0” doesn’t just mark absence; it gives it structure and
                value. It allows us to define gaps, make place value meaningful,
                and build systems that are scalable, repeatable, and logical.
              </p>
              <p>
                <span className="bold-text">
                  Without Zero, you can count, but you can’t calculate
                  efficiently.{" "}
                </span>
                And without calculation, the entire architecture of modern
                mathematics algebra, algorithms, calculus, and computing
                collapses.
              </p>
            </div>

            <div className="blog-section">
              <h3 className="blog-section-title">
                The Shift from Quantity to Concept: Why Zero Took So Long
              </h3>
              <p>
                For a symbol that now sits quietly on our keyboards, Zero had a
                long and turbulent journey into existence. And the question
                isn’t just why no one thought of it earlier, it’s why it was so
                difficult to think of at all.
              </p>
              <p>Let’s take a moment and play a little thought experiment.</p>
              <p>
                Imagine you're a seller in an ancient civilization. Every day,
                you count sacks of grain: 1, 2, 3… and note the count down. On
                one day, you sell them all. Your warehouse is empty. You want to
                note it down, but there's no word or symbol for "none." On your
                ledger, there's simply... nothing. Your storage is empty, and
                your records stay blank.
              </p>
              <p>Because in your world, Zero doesn’t exist yet.</p>
              <p>
                And yet, no one saw this as a flaw. As imagining Zero required
                more than just noticing absence. It required believing that
                absence deserves representation and that we can measure a lack.
                It wasn’t obvious.
              </p>
              <p>
                For early humans, counting was physical: one pebble for one sack
                of grains, one stick for counting one sheep. You could sell one
                sheep, three apples, but You couldn’t sell or pick up “nothing.”
                So why count it? 🤔
              </p>
              <p>
                Zero seems simple, just a symbol for nothing, right? But early
                humans had no reason to write “nothing.” They counted what they
                had, not what was missing. Why record what doesn’t exist?
              </p>
              <p>
                Even language stumbles here. Words like “none,” “empty,” or
                “void” are negations, not values.{" "}
                <span className="bold-text">
                  Zero was something else entirely, it asked us to treat nothing
                  as something.
                </span>{" "}
                That shift wasn’t just practical; it was philosophical. It
                required a change in the thought process that absence could be
                measured.
              </p>
              <p>
                But it wasn’t just logic that stood in the way, it was also
                belief.
              </p>
              <p>
                In ancient Greece, philosophers like Aristotle believed that{" "}
                <span className="bold-text">nature abhors a vacuum</span>, true
                emptiness couldn’t exist. To them, "nothingness" was unnatural,
                even dangerous. Their math avoided Zero. You can see the
                influence even today, try dividing by Zero on a calculator, and
                it still refuses 😵‍💫 (We’ll get to why soon, keep on reading).
              </p>
              <p>
                Other cultures resisted it for different reasons. Rome
                prioritised practicality. Roman numerals were for accounting,
                not abstraction. There was no incentive to include a number for
                nothing, especially in a system already cumbersome for
                calculation.
              </p>
              <p>
                The breakthrough came in India, where philosophical traditions
                like <span className="bold-text">"shunyata"</span> (emptiness{" "}
                <a
                  className="link"
                  target="_blank"
                  href="https://en.wikipedia.org/wiki/%C5%9A%C5%ABnyat%C4%81#:~:text=In%20Mah%C4%81y%C4%81na%20Buddhism%2C%20%C5%9B%C5%ABnyat%C4%81%20refers,Dzogchen%2C%20Shentong%2C%20or%20Chan."
                >
                  reference
                </a>{" "}
                ) in Buddhism and Hinduism already embraced the concept of
                nothingness as a foundational idea. This cultural context made
                the mental leap possible:{" "}
                <span className="bold-text">
                  What if “nothing” was not the opposite of a number, but a
                  number itself?
                </span>{" "}
              </p>
              <p>
                The reason Zero took so long wasn’t that it was hard to write.
                It was that it was hard to believe.
              </p>
              <InsightDiv insightText={insightZero} />
            </div>

            <div className="blog-section">
              <h3 className="blog-section-title">
                Zero as a Placeholder: The Birth of Positional Notation
              </h3>
              <p>
                Try writing 1,000 (One thousand) without using a Zero and you
                are left with 1 (One) 😀. How would you signal the absence of
                tens and hundreds? Without a placeholder, you’re left either
                writing everything out longhand or creating confusing symbols to
                fill the gaps. That’s where Zero becomes quietly revolutionary,
                not as a number with value, but as a position marker.
              </p>
              <p>
                This is the beauty of positional notation, a system we now take
                for granted. In the decimal system, the position of a digit
                determines its value: 3 in 300 is very different from 3 in 30 or
                3. But for this to work, you need a way to say, “There’s nothing
                here, and the place still matters.” That’s what Zero does. It
                doesn’t just stand for nothing, it holds the line.
              </p>
              <p>
                Earlier number systems like Roman numerals didn’t have this
                advantage. They couldn’t distinguish between 10 and 100 without
                writing completely different letters (X vs. C). As a result,
                math with such systems was a mess, with no columns, no
                alignment, and no clear way to carry out multiplication or
                division efficiently.
              </p>
              <p>
                When Zero entered the scene as a placeholder, it transformed how
                we could represent numbers. Suddenly, you didn’t need new
                symbols for every larger number, you just needed position and a
                few digits. That small circle gave rise to entire orders of
                magnitude. 10, 100, 1,000, all possible because of a Zero in the
                right place.
              </p>
              <p>
                So in many ways, Zero wasn’t just about “nothing”, it was about
                structure. It made numbers scalable. It made them digital. It
                made them make sense.
              </p>
            </div>

            <BlogImage
              imgDark={img2d}
              imgLight={img2l}
              theme={theme}
              description={`Fig(2.0) Understanding how positional system works`}
            />

            <div className="blog-section">
              <h3 className="blog-section-title">
                Zero as a Number: The Rules, the Power, the Paradox
              </h3>
              <p>
                Here’s the deal when people say “Aryabhata invented Zero,” what
                they really mean is this:
              </p>
              <p>
                <ul>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>
                    He used a placeholder system that implied Zero. In his
                    texts, a missing digit (like in 1_1) was understood to mean
                    “nothing.” He treated “nothingness” as meaningful, but…
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>
                    He{" "}
                    <span className="bold-text">
                      didn’t create a symbol for Zero
                    </span>{" "}
                    or fully define it as a number. He left the spot blank or
                    used word-based placeholders not a true Zero yet.
                  </li>
                </ul>
              </p>
              <p>
                For centuries after Aryabhata, Zero quietly marked empty spaces
                and held digits in place as a silent partner in the number
                system.
              </p>
              <p>
                Then came a turning point. A bold question:{" "}
                <span className="bold-text">
                  What if Zero wasn’t just the absence of value… but a value in
                  itself?
                </span>
              </p>
              <p>
                This shift from placeholder to participant cracked mathematics
                wide open. At the edge of this frontier stood{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Brahmagupta"
                  target="_blank"
                  className="link"
                >
                  Brahmagupta
                </a>
                , the 7th-century Indian mathematician who dared to define Zero
                as a real number. His rules didn’t just expand math they
                redefined its foundation.
              </p>
              <h4 className="sub-title">Zero Behaves Like a Number Now 🧠</h4>
              <p>
                Brahmagupta laid out rules for arithmetic involving Zero most of
                which still hold:
              </p>
              <p>
                <ul>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>
                    <code>𝑎 + 0 = 𝑎</code>
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>
                    <code>𝑎 − 0 = 𝑎</code>
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>
                    <code>𝑎 × 0 = 0</code>
                  </li>
                </ul>
              </p>
              <p>
                With this, he made another leap: defining negative numbers. In
                his work{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Br%C4%81hmasphu%E1%B9%ADasiddh%C4%81nta"
                  className="link"
                  target="_blank"
                >
                  Brahmasphutasiddhanta
                </a>
                , Brahmagupta used small dots over numerals to represent
                negatives a visual innovation, and laid out how they work in
                equations, including early steps toward the quadratic formula.
              </p>
              <h4 className="sub-title">
                Addition and Subtraction with Zero & Negatives (＋－)
              </h4>
              <p>
                <ul>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>
                    Adding or subtracting Zero leaves a number unchanged.{" "}
                    <code>(x +- 0 = x)</code>
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>A debt minus Zero is
                    still a debt. <code>(–a – 0 = –a)</code>
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>A debt subtracted
                    from Zero becomes a fortune. <code>(0 – (–a) = +a)</code>
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>A fortune subtracted
                    from Zero becomes a debt. <code>(0 – a = –a)</code>
                  </li>
                </ul>
                🔍 Why it matters: Brahmagupta was one of the first to formalize
                negative numbers, which many cultures rejected. His metaphors of
                “debt” (negative) and “fortune” (positive) made these abstract
                ideas feel grounded and intuitive.
              </p>
              <h4 className="sub-title">
                Multiplication & Division with Zero & Negatives (𝗫 ÷)
              </h4>
              <p>
                <ul>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>
                    Zero times any debt or fortune is Zero.{" "}
                    <code>(0 × x = 0)</code>
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>Zero times Zero is
                    still Zero. <code>(0 × 0 = 0)</code>
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>The product or
                    quotient of two fortunes is a fortune.{" "}
                    <code>(a / a = +x) or (a x a = +x)</code>
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>The product or
                    quotient of two debts is also a fortune.{" "}
                    <code>(-a / -a = +x) or (-a x -a = +x)</code>
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>A debt times a
                    fortune, or vice versa, is a debt.{" "}
                    <code>(-a / a = -x) or (-a x a = -x)</code>
                  </li>
                </ul>
                Brahmagupta absolutely nailed this.
              </p>
              <MustReadDiv mustReadText={mustRead} />
              <h4 className="sub-tile">
                Division with Zero: The Problem Child ⚠
              </h4>
              <p>
                <ul>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>
                    Zero divided by a number is Zero. <code>(0 / 1 = 0)</code>
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>A positive or
                    negative number divided by Zero is a fraction with Zero in
                    the denominator. <code>(0 / 0 = 1)</code>
                  </li>
                </ul>
                These are the rules where trouble starts:{" "}
                <span className="bold-text">
                  “Zero divided by Zero is Zero.”
                </span>
              </p>
              <p>
                But here’s why modern math disagrees and it comes down to what
                division really means.
              </p>
              <h4 className="sub-title">
                Understanding What Does Division Mean?
              </h4>
              <p>
                If:
                <br />
                <code>A ÷ B = C</code>
                <br />
                Then:
                <br />
                <code>A = B × C</code>
              </p>
              <p>
                Therefore If:
                <br />
                <code>0 ÷ 0 = x</code>
                <br />
                That implies:
                <br />
                <code>0 = 0 × x</code>
              </p>
              <p>
                But here’s the catch: <code>0 × 0 = 0</code>,{" "}
                <code>0 × 1 = 0</code>, <code>0 × 10 = 0</code>
                Any value for x makes this equation true. <br />
                So:{" "}
                <span className="bold-text">
                  There is no one solution there are infinite possibilities.
                </span>
              </p>
              <p>
                That’s why 0/0 is called an{" "}
                <span className="bold-text">indeterminate form </span>. It
                doesn’t give a unique result.
              </p>
              <p>
                Compare that with 1/0: <code>1 = 0 × x</code> This is never
                true. There’s no x that works. That’s why 1/0 is undefined.
              </p>
              <p>
                So:
                <ul>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>
                    <code>1/0 = no sense</code>
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>
                    <code>
                      0/0 = too much sense 😅 (a.k.a. too many answers)
                    </code>
                  </li>
                </ul>
              </p>
              <p>
                Brahmagupta wasn't wrong he was the First. Brahmagupta’s View
                was, "Zero divided by Zero is Zero." which feels intuitive like:
                If you have Zero things, and divide them among Zero people, how
                much each person gets? perhaps... still Zero?
              </p>
              <p>
                But modern math doesn’t accept that and it's less about
                "disagreeing" with Brahmagupta but more about understanding what
                division means logically.
                <br />
                He didn’t fail he hit the limits of what math could express at
                that time. He showed us the boundary. Later thinkers had to
                invent new tools like limits, continuity, and real analysis to
                explain what he had asked.
              </p>
            </div>

            <div className="blog-section">
              <h3 className="blog-section-title">
                The Real Limits of Math Without Zero
              </h3>
              <p>What if Zero never existed?</p>
              <p>
                Not just the <span className="bold-text">symbol</span>, but an{" "}
                <span className="bold-text">idea</span> of the concept of
                “nothing” as something you can{" "}
                <span className="bold-text">use</span>.
                <br />
                At first, it might sound like a small tweak. But remove Zero,
                and the entire architecture of modern math starts to fall.
              </p>
              <p>
                <ul>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>
                    <b>No Negative Numbers: </b> Negative numbers only make
                    sense in reference to Zero. You can’t have less than nothing
                    unless “nothing” is defined. Without Zero, there’s no
                    baseline, no way to distinguish debt from fortune, loss from
                    gain, or direction in graphs.
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>
                    <b>No Algebra: </b> Try solving this: <code>x + 5 = 5</code>
                    , The solution is x = 0. But if Zero doesn’t exist,{" "}
                    <span className="bold-text">
                      that equation has no answer 😮
                    </span>
                    . You can’t express{" "}
                    <span className="bold-text">balance</span>,{" "}
                    <span className="bold-text">neutrality</span>, or{" "}
                    <span className="bold-text">equality</span>. Entire branches
                    of algebra would collapse without the ability to represent
                    “nothing.”
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>
                    <b>No Calculus: </b> Calculus is built on the idea of limits
                    getting{" "}
                    <span className="bold-text">infinitely close to Zero</span>,
                    but never quite touching it. Derivatives and integrals
                    depend on what happens as change approaches nothing.
                    <br />
                    No Zero? No limits.
                    <br />
                    No limits? No motion, no rates, no physics as we know it.
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-right"></i>
                    <b>No Binary → No Computers: </b>
                    Binary the language of computers is made of{" "}
                    <span className="bold-text">1s and 0s</span>. Every app,
                    every website, every photo and video: all coded in bits that
                    flip between presence (1) and absence (0).
                    <br />
                    Without Zero, there is no binary.
                    <br />
                    Without binary, there is no digital world.
                  </li>

                  <InfoDiv infoText={infoNote1} />
                </ul>
                <br />
                Zero is a <span className="bold-text">hinge</span> on which
                math, logic, computation, and the modern world turn. Strip it
                away, and you’re not left with a simpler math{" "}
                <span className="bold-text">
                  perhaps you’re left with no math at all
                </span>{" "}
                😿.
              </p>
            </div>

            <div className="blog-section">
              <h3 className="blog-section-title">The Invention of an Idea</h3>
              <p>
                Here’s the truth: Zero wasn’t discovered or introduced it was so {" "}
                <span className="bold-text">invented</span>. Not in the sense of
                stumbling upon a new planet or digging up a fossil. It was
                something far more radical a concept entirely by thought. Zero
                isn’t something you find lying around in nature. You can see
                three apples, five stones, ten stars but you’ll never “see” a
                Zero anything. It’s not a thing. It’s the idea of a nothing. And
                that makes it one of the most purely human creations in all of
                history. It emerged not from observation, but from abstraction.
                It was born when someone dared to ask:
              </p>
              <p>
                <span className="bold-text">“Can absence be something?”</span>
                <br />
                <span className="bold-text">“Can nothing have value?”</span>
              </p>
              <p>
                And when that leap was taken, everything changed. Math went from
                counting sheep to calculating integrals limiting from Zero to
                infinity. From keeping accounts to cracking atoms. From marking
                what is to measure & what isn’t, what might be, and what might
                not be.
              </p>
              <p>
                Zero isn’t just a symbol we started using. It’s a way of
                thinking that reshaped mathematics, science, philosophy, and the
                modern world. <br /> <br />
                <span className="bold-text">
                  Zero may look like nothing, but it’s the only reason that
                  today we have everything. -Sahil K.
                </span>
                <br />
              </p>
              <p>Keep being curious. Happy learning 🤓!</p>
            </div>
          </div>
        </div>
      </div>
      <BlogsFooter theme={theme} />
      <Footer toggleTheme={toggleTheme} />
    </>
  );
};

export default ZeroIntroduction;
