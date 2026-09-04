import React, { useState } from "react";
import "./IntegerCycle.scss";

// 4-bit keeps the whole range on screen (16 values). The same behaviour is
// exactly what a 32-bit register does, just with a lot more numbers.
const BITS = 4;
const COUNT = 2 ** BITS; // 16
const HALF = COUNT / 2; // 8
const MIN = -HALF; // -8
const MAX = HALF - 1; // 7

// Number line in signed order: -8, -7, ... 0 ... 6, 7.
const line = Array.from({ length: COUNT }, (_, i) => {
  const signed = MIN + i;
  const unsigned = signed < 0 ? signed + COUNT : signed;
  return {
    signed,
    unsigned,
    binary: unsigned.toString(2).padStart(BITS, "0"),
    negative: signed < 0,
  };
});

const IntegerCycle = () => {
  const [value, setValue] = useState(0);
  const current = line.find((n) => n.signed === value);

  // Step along the line; past the max it overflows back to the min.
  const step = (d) => {
    let next = value + d;
    if (next > MAX) next = MIN;
    if (next < MIN) next = MAX;
    setValue(next);
  };

  const atMax = value === MAX;
  const atMin = value === MIN;

  return (
    <div className="icy widget-shell">
      <div className="widget-kicker">Signed Integer Number Line</div>

      <div className="icy-readout">
        <span className="icy-r-binary mono">{current.binary}</span>
        <span className="icy-r-item">
          <em>unsigned</em>
          <strong>{current.unsigned}</strong>
        </span>
        <span className="icy-r-item">
          <em>signed</em>
          <strong className="accent">{current.signed}</strong>
        </span>
        <span className="icy-r-item">
          <em>sign bit (MSB)</em>
          <strong>{current.binary[0]}</strong>
        </span>
      </div>

      <div className="icy-track-wrap">
        <div className="icy-track">
          {line.map((n) => (
            <button
              key={n.signed}
              className={`icy-cell ${n.negative ? "neg" : "pos"} ${
                n.signed === value ? "active" : ""
              }`}
              onClick={() => setValue(n.signed)}
              aria-label={`signed ${n.signed}, binary ${n.binary}`}
            >
              <span className="icy-cell-num">{n.signed}</span>
              <span className="icy-cell-bin">{n.binary}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="icy-controls">
        <button onClick={() => step(-1)}>&minus; 1</button>
        <button onClick={() => step(1)}>+ 1</button>
      </div>

      <div className={`icy-caption ${atMax || atMin ? "hot" : ""}`}>
        {atMax ? (
          <>
            You&rsquo;re at the largest value (+{MAX}), sign bit still 0. Add 1
            and it can&rsquo;t go higher, so it rolls over to{" "}
            <strong className="accent">{MIN}</strong> and the sign bit flips to
            1. That overflow is why{" "}
            <strong className="accent">INT_MAX + 1 == INT_MIN</strong>.
          </>
        ) : atMin ? (
          <>
            You&rsquo;re at the smallest value ({MIN}). Subtract 1 and it rolls
            the other way, back to <strong className="accent">+{MAX}</strong>.
          </>
        ) : (
          <>
            Left half (sign bit 1) is negative, right half (sign bit 0) is
            positive, meeting at 0. Step with +1 / -1 and reach either end to
            see what overflow does.
          </>
        )}
      </div>
    </div>
  );
};

export default IntegerCycle;
