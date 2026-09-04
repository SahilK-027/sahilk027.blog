// Import necessary libraries and tools
import React, { useEffect, useRef, useState } from "react";
import Tooltip from "../Tooltip/Tooltip";

// Importing necessary assets and styles
import "./Navbar.scss";
import MusicSVG from "../SVG-JSX/MusicSVG/MusicSVG";
import AccentPicker from "../AccentPicker/AccentPicker";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { GLYPH_PATHS } from "../../data/glyphPaths";
import { accents } from "../../data/accents";

/**
 * Floating pill navbar: wordmark, single command trigger, appearance
 * popover (theme + accent) and music control.
 * @returns {JSX.Element} - Navbar component
 */
const Navbar = ({ openCMDCenter, controlMusic, isMusicPlaying, theme }) => {
  const { toggleTheme, accent } = useApp();

  // Each accent owns one of the six brand primitives (same index mapping as
  // the AccentPicker). The nav mark shows the active accent's glyph.
  const accentIndex = Math.max(
    0,
    accents.findIndex((a) => a.name === accent)
  );
  const brandGlyph = GLYPH_PATHS[accentIndex % GLYPH_PATHS.length];
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
        <div className="nav-left">
          <Link to="/" className="brand" aria-label="Home">
            {/* Wireframe cube — same primitive family as the hero canvas and
                footer shelf. Draws itself in on mount, redraws in accent and
                takes a lazy turn on hover. */}
            <svg
              key={accent}
              className="brand-glyph"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {brandGlyph
                .split("M")
                .filter(Boolean)
                .map((seg, j) => (
                  <path key={j} d={`M${seg}`} pathLength="1" />
                ))}
            </svg>
            <span className="wordmark">
              sahilk027<span className="wordmark-dot">.blog</span>
            </span>
          </Link>
        </div>

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
