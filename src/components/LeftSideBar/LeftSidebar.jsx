import React, { useEffect } from "react";
import "./LeftSidebar.scss";

const LeftSidebar = ({
  scrollPercentage,
  activeSection,
  sections,
  setActiveSection,
}) => {
  useEffect(() => {
    if (scrollPercentage === 0) {
      setActiveSection(null);
    }
  }, [scrollPercentage, activeSection]);
  const filledHeight = `${scrollPercentage}%`;

  return (
    <>
      <div className="vertical-bar-container">
        <div className="vertical-line" style={{ height: filledHeight }}></div>
      </div>
      <div className="section-names">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`section-name ${
              activeSection === index ? "animated-gradient" : ""
            }`}
          >
            {section}
          </div>
        ))}
      </div>
    </>
  );
};

export default LeftSidebar;
