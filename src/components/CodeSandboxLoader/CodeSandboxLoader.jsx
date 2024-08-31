import React from "react";
import "./CodeSandboxLoader.scss";

const CodeSandboxLoader = ({ theme }) => {
  return (
    <div className={`sb-container ${theme}`}>
      <div className="cube">
        <div className="sides">
          <div className="top"></div>
          <div className="right"></div>
          <div className="bottom"></div>
          <div className="left"></div>
          <div className="front"></div>
          <div className="back"></div>
        </div>
      </div>
      <div className="text">Installing Dependencies</div>
    </div>
  );
};

export default CodeSandboxLoader;
