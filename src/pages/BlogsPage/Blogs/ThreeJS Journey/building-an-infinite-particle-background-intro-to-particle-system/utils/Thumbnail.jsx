// Blog 5 thumbnail: a hand-drawn particle field wired to its data. The crux of
// a particle system is that a cloud of points is nothing but a flat position
// buffer (a Float32Array of x,y,z triplets) drawn as points. One hero particle
// is traced back to its triplet in the buffer to make that link explicit.
// Monochrome flat line-art, single accent on the hero point + its triplet, so it
// flips with light/dark and the accent picker. No gradients. viewBox is 1.91:1.
const HERO = { x: 250, y: 116 };

// deterministic scatter so the field is stable across renders
const hash = (n) => {
  const s = Math.sin(n * 127.1) * 43758.5453;
  return s - Math.floor(s);
};
const PARTICLES = Array.from({ length: 52 }, (_, i) => ({
  cx: 60 + hash(i * 2.1 + 1) * 588,
  cy: 32 + hash(i * 3.7 + 2) * 188,
  r: 1.3 + hash(i * 5.3 + 3) * 3.1,
  accent: hash(i * 9.1 + 4) > 0.66,
  opacity: 0.35 + hash(i * 6.7 + 5) * 0.5,
}));

const Blog5Thumbnail = ({ className, style }) => (
  <svg
    className={className}
    style={style}
    width="100%"
    viewBox="0 0 680 357"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>
      A hand-drawn particle cloud traced back to its position buffer
    </title>
    <desc>
      Monochrome hand-drawn illustration of a particle system: a scattered field
      of points, with one accent point connected by a dashed line to its x, y, z
      triplet inside a flat position buffer array.
    </desc>

    {/* ── particle field ──────────────────────────────────────────────── */}
    {PARTICLES.map(({ cx, cy, r, accent, opacity }, i) => (
      <circle
        key={i}
        cx={cx}
        cy={cy}
        r={r}
        fill={accent ? "var(--accent)" : "var(--color-text-primary)"}
        opacity={opacity}
      />
    ))}

    {/* ── hero particle (the one we trace) ────────────────────────────── */}
    <circle cx={HERO.x} cy={HERO.y} r="16" fill="var(--accent)" opacity="0.12" />
    <circle
      cx={HERO.x}
      cy={HERO.y}
      r="5.5"
      fill="var(--accent)"
      stroke="var(--color-text-primary)"
      strokeWidth="1.2"
    />

    {/* connector: hero point -> its triplet in the buffer */}
    <path
      d={`M${HERO.x} ${HERO.y + 12} C 210 190, 150 210, 118 236`}
      fill="none"
      stroke="var(--accent)"
      strokeWidth="1.6"
      strokeDasharray="5 5"
      opacity="0.8"
    />
    <text
      x="196"
      y="182"
      textAnchor="middle"
      fontFamily="'Bradley Hand','Segoe Print',Caveat,cursive"
      fill="var(--color-text-secondary)"
      fontSize="15"
    >
      1 point
    </text>

    {/* ── position buffer ─────────────────────────────────────────────── */}
    <rect
      x="60"
      y="240"
      width="384"
      height="40"
      rx="8"
      fill="var(--color-text-primary)"
      fillOpacity="0.03"
      stroke="var(--color-text-primary)"
      strokeWidth="2"
    />
    <text
      x="74"
      y="266"
      fontFamily="'Fira Code',monospace"
      fontSize="15"
      fill="var(--color-text-primary)"
    >
      [{" "}
      <tspan fill="var(--accent)" fontWeight="600">
        0.42, 1.15, -0.83
      </tspan>
      , 0.10, -0.55, 0.92, …&nbsp;]
    </text>
    <text
      x="62"
      y="300"
      fontFamily="'Fira Code',monospace"
      fontSize="12"
      fill="var(--color-text-secondary)"
    >
      position buffer · 1 triplet (x, y, z) = 1 particle
    </text>

    {/* ── titles ──────────────────────────────────────────────────────── */}
    <text
      x="42"
      y="332"
      fontFamily="'Bradley Hand','Segoe Print',Caveat,cursive"
      fill="var(--color-text-primary)"
      fontSize="26"
    >
      a background built from points
    </text>
    <text
      x="638"
      y="332"
      textAnchor="end"
      fontFamily="'Fira Code',monospace"
      fill="var(--color-text-secondary)"
      fontSize="13"
    >
      three.js · 05
    </text>
  </svg>
);

export default Blog5Thumbnail;
