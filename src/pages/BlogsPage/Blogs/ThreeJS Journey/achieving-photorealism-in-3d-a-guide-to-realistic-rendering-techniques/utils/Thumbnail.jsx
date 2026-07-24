// Blog 6 thumbnail: a hand-drawn take on the crux of web photorealism — image
// based lighting. A plain sphere looks real because an environment map (HDRI)
// lights it and reflects in it; a soft contact shadow grounds it. The same little
// scene (horizon + sun) that sits in the env strip is mirrored inside the sphere,
// making the "the world is the light" idea explicit. Monochrome flat line-art,
// single accent on the light/reflection, so it flips with light/dark and the
// accent picker. viewBox is 1.91:1 (OG ratio).
const CX = 502;
const CY = 162;
const R = 74;

const Blog6Thumbnail = ({ className, style }) => (
  <svg
    className={className}
    style={style}
    width="100%"
    viewBox="0 0 680 357"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>
      A hand-drawn reflective sphere lit by an environment map, with a soft shadow
    </title>
    <desc>
      Monochrome hand-drawn illustration of image based lighting: an HDRI
      environment strip whose horizon and sun are mirrored inside a reflective
      sphere, which casts a soft contact shadow, showing how the surrounding scene
      becomes the light.
    </desc>

    <defs>
      <clipPath id="sphereClip">
        <circle cx={CX} cy={CY} r={R} />
      </clipPath>
    </defs>

    {/* ── environment map strip (HDRI) ────────────────────────────────── */}
    <rect
      x="48"
      y="70"
      width="244"
      height="92"
      rx="8"
      fill="var(--color-text-primary)"
      fillOpacity="0.03"
      stroke="var(--color-text-primary)"
      strokeWidth="2"
    />
    {/* sky / ground tint split at the horizon */}
    <rect x="52" y="74" width="236" height="52" fill="var(--accent)" opacity="0.05" />
    <rect x="52" y="126" width="236" height="32" fill="var(--color-text-primary)" opacity="0.04" />
    <line x1="52" y1="126" x2="288" y2="126" stroke="var(--color-text-primary)" strokeWidth="1.4" opacity="0.5" />
    {/* sun */}
    <circle cx="110" cy="104" r="9" fill="var(--accent)" />
    <g stroke="var(--accent)" strokeWidth="1.3" opacity="0.7" strokeLinecap="round">
      <line x1="110" y1="88" x2="110" y2="82" />
      <line x1="92" y1="104" x2="86" y2="104" />
      <line x1="97" y1="91" x2="93" y2="87" />
      <line x1="123" y1="91" x2="127" y2="87" />
    </g>
    {/* hills */}
    <g fill="var(--color-text-primary)" opacity="0.28">
      <path d="M94 126 L120 104 L148 126 Z" />
      <path d="M150 126 L186 100 L222 126 Z" />
    </g>
    <text
      x="170"
      y="182"
      textAnchor="middle"
      fontFamily="'Bradley Hand','Segoe Print',Caveat,cursive"
      fill="var(--color-text-secondary)"
      fontSize="16"
    >
      environment map
    </text>

    {/* wrap arrow: env -> reflects onto sphere */}
    <path
      d="M298 112 C 348 104, 392 118, 428 150"
      fill="none"
      stroke="var(--accent)"
      strokeWidth="2.2"
      strokeDasharray="6 5"
      strokeLinecap="round"
    />
    <path
      d="M420 140 L429 151 L416 155"
      fill="none"
      stroke="var(--accent)"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <text
      x="366"
      y="100"
      textAnchor="middle"
      fontFamily="'Bradley Hand','Segoe Print',Caveat,cursive"
      fill="var(--color-text-secondary)"
      fontSize="15"
    >
      becomes the light
    </text>

    {/* ── contact shadow (grounds the sphere) ─────────────────────────── */}
    <ellipse cx={CX} cy="250" rx="60" ry="11" fill="var(--color-text-primary)" opacity="0.16" />

    {/* ── reflective sphere: the env scene mirrored inside ────────────── */}
    <g clipPath="url(#sphereClip)">
      <rect x={CX - R} y={CY - R} width={R * 2} height={R * 2} fill="var(--accent)" opacity="0.05" />
      {/* reflected ground */}
      <rect x={CX - R} y={CY + 12} width={R * 2} height={R} fill="var(--color-text-primary)" opacity="0.06" />
      {/* reflected horizon (curved by the sphere) */}
      <path
        d={`M${CX - R} ${CY + 14} Q ${CX} ${CY + 26} ${CX + R} ${CY + 14}`}
        fill="none"
        stroke="var(--color-text-primary)"
        strokeWidth="1.4"
        opacity="0.45"
      />
      {/* reflected hills */}
      <g fill="var(--color-text-primary)" opacity="0.2">
        <path d="M452 172 L474 150 L500 172 Z" />
        <path d="M498 172 L524 146 L552 172 Z" />
      </g>
      {/* reflected sun */}
      <circle cx="470" cy="134" r="8" fill="var(--accent)" />
      {/* mirrored glint below horizon */}
      <ellipse cx="470" cy="196" rx="6" ry="14" fill="var(--accent)" opacity="0.3" />
    </g>
    {/* sphere outline */}
    <circle cx={CX} cy={CY} r={R} fill="none" stroke="var(--color-text-primary)" strokeWidth="3" />
    {/* specular highlight on the rim */}
    <path
      d={`M${CX - 44} ${CY - 40} A ${R} ${R} 0 0 1 ${CX - 16} ${CY - 66}`}
      fill="none"
      stroke="var(--accent)"
      strokeWidth="3"
      strokeLinecap="round"
      opacity="0.8"
    />

    {/* callouts */}
    <text
      x="596"
      y="128"
      textAnchor="end"
      fontFamily="'Bradley Hand','Segoe Print',Caveat,cursive"
      fill="var(--color-text-secondary)"
      fontSize="15"
    >
      reflection
    </text>
    <line x1="600" y1="124" x2="474" y2="134" stroke="var(--color-text-secondary)" strokeWidth="1" opacity="0.6" />
    <text
      x="596"
      y="250"
      textAnchor="start"
      fontFamily="'Bradley Hand','Segoe Print',Caveat,cursive"
      fill="var(--color-text-secondary)"
      fontSize="15"
    >
      soft shadow
    </text>
    <line x1="592" y1="248" x2="558" y2="250" stroke="var(--color-text-secondary)" strokeWidth="1" opacity="0.6" />

    {/* ── titles ──────────────────────────────────────────────────────── */}
    <text
      x="42"
      y="332"
      fontFamily="'Bradley Hand','Segoe Print',Caveat,cursive"
      fill="var(--color-text-primary)"
      fontSize="26"
    >
      lighting a scene with a 360° photo
    </text>
    <text
      x="638"
      y="332"
      textAnchor="end"
      fontFamily="'Fira Code',monospace"
      fill="var(--color-text-secondary)"
      fontSize="13"
    >
      three.js · 06
    </text>
  </svg>
);

export default Blog6Thumbnail;
