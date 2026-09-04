import React, { useState } from "react";
import "./BitSwitches.scss";

const WIDTHS = [4, 8, 16];

// bits[0] is the MSB (leftmost). Place value of index i is 2^(width-1-i).
const bitsFromValue = (v, w) =>
  Array.from({ length: w }, (_, i) => (v >> (w - 1 - i)) & 1);

const BitSwitches = () => {
  const [width, setWidth] = useState(8);
  const [value, setValue] = useState(0);

  const max = 2 ** width - 1;
  const bits = bitsFromValue(value, width);

  const resize = (w) => {
    setWidth(w);
    setValue((prev) => Math.min(prev, 2 ** w - 1));
  };

  const toggle = (i) => setValue((v) => v ^ (1 << (width - 1 - i)));

  return (
    <div className="bsw widget-shell">
      <div className="widget-kicker">Bit Switches</div>

      <div className="bsw-toolbar">
        <div className="bsw-seg" role="group" aria-label="Bit width">
          {WIDTHS.map((w) => (
            <button
              key={w}
              className={w === width ? "active" : ""}
              onClick={() => resize(w)}
            >
              {w}-bit
            </button>
          ))}
        </div>
        <div className="bsw-quick">
          <button onClick={() => setValue(max)}>All ON</button>
          <button onClick={() => setValue(0)}>Clear</button>
        </div>
      </div>

      <div className="bsw-row">
        {bits.map((b, i) => {
          const power = width - 1 - i;
          return (
            <button
              key={i}
              className={`bsw-switch ${b ? "on" : "off"} ${
                i % 4 === 0 && i !== 0 ? "nibble" : ""
              }`}
              onClick={() => toggle(i)}
              aria-pressed={b === 1}
              aria-label={`Bit 2^${power}, ${b ? "on" : "off"}`}
            >
              <span className="bsw-bulb" />
              <span className="bsw-bit">{b}</span>
              <span className="bsw-power">
                2<sup>{power}</sup>
              </span>
            </button>
          );
        })}
      </div>

      <div className="bsw-readout">
        <div>
          <span className="bsw-label">Decimal</span>
          <span className="bsw-value accent">{value}</span>
        </div>
        <div>
          <span className="bsw-label">Binary</span>
          <span className="bsw-value mono">{bits.join("")}</span>
        </div>
        <div>
          <span className="bsw-label">Unique states</span>
          <span className="bsw-value">
            2<sup>{width}</sup> = {(2 ** width).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BitSwitches;
