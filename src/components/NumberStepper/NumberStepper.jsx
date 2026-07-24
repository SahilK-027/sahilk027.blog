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
