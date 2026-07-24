// Blog 1 thumbnail: a hand-drawn "director's set" illustrating the blog's core
// metaphors — camera (DSLR), a studio spotlight, and the hero mesh: a wireframe
// cube (the canonical first three.js object). Monochrome line-art on the theme
// background with a single accent on the hero + light, so it flips with
// light/dark and the accent picker. viewBox is 1.91:1 (OG ratio).
const Blog1Thumbnail = ({ className, style }) => (
  <svg
    className={className}
    style={style}
    width="100%"
    viewBox="0 0 680 357"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>A hand-drawn camera filming a wireframe cube under a spotlight</title>
    <desc>
      Monochrome hand-drawn illustration of a 3D scene as a film set: a camera, a
      studio spotlight casting a cone of light, and a wireframe cube, with a
      single accent colour.
    </desc>

    <defs>
      <linearGradient id="spotCone" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="var(--accent)" stopOpacity="0.3" />
        <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
      </linearGradient>
      <radialGradient id="spotGlow">
        <stop offset="0" stopColor="var(--accent)" stopOpacity="0.55" />
        <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* ground plane */}
    <g stroke="var(--color-text-primary)" strokeWidth="1" opacity="0.22">
      <line x1="0" y1="262" x2="680" y2="262" />
      <line x1="70" y1="262" x2="30" y2="357" />
      <line x1="250" y1="262" x2="235" y2="357" />
      <line x1="430" y1="262" x2="470" y2="357" />
      <line x1="610" y1="262" x2="660" y2="357" />
    </g>

    {/* ── studio spotlight (top-centre, well above the cube) ───────────── */}
    <path d="M374 96 L426 96 L460 248 L340 248 Z" fill="url(#spotCone)" />
    <g stroke="var(--color-text-primary)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <line x1="330" y1="34" x2="470" y2="34" />
      <path d="M400 34 L400 50" />
      {/* reflector can */}
      <path d="M386 50 L414 50 L426 96 L374 96 Z" />
      {/* yoke arms */}
      <path d="M388 56 L374 64 M412 56 L426 64" />
      {/* barn doors */}
      <path d="M374 96 L362 112 M426 96 L438 112" />
    </g>
    <ellipse cx="400" cy="96" rx="26" ry="6" fill="none" stroke="var(--color-text-primary)" strokeWidth="2.4" />
    <circle cx="400" cy="93" r="17" fill="url(#spotGlow)" />
    <circle cx="400" cy="93" r="6" fill="var(--accent)" />

    {/* ── hero mesh: wireframe cube (grounded) ────────────────────────── */}
    {/* front + top face tint */}
    <path d="M350 188 L424 188 L424 262 L350 262 Z" fill="var(--accent)" opacity="0.08" />
    <path d="M350 188 L376 168 L450 168 L424 188 Z" fill="var(--accent)" opacity="0.14" />
    {/* hidden edges */}
    <g fill="none" stroke="var(--accent)" strokeWidth="1.6" strokeDasharray="4 5" opacity="0.5" strokeLinecap="round">
      <path d="M350 262 L376 242" />
      <path d="M376 242 L376 168" />
      <path d="M376 242 L450 242" />
    </g>
    {/* visible edges */}
    <g fill="none" stroke="var(--accent)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M350 188 L424 188 L424 262 L350 262 Z" />
      <path d="M350 188 L376 168 L450 168 L424 188" />
      <path d="M450 168 L450 242 L424 262" />
    </g>

    {/* ── camera ──────────────────────────────────────────────────────── */}
    <g
      fill="none"
      stroke="var(--color-text-primary)"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M112 186 L188 182 L190 224 L114 228 Z" />
      <path d="M188 196 L214 188 L216 218 L190 212" />
      <circle cx="150" cy="205" r="11" />
      <path d="M132 178 L134 168 L162 167 L164 177" />
      <path d="M150 228 L150 246" />
      <path d="M150 246 L120 262 M150 246 L150 264 M150 246 L182 262" />
    </g>
    <circle cx="177" cy="196" r="3.5" fill="var(--accent)" />
    <g
      stroke="var(--accent)"
      strokeWidth="1.4"
      strokeDasharray="5 5"
      opacity="0.6"
      fill="none"
    >
      <path d="M214 194 L344 192" />
      <path d="M214 210 L344 248" />
    </g>

    {/* ── labels ──────────────────────────────────────────────────────── */}
    <g
      fontFamily="'Bradley Hand','Segoe Print',Caveat,cursive"
      fill="var(--color-text-secondary)"
      fontSize="15"
    >
      <text x="118" y="286">camera</text>
      <text x="460" y="70">light</text>
      <text x="490" y="214">mesh</text>
    </g>
    <g stroke="var(--color-text-secondary)" strokeWidth="1" opacity="0.7">
      <line x1="458" y1="66" x2="428" y2="82" />
      <line x1="486" y1="210" x2="454" y2="216" />
    </g>

    <text
      x="42"
      y="330"
      fontFamily="'Bradley Hand','Segoe Print',Caveat,cursive"
      fill="var(--color-text-primary)"
      fontSize="26"
    >
      into the 3rd dimension
    </text>
    <text
      x="638"
      y="330"
      textAnchor="end"
      fontFamily="'Fira Code',monospace"
      fill="var(--color-text-secondary)"
      fontSize="13"
    >
      three.js · 01
    </text>
  </svg>
);

export default Blog1Thumbnail;
