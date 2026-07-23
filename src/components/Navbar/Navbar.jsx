// Import necessary libraries and tools
import React, { useEffect, useRef, useState } from "react";
import Tooltip from "../Tooltip/Tooltip";

// Importing necessary assets and styles
import logoForBlackBg from "../../assets/images/logoForBlackBg.webp";
import logoForWhiteBg from "../../assets/images/logoForWhiteBg.webp";
import "./Navbar.scss";
import MusicSVG from "../SVG-JSX/MusicSVG/MusicSVG";
import AccentPicker from "../AccentPicker/AccentPicker";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";

/**
 * Floating pill navbar: wordmark, single command trigger, appearance
 * popover (theme + accent) and music control.
 * @returns {JSX.Element} - Navbar component
 */
const Navbar = ({ openCMDCenter, controlMusic, isMusicPlaying, theme }) => {
  const { toggleTheme } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [appearanceOpen, setAppearanceOpen] = useState(false);
  const appearanceRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the appearance popover on outside click / Escape
  useEffect(() => {
    if (!appearanceOpen) return;
    const onPointerDown = (e) => {
      if (appearanceRef.current && !appearanceRef.current.contains(e.target)) {
        setAppearanceOpen(false);
      }
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setAppearanceOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [appearanceOpen]);

  return (
    <header className="navbar-wrap">
      <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
        <Link to="/" className="brand" aria-label="Home">
          <img
            className="logo"
            src={theme === "dark" ? logoForBlackBg : logoForWhiteBg}
            alt="logo"
          />
          <span className="wordmark">
            sahilk027<span className="wordmark-dot">.blog</span>
          </span>
        </Link>

        <div className="navigation-container">
          <button
            className="nav-btn cmd-btn"
            onClick={openCMDCenter}
            aria-label="Open command menu"
          >
            <i
              className="fa-solid fa-magnifying-glass"
              aria-hidden="true"
            ></i>
            <span className="cmd-btn__label" aria-hidden="true">
              <kbd>⌘</kbd>
              <kbd>K</kbd>
            </span>
          </button>

          <div className="appearance" ref={appearanceRef}>
            <Tooltip content="Appearance" direction="bottom">
              <button
                className={`nav-btn icon-btn ${appearanceOpen ? "active" : ""}`}
                onClick={() => setAppearanceOpen((v) => !v)}
                aria-label="Appearance settings"
                aria-expanded={appearanceOpen}
              >
                <i className="fa-solid fa-palette" aria-hidden="true"></i>
              </button>
            </Tooltip>

            {appearanceOpen && (
              <div className="appearance-popover" role="menu">
                <div className="appearance-row">
                  <span className="appearance-label">Theme</span>
                  <button className="theme-toggle" onClick={toggleTheme}>
                    <i
                      className={`fa-solid ${
                        theme === "dark" ? "fa-moon" : "fa-sun"
                      }`}
                      aria-hidden="true"
                    ></i>
                    {theme === "dark" ? "Dark" : "Light"}
                  </button>
                </div>
                <div className="appearance-row">
                  <span className="appearance-label">Accent</span>
                  <AccentPicker />
                </div>
              </div>
            )}
          </div>

          <Tooltip content="Music" direction="bottom">
            <MusicSVG
              controlMusic={controlMusic}
              isMusicPlaying={isMusicPlaying}
            />
          </Tooltip>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
