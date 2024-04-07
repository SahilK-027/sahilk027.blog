// Import necessary libraries and tools
import React, { useEffect, useState } from "react";
import Tooltip from "../Tooltip/Tooltip";

// Importing necessary assets and styles
import logoForBlackBg from "../../assets/images/logoForBlackBg.png";
import logoForWhiteBg from "../../assets/images/logoForWhiteBg.png";
import CommandSVG from "../SVG-JSX/CommandSVG/CommandSVG";
import "./Navbar.scss";
import MusicSVG from "../SVG-JSX/MusicSVG/MusicSVG";
import { Link } from "react-router-dom";
import { animated, useSpring } from "react-spring";

/**
 * @param {*} param0
 * @returns {JSX.Element} - Navbar component
 */
const Navbar = ({
  openCMDCenter,
  controlMusic,
  isMusicPlaying,
  theme,
  pageTitle = "",
}) => {
  const [scrolled, setScrolled] = useState(false);

  // Scroll event listener to update the state
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 150) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  // Attach scroll event listener when component mounts
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Define spring animation for page title visibility
  const pageTitleSpring = useSpring({
    opacity: scrolled ? 1 : 0,
    // transform: scrolled ? "translateY(0)" : "translateY(-20px)",
  });

  return (
    <>
      <div className="navbar">
        <div className="logo-container">
          <Link to="/">
            <img
              className="logo"
              src={theme === "dark" ? logoForBlackBg : logoForWhiteBg}
              alt="logo"
            />
          </Link>
          {/* Animated page title */}
          <animated.p className="page-title" style={pageTitleSpring}>
            {pageTitle}
          </animated.p>
        </div>
        <div className="navigation-container">
          <Tooltip content="Control Menu" direction="bottom">
            <CommandSVG openCMDCenter={openCMDCenter} />
          </Tooltip>
          <Tooltip content="Music" direction="bottom">
            <MusicSVG
              controlMusic={controlMusic}
              isMusicPlaying={isMusicPlaying}
            />
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default Navbar;
