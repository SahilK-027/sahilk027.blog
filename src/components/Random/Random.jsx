import React from "react";
import "./Random.scss";

const Random = ({ message }) => {
  const lines = message
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  // The parenthetical is the translation/gloss; everything before it is verse.
  const verse = lines.filter((l) => !l.startsWith("("));
  const gloss = lines.filter((l) => l.startsWith("("));

  return (
    <figure className="random-quote">
      <i
        className="fa-solid fa-quote-left random-quote__icon"
        aria-hidden="true"
      />
      <blockquote className="random-quote__body">
        {verse.map((line, i) => (
          <p key={i} className="random-quote__line">
            {line}
          </p>
        ))}
      </blockquote>
      {gloss.length > 0 && (
        <figcaption className="random-quote__gloss">
          {gloss.join(" ")}
        </figcaption>
      )}
    </figure>
  );
};

export default Random;
