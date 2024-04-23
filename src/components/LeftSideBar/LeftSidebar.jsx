import React, { useEffect } from "react";
import "./LeftSidebar.scss";

const LeftSidebar = ({ scrollPercentage, activeSection, sections }) => {
  const filledHeight = `${scrollPercentage}%`;

  return (
    <div className="left-sidebar">
      <div className="vertical-bar-container">
        <div className="vertical-line" style={{ height: filledHeight }}></div>
      </div>
      <div className="section-names">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`section-name ${
              activeSection === index ? "active" : ""
            }`}
          >
            {section}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;
