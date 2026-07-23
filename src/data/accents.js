// Accent presets. Each is HSL channels; light theme lowers lightness globally
// in global.scss, so a single lightness here is enough.
// `name` is the stable slug (cookies, data-accent); `label` is the display
// name shown in pickers.
export const accents = [
  { name: "violet", label: "Ultraviolet", h: 258, s: 88, l: 66 },
  { name: "electric-blue", label: "Electric Blue", h: 212, s: 95, l: 60 },
  { name: "orange", label: "Solar Flare", h: 26, s: 90, l: 58 },
  { name: "green", label: "Matrix Green", h: 152, s: 65, l: 48 },
  { name: "red", label: "Signal Red", h: 4, s: 82, l: 60 },
  { name: "pink", label: "Neon Pink", h: 330, s: 85, l: 62 },
];

export const DEFAULT_ACCENT = "violet";

export const getAccent = (name) =>
  accents.find((a) => a.name === name) || accents[0];

// Apply accent by setting HSL channel vars on <html>. Also mirrored by the
// pre-paint script in index.html (keep both in sync).
export const applyAccent = (name) => {
  const a = getAccent(name);
  const root = document.documentElement;
  root.style.setProperty("--accent-h", String(a.h));
  root.style.setProperty("--accent-s", a.s + "%");
  root.style.setProperty("--accent-base-l", a.l + "%");
  root.dataset.accent = a.name;
};
