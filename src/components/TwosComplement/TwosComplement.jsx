import React, { useState } from "react";
import NumberStepper from "../NumberStepper/NumberStepper";
import "./TwosComplement.scss";

const WIDTH = 8;
const PLACES = [128, 64, 32, 16, 8, 4, 2, 1];

const toBits = (v) =>
  Array.from({ length: WIDTH }, (_, i) => (v >> (WIDTH - 1 - i)) & 1);

const toVal = (bits) => parseInt(bits.join(""), 2);

// Interpret an 8-bit pattern as a signed (two's complement) integer.
const signedValue = (bits) => {
  const unsigned = toVal(bits);
  return bits[0] === 1 ? unsigned - 2 ** WIDTH : unsigned;
};

// One line of the calculation. Laid out like arithmetic on paper: the operator
// on the left, the bits in the middle, what the row is worth on the right.
const Line = ({ op, bits, note, tone, changed, rule }) => (
  <div className={`twc-line ${tone || ""}`}>
    <span className="twc-op mono">{op}</span>
    <div className={`twc-bits ${rule ? "ruled" : ""}`}>
      {bits.map((b, i) => (
        <span
          key={i}
          className={[
            "twc-cell",
            b ? "on" : "off",
            i === WIDTH / 2 ? "nib" : "",
            changed?.[i] ? "chg" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {b}
        </span>
      ))}
    </div>
    <span className="twc-note">{note}</span>
  </div>
);

const TwosComplement = () => {
  // A positive magnitude; we show how its negative gets stored.
  const [n, setN] = useState(5);

  const original = toBits(n);
  const ones = original.map((b) => (b ? 0 : 1));
  const onesVal = toVal(ones);

  const twosVal = (onesVal + 1) & 0xff;
  const twos = toBits(twosVal);

  // Which bits the "+1" actually moved: the carry rippling through the
  // trailing ones, which is the step the memorised recipe hides.
  const carried = twos.map((b, i) => b !== ones[i]);

  return (
    <div className="twc widget-shell">
      <div className="widget-kicker">Two&rsquo;s Complement</div>

      <div className="twc-toolbar">
        <NumberStepper
          value={n}
          onChange={setN}
          min={1}
          max={127}
          label="Pick a number"
        />
        <p className="twc-lead">
          Below is how the machine builds <strong>-{n}</strong> out of{" "}
          <strong>+{n}</strong>, one line at a time. Change the number and watch
          which bits move.
        </p>
      </div>

      <div className="twc-sheet">
        <div className="twc-line twc-header">
          <span className="twc-op" />
          <div className="twc-bits">
            {PLACES.map((p, i) => (
              <span
                key={p}
                className={`twc-place ${i === WIDTH / 2 ? "nib" : ""}`}
              >
                {p}
              </span>
            ))}
          </div>
          <span className="twc-note">place value</span>
        </div>

        <Line op={`${n}`} bits={original} note={`+${n} in binary`} />
        <Line
          op="flip"
          bits={ones}
          note={`every 0 became 1 = ${onesVal}`}
          tone="muted"
        />
        <Line
          op="+ 1"
          bits={toBits(1)}
          note="now add one"
          tone="addend"
          rule
        />
        <Line
          op={`= ${signedValue(twos)}`}
          bits={twos}
          changed={carried}
          note={`${twosVal} as unsigned, ${signedValue(twos)} as signed`}
          tone="result"
        />
      </div>

      {carried.some(Boolean) && (
        <p className="twc-legend">
          <span className="twc-legend-swatch" aria-hidden="true" />
          {carried.filter(Boolean).length === 1
            ? "The dot marks the one bit the +1 changed."
            : `The dots mark the ${
                carried.filter(Boolean).length
              } bits the +1 changed: the carry rippled through the trailing 1s and stopped at the first 0.`}
        </p>
      )}

      <div className="twc-readout">
        <p className="twc-check">
          <span className="twc-check-tag">Why it works</span>
          The same pattern is 2<sup>8</sup> &minus; {n} = {twosVal}, the
          distance from {n} back around to zero. So on a plain adder,{" "}
          <strong className="mono">
            {n} + {twosVal} = {n + twosVal}
          </strong>
          , the carry falls off the left edge, and the register is left holding
          0. That is exactly what &minus;{n} is supposed to do.
        </p>
      </div>
    </div>
  );
};

export default TwosComplement;
