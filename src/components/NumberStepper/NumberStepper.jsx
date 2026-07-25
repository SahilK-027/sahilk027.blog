import React from "react";
import "./NumberStepper.scss";

// Styled -/+ numeric control shared by the interactive bit widgets.
const NumberStepper = ({
  value,
  onChange,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  step = 1,
  label,
}) => {
  const set = (v) => onChange(Math.max(min, Math.min(max, v)));

  // Size the field by the widest value it can hold (10 digits at a 32-bit max),
  // not by the current one, so stepping never jitters the layout.
  const digits = Math.max(
    String(max).length,
    String(min).length,
    String(value).length
  );

  return (
    <div className="stepper">
      {label && <span className="stepper-label">{label}</span>}
      <div className="stepper-box">
        <button
          type="button"
          onClick={() => set(value - step)}
          disabled={value <= min}
          aria-label="Decrease"
        >
          <i className="fa-solid fa-minus" aria-hidden="true" />
        </button>
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          style={{ width: `calc(${digits}ch + 16px)` }}
          onChange={(e) => set(parseInt(e.target.value, 10) || 0)}
        />
        <button
          type="button"
          onClick={() => set(value + step)}
          disabled={value >= max}
          aria-label="Increase"
        >
          <i className="fa-solid fa-plus" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default NumberStepper;
