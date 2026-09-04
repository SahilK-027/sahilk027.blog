import React, { useState } from "react";
import NumberStepper from "../NumberStepper/NumberStepper";
import "./NumberSystemExplorer.scss";

const BASES = [
  { radix: 2, label: "Binary", tag: "Base-2" },
  { radix: 8, label: "Octal", tag: "Base-8" },
  { radix: 10, label: "Decimal", tag: "Base-10" },
  { radix: 16, label: "Hex", tag: "Base-16" },
];

// 20 bits keeps the place-value row readable while still covering big numbers.
const MAX = 1048575;

const NumberSystemExplorer = () => {
  const [value, setValue] = useState(156);
  const [base, setBase] = useState(2);

  const digits = value.toString(base).toUpperCase().split("");
  const len = digits.length;

  // Per digit: value = digit * radix^power, power counted from the right.
  const terms = digits.map((ch, i) => {
    const power = len - 1 - i;
    const digitVal = parseInt(ch, base);
    return { ch, power, digitVal, contribution: digitVal * base ** power };
  });

  const activeBase = BASES.find((b) => b.radix === base);

  return (
    <div className="nse widget-shell">
      <div className="widget-kicker">Number System Explorer</div>

      <div className="nse-controls">
        <NumberStepper
          value={value}
          onChange={setValue}
          min={0}
          max={MAX}
          label="Decimal value"
        />

        <div className="nse-bases" role="group" aria-label="Number base">
          {BASES.map((b) => (
            <button
              key={b.radix}
              className={b.radix === base ? "active" : ""}
              onClick={() => setBase(b.radix)}
            >
              {b.label}
              <em>{b.tag}</em>
            </button>
          ))}
        </div>
      </div>

      <div className="nse-readout">
        <span className="nse-num">{value}</span>
        <span className="nse-sub">Base-10</span>
        <span className="nse-eq">=</span>
        <span className="nse-num accent">{digits.join("")}</span>
        <span className="nse-sub">{activeBase.tag}</span>
      </div>

      <div className="nse-places" aria-hidden="true">
        {terms.map((t, i) => (
          <div className="nse-place" key={i}>
            <div className="nse-digit">{t.ch}</div>
            <div className="nse-power">
              {base}
              <sup>{t.power}</sup>
            </div>
            <div className="nse-contrib">{t.contribution}</div>
          </div>
        ))}
      </div>

      <div className="nse-expansion">
        {terms.map((t, i) => (
          <span key={i}>
            {i > 0 && <em> + </em>}
            {t.digitVal}&times;{base}
            <sup>{t.power}</sup>
          </span>
        ))}
        <em> = </em>
        <strong>{value}</strong>
      </div>
    </div>
  );
};

export default NumberSystemExplorer;
