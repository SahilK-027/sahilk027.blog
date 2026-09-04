import { useEffect, useState } from "react";
import "./MobileToc.scss";

/**
 * Mobile / narrow-viewport table of contents. The desktop LeftSidebar hides
 * below 1400px; this takes over there: a floating progress-ring button that
 * expands into a bottom sheet listing the sections. Shares the same props as
 * LeftSidebar so BlogLayout drives both from one source of truth.
 */
const MobileToc = ({ scrollPercentage, activeSection, sections, onSelect }) => {
  const [open, setOpen] = useState(false);
  // Track the same threshold BackToTop uses so we can drop into its slot when
  // that button is hidden (top of page) and lift back up when it appears.
  const [raised, setRaised] = useState(false);
  useEffect(() => {
    const onScroll = () => setRaised(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the sheet is open; close on Escape.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!sections?.length) return null;

  const pct = Math.round(scrollPercentage || 0);

  const pick = (i) => {
    onSelect(i);
    setOpen(false);
  };

  return (
    <div className={`mobile-toc${raised ? " is-raised" : ""}`}>
      {/* Trigger: progress ring only */}
      <button
        type="button"
        className="mobile-toc__fab"
        onClick={() => setOpen(true)}
        aria-label="Open table of contents"
        aria-expanded={open}
        title="On this page"
      >
        <span
          className="mobile-toc__ring"
          style={{ "--pct": `${pct}%` }}
          aria-hidden="true"
        >
          <span className="mobile-toc__ring-inner">
            <i className="fa-solid fa-list-ul" />
          </span>
        </span>
      </button>

      {/* Backdrop + sheet */}
      <div
        className={`mobile-toc__scrim${open ? " is-open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />
      <div
        className={`mobile-toc__sheet${open ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Table of contents"
      >
        <div className="mobile-toc__grip" aria-hidden="true" />
        <div className="mobile-toc__sheet-head">
          <span className="mobile-toc__sheet-title">Index</span>
          <span className="mobile-toc__sheet-pct">{pct}%</span>
          <button
            type="button"
            className="mobile-toc__close"
            onClick={() => setOpen(false)}
            aria-label="Close"
          >
            <i className="fa-solid fa-xmark" aria-hidden="true" />
          </button>
        </div>
        <ul className="mobile-toc__list">
          {sections.map((section, i) => (
            <li key={i} style={{ "--i": i }}>
              <button
                type="button"
                className={`mobile-toc__item${
                  activeSection === i ? " is-active" : ""
                }`}
                onClick={() => pick(i)}
              >
                <span className="mobile-toc__no">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mobile-toc__text">{section}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MobileToc;
