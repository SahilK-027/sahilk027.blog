// Import necessary libraries and tools
import React from "react";
import Tooltip from "../Tooltip/Tooltip";

// Importing necessary assets and styles
import logo from "../../assets/images/logo-no-bg.png";
import CommandSVG from "../SVG-JSX/CommandSVG/CommandSVG";
import "./Navbar.scss";
import MusicSVG from "../SVG-JSX/MusicSVG/MusicSVG";

/**
 * @param {*} param0
 * @returns {JSX.Element} - Navbar component
 */
const Navbar = ({ openCMDCenter }) => {
  return (
    <>
      <div className="navbar">
        <div className="logo-container">
          <a href="/">
            <img className="logo" src={logo} alt="logo" />
          </a>
        </div>
        <div className="navigation-container">
          <Tooltip content="Nav Commands" direction="bottom">
            <CommandSVG openCMDCenter={openCMDCenter} />
          </Tooltip>
          <Tooltip content="Music" direction="bottom">
            <MusicSVG />
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default Navbar;
