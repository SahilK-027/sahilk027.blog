import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import "prismjs/themes/prism-okaidia.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./CodeSnippet.scss";

const CodeSnippet = ({ codeText, language = "javascript", theme }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeText).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      },
      (err) => {
        console.error("Failed to copy code: ", err);
      }
    );
  };

  const iconStyles = useSpring({
    opacity: copied ? 1 : 0,
    config: { tension: 300, friction: 10 },
  });

  return (
    <div className="code-snippet-container">
      <div className="copy-code" onClick={copyToClipboard}>
        <animated.div
          style={{
            ...iconStyles,
            position: "absolute",
            opacity: iconStyles.opacity,
          }}
        >
          <i className="fa-solid fa-check"></i>
        </animated.div>
        <animated.div style={{ ...iconStyles, opacity: copied ? 0 : 1 }}>
          <i className="fa-solid fa-copy"></i>
        </animated.div>
      </div>

      <SyntaxHighlighter
        showLineNumbers
        language={language}
        style={theme === "dark" ? nightOwl : oneLight}
        className="code"
      >
        {codeText}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeSnippet;
