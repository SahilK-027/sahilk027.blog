import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
// prismSetup MUST come before the grammar imports below — it sets the global
// Prism they extend. Grammar order matters too: clike → c → cpp.
import "./prismSetup";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-glsl";
import { Highlight } from "prism-react-renderer";
import "./CodeSnippet.scss";

// Empty theme → prism-react-renderer emits only token classes (no inline
// colors), so our CSS `--token-*` vars drive everything and it matches the page
// + flips with light/dark. Same approach as the reference blog.
const EMPTY_THEME = { plain: {}, styles: [] };

const CodeSnippet = ({ codeText, language = "javascript" }) => {
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
      <div className="code-snippet-header">
        <span className="code-lang">
          <span className="code-lang__dot" aria-hidden="true" />
          {language}
        </span>
        <button
          className="copy-code"
          onClick={copyToClipboard}
          aria-label="Copy code"
        >
          <animated.span
            style={{
              ...iconStyles,
              position: "absolute",
              opacity: iconStyles.opacity,
            }}
          >
            <i className="fa-solid fa-check"></i>
          </animated.span>
          <animated.span style={{ ...iconStyles, opacity: copied ? 0 : 1 }}>
            <i className="fa-solid fa-copy"></i>
          </animated.span>
          <span className="copy-code__label">{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      <Highlight
        code={codeText.replace(/\n$/, "")}
        language={language}
        theme={EMPTY_THEME}
      >
        {({ className, tokens, getLineProps, getTokenProps }) => (
          <pre className={`code ${className}`}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line })} key={i} className="cs-line">
                <span className="linenumber">{i + 1}</span>
                <span className="cs-line-content">
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default CodeSnippet;
