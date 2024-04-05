// Import necessary libraries and tools
import React from "react";
import Tooltip from "../Tooltip/Tooltip";

// Importing necessary assets and styles
import logoForBlackBg from "../../assets/images/logoForBlackBg.png";
import logoForWhiteBg from "../../assets/images/logoForWhiteBg.png";
import CommandSVG from "../SVG-JSX/CommandSVG/CommandSVG";
import "./Navbar.scss";
import MusicSVG from "../SVG-JSX/MusicSVG/MusicSVG";
import { Link } from "react-router-dom";

/**
 * @param {*} param0
 * @returns {JSX.Element} - Navbar component
 */
const Navbar = ({ openCMDCenter, controlMusic, isMusicPlaying, theme }) => {
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
        </div>
        <div className="navigation-container">
          <Tooltip content="Nav Commands" direction="bottom">
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
