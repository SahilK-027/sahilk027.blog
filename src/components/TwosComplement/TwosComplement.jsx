import React, { useState } from "react";
import NumberStepper from "../NumberStepper/NumberStepper";
import "./TwosComplement.scss";

const WIDTH = 8;

const toBits = (v) =>
  Array.from({ length: WIDTH }, (_, i) => (v >> (WIDTH - 1 - i)) & 1);

// Interpret an 8-bit pattern as a signed (two's complement) integer.
const signedValue = (bits) => {
  const unsigned = parseInt(bits.join(""), 2);
  return bits[0] === 1 ? unsigned - 2 ** WIDTH : unsigned;
};

const BitRow = ({ bits, label, tone }) => (
  <div className={`twc-stage ${tone || ""}`}>
    <span className="twc-stage-label">{label}</span>
    <div className="twc-row">
      {bits.map((b, i) => (
        <span
          key={i}
          className={`twc-cell ${b ? "on" : "off"} ${i === 0 ? "sign" : ""}`}
        >
          {b}
        </span>
      ))}
    </div>
  </div>
);

const TwosComplement = () => {
  // A positive magnitude; we show how its negative is stored.
  const [n, setN] = useState(5);

  const original = toBits(n);
  const ones = original.map((b) => (b ? 0 : 1));

  // ones' complement + 1, kept inside 8 bits.
  const twosVal = (parseInt(ones.join(""), 2) + 1) & 0xff;
  const twos = toBits(twosVal);

  return (
    <div className="twc widget-shell">
      <div className="widget-kicker">Two&rsquo;s Complement</div>

      <div className="twc-toolbar">
        <NumberStepper
          value={n}
          onChange={setN}
          min={0}
          max={127}
          label="Positive number"
        />
        <p className="twc-hint">
          Storing <strong className="accent">-{n}</strong> in 8 bits: flip the
          bits of {n}, then add 1.
        </p>
      </div>

      <BitRow bits={original} label={`+${n}`} />
      <BitRow bits={ones} label="Flip all bits (1's complement)" />
      <BitRow bits={twos} label="Add 1 (2's complement)" tone="result" />

      <div className="twc-readout">
        <span>
          Read back as signed:{" "}
          <strong className="accent mono">{twos.join("")}</strong> ={" "}
          <strong className="accent">{signedValue(twos)}</strong>
        </span>
        <span className="twc-note">
          The leftmost bit is the sign bit: 1 means negative.
        </span>
      </div>
    </div>
  );
};

export default TwosComplement;
