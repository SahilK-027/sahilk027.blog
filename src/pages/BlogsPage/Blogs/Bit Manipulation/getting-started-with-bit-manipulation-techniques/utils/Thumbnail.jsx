// Blog 2 thumbnail: a hand-drawn row of bit "bulbs" (transistor switches) spelling
// out 10011 = 25, echoing the blog's ON/OFF binary metaphor and the BitSwitches
// widget. Monochrome line-art with a single accent on the lit bulbs, so it flips
// with light/dark and the accent picker. viewBox is 1.91:1 (OG ratio).
const BULBS = [
  { x: 152, on: 1 },
  { x: 246, on: 0 },
  { x: 340, on: 0 },
  { x: 434, on: 1 },
  { x: 528, on: 1 },
];

const Blog2Thumbnail = ({ className, style }) => (
  <svg
    className={className}
    style={style}
    width="100%"
    viewBox="0 0 680 357"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>A hand-drawn row of bit bulbs spelling the binary number 10011 (25)</title>
    <desc>
      Monochrome hand-drawn illustration of five light bulbs used as binary
      switches, three lit and two dark, reading 10011 which equals 25.
    </desc>

    {/* ground plane */}
    <g stroke="var(--color-text-primary)" strokeWidth="1" opacity="0.22">
      <line x1="0" y1="262" x2="680" y2="262" />
      <line x1="70" y1="262" x2="30" y2="357" />
      <line x1="250" y1="262" x2="235" y2="357" />
      <line x1="430" y1="262" x2="470" y2="357" />
      <line x1="610" y1="262" x2="660" y2="357" />
    </g>

    {/* socket board the bulbs sit on */}
    <line
      x1="118"
      y1="206"
      x2="562"
      y2="206"
      stroke="var(--color-text-primary)"
      strokeWidth="2.4"
      strokeLinecap="round"
      opacity="0.6"
    />

    {BULBS.map(({ x, on }) => {
      const stroke = on ? "var(--accent)" : "var(--color-text-primary)";
      return (
        <g key={x}>
          {on === 1 && (
            <>
              <circle cx={x} cy="150" r="40" fill="var(--accent)" opacity="0.12" />
              <g stroke="var(--accent)" strokeWidth="1.4" opacity="0.5" strokeLinecap="round">
                <line x1={x} y1="96" x2={x} y2="106" />
                <line x1={x - 38} y1="126" x2={x - 30} y2="130" />
                <line x1={x + 38} y1="126" x2={x + 30} y2="130" />
              </g>
            </>
          )}
          {/* glass */}
          <circle
            cx={x}
            cy="150"
            r="26"
            fill={on ? "var(--accent)" : "none"}
            fillOpacity={on ? 0.14 : 0}
            stroke={stroke}
            strokeWidth="2.4"
          />
          {/* filament */}
          <path
            d={`M${x - 9} 150 L${x - 4} 142 L${x + 1} 158 L${x + 6} 142 L${x + 10} 150`}
            fill="none"
            stroke={stroke}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* screw base */}
          <g
            fill="none"
            stroke="var(--color-text-primary)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={`M${x - 14} 176 L${x + 14} 176 L${x + 11} 198 L${x - 11} 198 Z`} />
            <path d={`M${x - 13} 184 L${x + 13} 184 M${x - 12} 191 L${x + 12} 191`} />
            <line x1={x} y1="198" x2={x} y2="206" />
          </g>
          {/* bit value */}
          <text
            x={x}
            y="244"
            textAnchor="middle"
            fontFamily="'Fira Code',monospace"
            fontSize="22"
            fill={on ? "var(--accent)" : "var(--color-text-secondary)"}
          >
            {on}
          </text>
        </g>
      );
    })}

    {/* decimal readout */}
    <text
      x="596"
      y="244"
      textAnchor="middle"
      fontFamily="'Fira Code',monospace"
      fontSize="20"
      fill="var(--color-text-primary)"
    >
      = 25
    </text>

    {/* hand-drawn on / off callouts */}
    <g
      fontFamily="'Bradley Hand','Segoe Print',Caveat,cursive"
      fill="var(--color-text-secondary)"
      fontSize="15"
    >
      <text x="128" y="88">on</text>
      <text x="228" y="82">off</text>
    </g>
    <g stroke="var(--color-text-secondary)" strokeWidth="1" opacity="0.7">
      <line x1="140" y1="94" x2="150" y2="116" />
      <line x1="240" y1="88" x2="246" y2="116" />
    </g>

    <text
      x="42"
      y="330"
      fontFamily="'Bradley Hand','Segoe Print',Caveat,cursive"
      fill="var(--color-text-primary)"
      fontSize="26"
    >
      getting started with bits
    </text>
    <text
      x="638"
      y="330"
      textAnchor="end"
      fontFamily="'Fira Code',monospace"
      fill="var(--color-text-secondary)"
      fontSize="13"
    >
      cs · 02
    </text>
  </svg>
);

export default Blog2Thumbnail;
