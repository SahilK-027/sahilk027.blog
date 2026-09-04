import React, { useState } from "react";
import NumberStepper from "../NumberStepper/NumberStepper";
import "./RegisterBits.scss";

const WIDTHS = [8, 16, 32];

// bits[0] is the MSB (leftmost). Place value of index i is 2^(width-1-i).
const bitsFromValue = (v, w) =>
  Array.from({ length: w }, (_, i) => Number((BigInt(v) >> BigInt(w - 1 - i)) & 1n));

const RegisterBits = () => {
  const [width, setWidth] = useState(32);
  const [value, setValue] = useState(14);

  const max = 2 ** width - 1;
  const bits = bitsFromValue(value, width);

  // How many bits the number actually needs; the rest are padding zeros.
  const needed = value === 0 ? 1 : Math.floor(Math.log2(value)) + 1;
  const padding = width - needed;

  const resize = (w) => {
    setWidth(w);
    setValue((prev) => Math.min(prev, 2 ** w - 1));
  };

  // Group the flat bit list into bytes so a 32-bit register stays readable.
  const bytes = [];
  for (let i = 0; i < bits.length; i += 8) bytes.push(bits.slice(i, i + 8));

  return (
    <div className="rgb widget-shell">
      <div className="widget-kicker">Register Bits</div>

      <div className="rgb-toolbar">
        <NumberStepper
          value={value}
          onChange={(v) => setValue(Math.max(0, Math.min(max, v)))}
          min={0}
          max={max}
          label="Value"
        />
        <div className="rgb-seg" role="group" aria-label="Register width">
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
      </div>

      <div className="rgb-bytes">
        {bytes.map((byte, bi) => (
          <div className="rgb-byte" key={bi}>
            {byte.map((b, i) => {
              const idx = bi * 8 + i;
              const isPad = idx < padding;
              return (
                <span
                  key={i}
                  className={`rgb-cell ${b ? "on" : "off"} ${
                    isPad ? "pad" : ""
                  }`}
                >
                  {b}
                </span>
              );
            })}
          </div>
        ))}
      </div>

      <div className="rgb-readout">
        <div>
          <span className="rgb-label">Decimal</span>
          <span className="rgb-value accent">{value.toLocaleString()}</span>
        </div>
        <div>
          <span className="rgb-label">Bits actually used</span>
          <span className="rgb-value">{needed}</span>
        </div>
        <div>
          <span className="rgb-label">Padding zeros</span>
          <span className="rgb-value">{padding}</span>
        </div>
        <button className="rgb-fill" onClick={() => setValue(max)}>
          Set all bits (MAX = {max.toLocaleString()})
        </button>
      </div>
    </div>
  );
};

export default RegisterBits;
