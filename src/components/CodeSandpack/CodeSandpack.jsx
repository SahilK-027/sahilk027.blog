import React from "react";
import { Sandpack } from "@codesandbox/sandpack-react";
import { nightOwl } from "@codesandbox/sandpack-themes";

const CodeSandpack = ({ files, theme, layout = "preview" }) => {
  return (
    <div style={{ padding: "10px 0" }}>
      <Sandpack
        template="vanilla"
        theme={theme === "dark" ? nightOwl : "light"}
        customSetup={{
          dependencies: {
            three: "latest",
          },
        }}
        files={files}
        options={{
          editorHeight: "500px",
          editorWidthPercentage: 55,
          showInlineErrors: true,
          showLineNumbers: true,
          wrapContent: true,
          autorun: true,
          layout: layout,
        }}
      />
    </div>
  );
};

export default CodeSandpack;
