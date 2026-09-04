import React, { useState } from "react";
import "./LeftSidebar.scss";

// Map a heading to a tick length. Clamped so a two-word heading still reads as
// a bar and a long one never runs past the gutter.
const TICK_MIN = 16;
const TICK_MAX = 46;

const tickWidth = (section) => {
  const len = String(section ?? "").length;
  const t = Math.min(len, 44) / 44;
  return Math.round(TICK_MIN + t * (TICK_MAX - TICK_MIN));
};

/**
 * Article TOC rail. Rests as a stack of tick bars (one per section, the active
 * one accented) and expands into the full labelled list on hover/focus, so the
 * gutter stays quiet while reading. Hidden below 1400px (no room for it).
 *
 * Open state is explicit rather than a CSS :hover. The rail is as tall as the
 * expanded list even while collapsed, so it can't be the hover target itself,
 * and relying on :hover reaching it through a pointer-events:none ancestor is
 * not something browsers agree on.
 */
const LeftSidebar = ({
  scrollPercentage,
  activeSection,
  sections,
  onSelect,
  hidden,
}) => {
  const [open, setOpen] = useState(false);

  if (!sections.length) return null;

  return (
    <nav
      className={`left-sidebar ${open ? "left-sidebar--open" : ""} ${
        hidden ? "left-sidebar--hidden" : ""
      }`}
      aria-label="On this page"
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
    >
      {/* Collapsed state. Decorative: the real nav lives in .toc-panel.
          Each tick's length tracks its heading's length, so the stack reads
          like ragged lines of text rather than a barcode. */}
      <div
        className="toc-ticks"
        aria-hidden="true"
        onMouseEnter={() => setOpen(true)}
      >
        {sections.map((section, index) => (
          <span
            key={index}
            className={`toc-tick ${
              activeSection === index ? "toc-tick--active" : ""
            }`}
            style={{ width: `${tickWidth(section)}px`, "--i": index }}
          />
        ))}
      </div>

      <div className="toc-panel" onMouseEnter={() => setOpen(true)}>
        <p className="toc-label">On this page</p>
        <div className="toc-body">
          <div className="toc-track" aria-hidden="true">
            <div
              className="toc-track__fill"
              style={{ height: `${scrollPercentage}%` }}
            />
          </div>
          <ul className="toc-list">
            {sections.map((section, index) => (
              <li key={index} style={{ "--i": index }}>
                <button
                  className={`toc-item ${
                    activeSection === index ? "toc-item--active" : ""
                  }`}
                  tabIndex={open ? 0 : -1}
                  onClick={() => {
                    onSelect(index);
                    setOpen(false);
                  }}
                >
                  <span className="toc-item__no" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default LeftSidebar;
