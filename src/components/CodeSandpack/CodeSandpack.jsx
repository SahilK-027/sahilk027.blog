import React, { memo, useEffect, useRef, useState } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackConsole,
  UnstyledOpenInCodeSandboxButton,
  useSandpackNavigation,
} from "@codesandbox/sandpack-react";
import "./CodeSandPack.scss";

// Theme from the site's CSS variables — flips with [data-theme] automatically.
const sandpackTheme = {
  colors: {
    surface1: "var(--color-bg-box-container)",
    surface2: "var(--border-color)",
    surface3: "var(--color-bg-box-container-dark)",
    clickable: "var(--color-text-secondary)",
    base: "var(--token-plain)",
    disabled: "var(--color-text-secondary-dark)",
    hover: "var(--color-text-primary)",
    accent: "var(--color-anchor)",
    error: "var(--color-error)",
    errorSurface: "var(--color-warning-bg)",
  },
  syntax: {
    plain: "var(--token-plain)",
    comment: { color: "var(--token-comment)", fontStyle: "italic" },
    keyword: "var(--token-keyword)",
    tag: "var(--token-tag)",
    punctuation: "var(--token-punctuation)",
    definition: "var(--token-function)",
    property: "var(--token-property)",
    static: "var(--token-number)",
    string: "var(--token-string)",
  },
  font: {
    body: "var(--font-family)",
    mono: '"Fira Code", monospace',
    size: "14px",
    lineHeight: "24px",
  },
};

// Custom preview toolbar: code toggle · Preview/Console tabs · fullscreen ·
// refresh · open-in-sandbox. Must live inside SandpackProvider (uses its hooks).
const PreviewToolbar = ({
  tab,
  setTab,
  showCode,
  toggleCode,
  isFullscreen,
  toggleFullscreen,
}) => {
  const { refresh } = useSandpackNavigation();

  return (
    <div className="sp-toolbar">
      <div className="sp-toolbar__left">
        <button
          className="sp-tbtn"
          title={showCode ? "Hide code" : "Show code"}
          onClick={toggleCode}
        >
          <i className="fa-solid fa-code"></i>
        </button>
        <button
          className={`sp-seg ${tab === "preview" ? "is-active" : ""}`}
          onClick={() => setTab("preview")}
        >
          Preview
        </button>
        <button
          className={`sp-seg ${tab === "console" ? "is-active" : ""}`}
          onClick={() => setTab("console")}
        >
          Console
        </button>
      </div>
      <div className="sp-toolbar__right">
        <button
          className="sp-tbtn"
          title="Fullscreen"
          onClick={toggleFullscreen}
        >
          <i
            className={`fa-solid ${
              isFullscreen ? "fa-compress" : "fa-expand"
            }`}
          ></i>
        </button>
        <button className="sp-tbtn" title="Refresh" onClick={() => refresh()}>
          <i className="fa-solid fa-rotate-right"></i>
        </button>
        <UnstyledOpenInCodeSandboxButton
          className="sp-tbtn"
          title="Open in CodeSandbox"
        >
          <i className="fa-solid fa-arrow-up-right-from-square"></i>
        </UnstyledOpenInCodeSandboxButton>
      </div>
    </div>
  );
};

const SandpackContent = () => {
  const [tab, setTab] = useState("preview");
  const [showCode, setShowCode] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = isFullscreen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);

  // Lenis smooth-scroll captures the wheel globally, so scrolling over the code
  // editor moved the PAGE instead of the code (user had to drag the scrollbar).
  // `data-lenis-prevent` tells Lenis to leave wheel events inside these panes
  // alone. Re-tag whenever the editor mounts/unmounts (showCode toggle).
  useEffect(() => {
    let tries = 0;
    const tag = () => {
      const root = rootRef.current;
      if (root) {
        root
          .querySelectorAll(".cm-scroller, .sp-console-list")
          .forEach((el) => el.setAttribute("data-lenis-prevent", "true"));
      }
      // CodeMirror mounts its scroller a tick after commit — retry briefly.
      if (tries++ < 10) timer = setTimeout(tag, 60);
    };
    let timer = setTimeout(tag, 0);
    return () => clearTimeout(timer);
  }, [showCode, tab]);

  const paneHeight = isFullscreen ? "calc(100dvh - 48px)" : 452;
  const editorHeight = isFullscreen ? "100dvh" : 500;

  return (
    <div
      ref={rootRef}
      className={`code-sandpack ${isFullscreen ? "is-fullscreen" : ""}`}
    >
      <SandpackLayout>
        {showCode && (
          <SandpackCodeEditor
            showTabs
            showLineNumbers
            showRunButton={false}
            wrapContent={false}
            style={{ height: editorHeight }}
          />
        )}
        <div className="sp-right">
          <PreviewToolbar
            tab={tab}
            setTab={setTab}
            showCode={showCode}
            toggleCode={() => setShowCode((s) => !s)}
            isFullscreen={isFullscreen}
            toggleFullscreen={() => setIsFullscreen((f) => !f)}
          />
          <SandpackConsole
            style={{
              height: paneHeight,
              display: tab === "console" ? "flex" : "none",
            }}
          />
          <SandpackPreview
            showOpenInCodeSandbox={false}
            showRefreshButton={false}
            showNavigator={false}
            style={{
              height: paneHeight,
              display: tab === "preview" ? "flex" : "none",
            }}
          />
        </div>
      </SandpackLayout>
    </div>
  );
};

/** Live, editable three.js sandbox — unified editor + preview with a pro toolbar. */
const CodeSandpack = memo(({ files }) => {
  return (
    <SandpackProvider
      template="vanilla"
      theme={sandpackTheme}
      files={files}
      customSetup={{
        dependencies: {
          // Sandpack 2.19+ bundler handles modern three (class static blocks).
          three: "0.169.0",
          "lil-gui": "latest",
        },
      }}
      options={{ autorun: true }}
    >
      <SandpackContent />
    </SandpackProvider>
  );
});

export default CodeSandpack;
