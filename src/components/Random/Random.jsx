import React from "react";
import "./Random.scss";

const Random = ({ message }) => {
  const messageLines = message.split("\n");

  return (
    <div
      style={{
        width: "100%",
        minHeight: 270,
        margin: "24px 0",
        borderLeft: "1px solid var(--color-pink)",
        paddingLeft: 12,
        display: "flex",
        gap: 12,
      }}
    >
      <div>
        <i className="fa-solid fa-quote-left"></i>
      </div>
      <div>
        {/* Map through each line and render it */}
        {messageLines.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );
};

export default Random;
