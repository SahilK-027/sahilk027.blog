import React from "react";
import "./LeftSidebar.scss";

/**
 * Article TOC rail: reading-progress track + clickable section list.
 * Hidden below 1160px (no room next to the article column).
 */
const LeftSidebar = ({ scrollPercentage, activeSection, sections, onSelect }) => {
  if (!sections.length) return null;

  return (
    <nav className="left-sidebar" aria-label="On this page">
      <p className="toc-label">Index</p>
      <div className="toc-body">
        <div className="toc-track" aria-hidden="true">
          <div
            className="toc-track__fill"
            style={{ height: `${scrollPercentage}%` }}
          />
        </div>
        <ul className="toc-list">
          {sections.map((section, index) => (
            <li key={index}>
              <button
                className={`toc-item ${
                  activeSection === index ? "toc-item--active" : ""
                }`}
                onClick={() => onSelect(index)}
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
    </nav>
  );
};

export default LeftSidebar;
