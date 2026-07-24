// Blog 4 thumbnail: a hand-drawn UV unwrap — the crux of "introduction to
// textures". A flat 2D UV net (the unfolded cube cross) folds up into a 3D box,
// showing how a flat image maps onto a mesh via UV coordinates. Monochrome
// flat line-art, single accent on the mapped front face + fold arrow, so it
// flips with light/dark and the accent picker. No gradients. viewBox is 1.91:1
// (OG ratio).
const S = 52;

// unfolded cube net (the classic cross): [x, y, isFront]
const NET = [
  { x: 122, y: 98, front: false }, // top
  { x: 70, y: 150, front: false }, // left
  { x: 122, y: 150, front: true }, // front (the mapped face)
  { x: 174, y: 150, front: false }, // right
  { x: 226, y: 150, front: false }, // back
  { x: 122, y: 202, front: false }, // bottom
];

const Blog4Thumbnail = ({ className, style }) => (
  <svg
    className={className}
    style={style}
    width="100%"
    viewBox="0 0 680 357"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>A hand-drawn UV net folding up into a textured 3D box</title>
    <desc>
      Monochrome hand-drawn illustration of texture mapping: a flat unfolded cube
      net with UV coordinates on one accent face, and a fold arrow leading to the
      assembled 3D box, showing how a 2D image wraps onto a 3D mesh.
    </desc>

    {/* ── flat UV net (unfolded cross) ────────────────────────────────── */}
    {NET.map(({ x, y, front }, i) => (
      <g key={i}>
        <rect
          x={x}
          y={y}
          width={S}
          height={S}
          fill={front ? "var(--accent)" : "var(--color-text-primary)"}
          fillOpacity={front ? 0.12 : 0.03}
          stroke={front ? "var(--accent)" : "var(--color-text-primary)"}
          strokeWidth={front ? "2.6" : "2.2"}
        />
        {/* texel grid inside each face */}
        <g
          stroke={front ? "var(--accent)" : "var(--color-text-primary)"}
          strokeWidth="1"
          opacity={front ? 0.4 : 0.22}
        >
          <line x1={x + S / 2} y1={y} x2={x + S / 2} y2={y + S} />
          <line x1={x} y1={y + S / 2} x2={x + S} y2={y + S / 2} />
        </g>
      </g>
    ))}

    {/* UV coordinate markers on the mapped front face */}
    <g fontFamily="'Fira Code',monospace" fontSize="10" fill="var(--accent)">
      <text x="126" y="198">0,0</text>
      <text x="222" y="161" textAnchor="end">1,1</text>
    </g>
    <circle cx="122" cy="202" r="2.6" fill="var(--accent)" />
    <circle cx="226" cy="150" r="2.6" fill="var(--accent)" />

    <text
      x="174"
      y="278"
      textAnchor="middle"
      fontFamily="'Bradley Hand','Segoe Print',Caveat,cursive"
      fill="var(--color-text-secondary)"
      fontSize="16"
    >
      UV map
    </text>

    {/* ── fold arrow: flat net -> 3D mesh ─────────────────────────────── */}
    <path
      d="M300 176 C 360 150, 410 168, 452 200"
      fill="none"
      stroke="var(--accent)"
      strokeWidth="2.4"
      strokeDasharray="6 5"
      strokeLinecap="round"
    />
    <path
      d="M444 190 L453 201 L440 205"
      fill="none"
      stroke="var(--accent)"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <text
      x="372"
      y="150"
      textAnchor="middle"
      fontFamily="'Bradley Hand','Segoe Print',Caveat,cursive"
      fill="var(--color-text-secondary)"
      fontSize="15"
    >
      fold up
    </text>

    {/* ── assembled 3D box (isometric), front face carries the texture ── */}
    {/* face tints */}
    <path d="M478 190 L552 190 L552 264 L478 264 Z" fill="var(--accent)" opacity="0.12" />
    <path d="M478 190 L504 170 L578 170 L552 190 Z" fill="var(--accent)" opacity="0.18" />
    <path d="M552 190 L578 170 L578 244 L552 264 Z" fill="var(--accent)" opacity="0.07" />

    {/* front-face texel grid (echoes the UV net) */}
    <g stroke="var(--accent)" strokeWidth="1" opacity="0.4">
      <line x1="515" y1="190" x2="515" y2="264" />
      <line x1="478" y1="227" x2="552" y2="227" />
    </g>

    {/* box edges */}
    <g
      fill="none"
      stroke="var(--color-text-primary)"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M478 190 L552 190 L552 264 L478 264 Z" />
      <path d="M478 190 L504 170 L578 170 L552 190" />
      <path d="M578 170 L578 244 L552 264" />
    </g>

    <text
      x="528"
      y="290"
      textAnchor="middle"
      fontFamily="'Bradley Hand','Segoe Print',Caveat,cursive"
      fill="var(--color-text-secondary)"
      fontSize="16"
    >
      textured mesh
    </text>

    {/* ── titles ──────────────────────────────────────────────────────── */}
    <text
      x="42"
      y="332"
      fontFamily="'Bradley Hand','Segoe Print',Caveat,cursive"
      fill="var(--color-text-primary)"
      fontSize="26"
    >
      wrapping pixels onto a mesh
    </text>
    <text
      x="638"
      y="332"
      textAnchor="end"
      fontFamily="'Fira Code',monospace"
      fill="var(--color-text-secondary)"
      fontSize="13"
    >
      three.js · 04
    </text>
  </svg>
);

export default Blog4Thumbnail;
