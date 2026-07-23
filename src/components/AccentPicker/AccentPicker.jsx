import "./AccentPicker.scss";
import { accents } from "../../data/accents";
import { GLYPH_PATHS } from "../../data/glyphPaths";
import { useApp } from "../../context/AppContext";

/**
 * Accent picker — each hue is one of the six brand primitives, drawn as a
 * wireframe glyph inked in its color. The active one redraws itself in.
 */
const AccentPicker = () => {
  const { accent, setAccent } = useApp();

  return (
    <div className="accent-picker" aria-label="Accent color">
      {accents.map((a, i) => (
        <button
          key={a.name}
          title={a.label}
          aria-label={`Accent: ${a.label}`}
          aria-pressed={accent === a.name}
          className={`accent-swatch ${accent === a.name ? "active" : ""}`}
          style={{ "--swatch": `hsl(${a.h} ${a.s}% ${a.l}%)` }}
          onClick={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            setAccent(a.name, {
              x: r.left + r.width / 2,
              y: r.top + r.height / 2,
            });
          }}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            {GLYPH_PATHS[i % GLYPH_PATHS.length]
              .split("M")
              .filter(Boolean)
              .map((seg, j) => (
                <path key={j} d={`M${seg}`} pathLength="1" />
              ))}
          </svg>
        </button>
      ))}
    </div>
  );
};

export default AccentPicker;
