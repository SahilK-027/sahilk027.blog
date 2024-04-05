// Importing necessary libraries and tools
import React, { useRef, useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";

// Importing necessary components and tools
import Tooltip from "../Tooltip/Tooltip";

// Importing necessary styles && data
import "./CommandCenter.scss";
import { commandShortcuts, cmdItems } from "../../data/CommandShortCuts";
import { Link } from "react-router-dom";

/**
 * SearchBlogs component
 * @returns {JSX.Element} - CommandCenter component
 */
const SearchBlogs = () => {
  return (
    <div className="search-bar">
      <input
        autoFocus={true}
        type="text"
        placeholder="Please enter keywords to search for a blog post..."
      />
      <Tooltip content="Filter Blogs" direction="top">
        <div className="filter-posts-container">
          <i className="fa-solid fa-filter filter-icon"></i>
        </div>
      </Tooltip>
    </div>
  );
};

/**
 * ItemCenter component
 * @returns {JSX.Element} - CommandCenter component
 */
const ItemCenter = () => {
  return (
    <div className="item-center">
      <div className="search-result"></div>
      <div className="cmd-items">
        {cmdItems.map((item, index) => (
          <div key={index}>
            <h4>{item.title}</h4>
            {item.navLinks.map((link, idx) => (
              <Link target={link.target} key={idx} to={link.href}>
                <div className="icon">
                  <i className={`fa ${link.icon}`}></i>
                </div>
                <div className="nav-link">{link.text}</div>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 *  ShortCuts component
 * @returns {JSX.Element} - CommandCenter Shortcuts component
 */
const ShortCuts = () => {
  return (
    <div className="short-cuts">
      {commandShortcuts.map((shortcut, index) => (
        <div key={index} className="shortcut-item">
          <div className="shortcut-name">{shortcut.name}</div>
          <div className="shortcut-key">
            <div className="shortcut-letter">
              <i className="fa-solid fa-angle-up"></i>
            </div>
            <div className="shortcut-letter">{shortcut.shortcut}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * CommandCenter component
 * @param {*} param0
 * @returns  {JSX.Element} - CommandCenter component
 */
const CommandCenter = ({ closeCMDCenter }) => {
  // Ref to the command center
  const commandCenterRef = useRef(null);

  // Event listener to handle the click outside the command center to close it
  useEffect(() => {
    // Function to handle the click outside the command center
    const handleClickOutside = (event) => {
      // If the click is outside the command center, close the command center
      if (
        commandCenterRef.current &&
        !commandCenterRef.current.contains(event.target)
      ) {
        closeCMDCenter();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Unsubscribing the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [commandCenterRef]);

  const animationProps = useSpring({
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1 },
  });

  return (
    <div className="command-center-container">
      <animated.div
        className="command-center"
        style={animationProps}
        ref={commandCenterRef}
      >
        <SearchBlogs />
        <ItemCenter />
        <ShortCuts />
      </animated.div>
    </div>
  );
};

export default CommandCenter;
