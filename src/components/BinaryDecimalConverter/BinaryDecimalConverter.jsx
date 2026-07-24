import React, { useState } from "react";
import NumberStepper from "../NumberStepper/NumberStepper";
import "./BinaryDecimalConverter.scss";

const MAX = 1048575;

const clamp = (n) => (Number.isFinite(n) ? Math.max(0, Math.min(MAX, n)) : 0);

const BinaryDecimalConverter = () => {
  const [value, setValue] = useState(25);

  const binary = value.toString(2);

  // Division-remainder steps (decimal -> binary). First remainder is the LSB.
  const steps = [];
  let n = value;
  while (n > 0) {
    steps.push({ n, q: Math.floor(n / 2), r: n % 2 });
    n = Math.floor(n / 2);
  }

  // Place-value expansion (binary -> decimal).
  const bits = binary.split("");
  const terms = bits.map((ch, i) => {
    const power = bits.length - 1 - i;
    return { ch, power, contribution: Number(ch) * 2 ** power };
  });

  const onBinary = (e) => {
    const clean = e.target.value.replace(/[^01]/g, "").slice(0, 20);
    setValue(clean ? clamp(parseInt(clean, 2)) : 0);
  };

  return (
    <div className="bdc widget-shell">
      <div className="widget-kicker">Binary &harr; Decimal Converter</div>

      <div className="bdc-inputs">
        <NumberStepper
          value={value}
          onChange={(v) => setValue(clamp(v))}
          min={0}
          max={MAX}
          label="Decimal"
        />
        <label className="bdc-binfield">
          <span>Binary</span>
          <input
            type="text"
            inputMode="numeric"
            value={binary}
            onChange={onBinary}
          />
        </label>
      </div>

      <div className="bdc-panels">
        <div className="bdc-panel">
          <div className="bdc-panel-title">Decimal &rarr; Binary</div>
          <div className="bdc-steps">
            <div className="bdc-step bdc-head">
              <span>n</span>
              <span>&divide;2</span>
              <span>quotient</span>
              <span>remainder</span>
            </div>
            {steps.length === 0 && (
              <div className="bdc-step">
                <span>0</span>
                <span>&divide;2</span>
                <span>0</span>
                <span className="bdc-rem">
                  0<em>LSB</em>
                </span>
              </div>
            )}
            {steps.map((s, i) => (
              <div className="bdc-step" key={i}>
                <span>{s.n}</span>
                <span>&divide;2</span>
                <span>{s.q}</span>
                <span className="bdc-rem">
                  {s.r}
                  {i === 0 && <em>LSB</em>}
                  {i === steps.length - 1 && steps.length > 1 && <em>MSB</em>}
                </span>
              </div>
            ))}
          </div>
          <p className="bdc-note">
            Read remainders bottom to top:{" "}
            <strong className="accent">{binary}</strong>
          </p>
        </div>

        <div className="bdc-panel">
          <div className="bdc-panel-title">Binary &rarr; Decimal</div>
          <div className="bdc-places">
            {terms.map((t, i) => (
              <div
                className={`bdc-place ${t.ch === "1" ? "set" : ""}`}
                key={i}
              >
                <span className="bdc-bit">{t.ch}</span>
                <span className="bdc-power">
                  2<sup>{t.power}</sup>
                </span>
                <span className="bdc-contrib">{t.contribution}</span>
              </div>
            ))}
          </div>
          <p className="bdc-note">
            Sum of the set bits = <strong className="accent">{value}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BinaryDecimalConverter;
