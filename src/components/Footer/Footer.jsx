import React, { useEffect, useRef } from "react";
import { scrollToTop } from "../../hooks/useLenis";
import { GLYPH_PATHS } from "../../data/glyphPaths";
import "./Footer.scss";

// The shape family at rest: hero drops them as solid physics bodies, the
// footer shelves them as line drawings. Draw in stroke-by-stroke (staggered)
// when the footer enters the viewport.
const GlyphShelf = () => {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.classList.add("drawn");
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("drawn");
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div className="footer-shelf" ref={ref} aria-hidden="true">
      {GLYPH_PATHS.map((d, i) => (
        <svg
          key={i}
          className="footer-shelf__glyph"
          viewBox="0 0 24 24"
          style={{ "--i": i }}
        >
          {d.split("M").filter(Boolean).map((seg, j) => (
            <path key={j} d={`M${seg}`} pathLength="1" />
          ))}
        </svg>
      ))}
    </div>
  );
};

/**
 * Site footer — merged with the old "Get in touch" section: a large contact
 * CTA up top, link columns, then a slim legal bar with back-to-top.
 */
const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-cta">
          <p className="footer-kicker">
            <span className="footer-kicker__dot" aria-hidden="true" />
            Get in touch
          </p>
          <h2 className="footer-heading">
            Have a question, or want to suggest a topic?
          </h2>
          <a
            className="footer-email"
            href="mailto:sahilkandhare027@gmail.com"
          >
            sahilkandhare027@gmail.com
            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </a>
        </div>

        <div className="footer-columns">
          <div className="footer-col">
            <h3 className="footer-col__title">Discuss</h3>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/SahilK-027/sahilk027.blog/discussions"
            >
              Discussions
            </a>
            <a href="mailto:sahilkandhare027@gmail.com">Email</a>
          </div>
          <div className="footer-col">
            <h3 className="footer-col__title">Elsewhere</h3>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/SahilK-027"
            >
              GitHub
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.linkedin.com/in/sahilk027/"
            >
              LinkedIn
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://x.com/SahilK027"
            >
              <span aria-hidden="true">𝕏</span> (Twitter)
            </a>
          </div>
        </div>
      </div>

      <GlyphShelf />

      <div className="footer-bar">
        <div className="footer-bar__inner">
          <span className="footer-copy">
            © {new Date().getFullYear()} Sahil Kandhare. Built with{" "}
            <i className="fa-solid fa-heart" aria-hidden="true"></i> and
            WebGL.
          </span>
          <button
            className="footer-top-btn"
            onClick={() => scrollToTop(false)}
            aria-label="Back to top"
          >
            Back to top
            <i className="fa-solid fa-arrow-up" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
