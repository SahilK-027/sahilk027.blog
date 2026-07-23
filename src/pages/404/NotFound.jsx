import React from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { GLYPH_PATHS } from "../../data/glyphPaths";
import "./NotFound.scss";

// The brand primitives, knocked over: a couple of glyphs lie tipped at odd
// angles — the shelf equivalent of a missing page.
const TIPPED = [-8, 24, 0, -90, 12, 116];

/**
 * Standalone full-viewport 404 — just navbar and centered content, no footer.
 */
const NotFound = ({ openCMDCenter, controlMusic, isMusicPlaying, theme }) => {
  const { pathname } = useLocation();

  return (
    <div className="not-found-screen">
      <Navbar
        openCMDCenter={openCMDCenter}
        controlMusic={controlMusic}
        isMusicPlaying={isMusicPlaying}
        theme={theme}
        pageTitle="404 Page Not Found"
      />
      <main className="nf-main">
        <p className="nf-kicker">
          <span className="nf-kicker__dot" aria-hidden="true" />
          Error 404 — page not found
        </p>
        <svg
          className="nf-code"
          viewBox="0 0 300 100"
          aria-hidden="true"
          focusable="false"
        >
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="central"
          >
            404
          </text>
        </svg>
        <h1 className="nf-title">This page drifted off the grid.</h1>

        <dl className="nf-index" aria-label="Request details">
          <div className="nf-index__row">
            <dt>Requested</dt>
            <span className="nf-index__leader" aria-hidden="true" />
            <dd className="nf-path">{pathname}</dd>
          </div>
          <div className="nf-index__row">
            <dt>Status</dt>
            <span className="nf-index__leader" aria-hidden="true" />
            <dd>not shelved</dd>
          </div>
        </dl>

        <div className="nf-shelf" aria-hidden="true">
          {GLYPH_PATHS.map((d, i) => (
            <svg
              key={i}
              viewBox="0 0 24 24"
              style={{ "--i": i, "--tip": `${TIPPED[i]}deg` }}
            >
              {d.split("M").filter(Boolean).map((seg, j) => (
                <path key={j} d={`M${seg}`} pathLength="1" />
              ))}
            </svg>
          ))}
        </div>

        <div className="nf-actions">
          <Link to="/">
            <i className="fa-solid fa-arrow-left" aria-hidden="true"></i>
            Back to the archive
          </Link>
          <button onClick={openCMDCenter}>
            Search posts
            <span className="nf-kbd" aria-hidden="true">
              <kbd>⌘</kbd>
              <kbd>K</kbd>
            </span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
