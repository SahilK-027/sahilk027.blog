// Blog 3 thumbnail: a hand-drawn mechanical "register odometer" caught mid-roll.
// Eight binary reels are flipping 0111 1111 -> 1000 0000, the exact moment
// 127 + 1 overflows an 8-bit signed integer and lands on -128. A carry ripples
// right-to-left and the final carry falls off the left edge (lost), while the
// sign bit lights up in accent. Captures the blog's spine: numbers live in a
// fixed-size register, and arithmetic just rolls the reels over. Monochrome
// line-art, single accent on the sign bit + carry, so it flips with light/dark
// and the accent picker. viewBox is 1.91:1 (OG ratio).
const CELL_W = 58;
const GAP = 6;
const START_X = 87;
const TOP = 106;
const BOT = 246;
const MID = (TOP + BOT) / 2;

// settled value (1000 0000 = -128) and the value rolling out above it (0111 1111 = 127)
const BITS = [1, 0, 0, 0, 0, 0, 0, 0];
const PREV = [0, 1, 1, 1, 1, 1, 1, 1];

const cellX = (i) => START_X + i * (CELL_W + GAP);
const centerX = (i) => cellX(i) + CELL_W / 2;

const Blog3Thumbnail = ({ className, style }) => (
  <svg
    className={className}
    style={style}
    width="100%"
    viewBox="0 0 680 357"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>
      A hand-drawn 8-bit register odometer rolling over from 127 to -128
    </title>
    <desc>
      Monochrome hand-drawn illustration of eight mechanical binary reels flipping
      from 0111 1111 to 1000 0000, with a carry rippling off the left edge, showing
      that adding one to 127 overflows an 8-bit signed integer to -128.
    </desc>

    {/* ── the eight reels ─────────────────────────────────────────────── */}
    {BITS.map((bit, i) => {
      const sign = i === 0;
      const stroke = sign ? "var(--accent)" : "var(--color-text-primary)";
      const x = cellX(i);
      const cx = centerX(i);
      return (
        <g key={i}>
          {/* reel housing */}
          <rect
            x={x}
            y={TOP}
            width={CELL_W}
            height={BOT - TOP}
            rx="9"
            fill={sign ? "var(--accent)" : "var(--color-text-primary)"}
            fillOpacity={sign ? 0.1 : 0.03}
            stroke={stroke}
            strokeWidth={sign ? "2.8" : "2.2"}
          />
          {/* value rolling out, above the read line */}
          <text
            x={cx}
            y={MID - 40}
            textAnchor="middle"
            fontFamily="'Fira Code',monospace"
            fontSize="34"
            fill="var(--color-text-primary)"
            opacity="0.16"
          >
            {PREV[i]}
          </text>
          {/* settled value on the read line */}
          <text
            x={cx}
            y={MID + 13}
            textAnchor="middle"
            fontFamily="'Fira Code',monospace"
            fontSize="40"
            fontWeight="600"
            fill={sign ? "var(--accent)" : "var(--color-text-primary)"}
          >
            {bit}
          </text>
        </g>
      );
    })}

    {/* read line across all reels */}
    <line
      x1={START_X - 6}
      y1={MID}
      x2={cellX(7) + CELL_W + 6}
      y2={MID}
      stroke="var(--accent)"
      strokeWidth="1.4"
      strokeDasharray="2 5"
      opacity="0.5"
    />

    {/* ── carry ripple travelling right -> left across the top ────────── */}
    <g
      stroke="var(--accent)"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.85"
    >
      <path
        d={`M${centerX(7)} 92 L${centerX(1)} 92`}
        strokeDasharray="6 5"
      />
      {/* little carry hops into each flipping reel */}
      {[6, 5, 4, 3, 2, 1].map((i) => (
        <path key={i} d={`M${centerX(i)} 92 L${centerX(i)} ${TOP - 2}`} />
      ))}
    </g>

    {/* final carry falling off the left edge = overflow, lost */}
    <path
      d={`M${centerX(1)} 92 C ${centerX(0)} 84, ${cellX(0) - 14} 70, ${
        cellX(0) - 34
      } 58`}
      fill="none"
      stroke="var(--accent)"
      strokeWidth="2.6"
      strokeLinecap="round"
    />
    <path
      d={`M${cellX(0) - 26} 54 L${cellX(0) - 34} 58 L${cellX(0) - 30} 68`}
      fill="none"
      stroke="var(--accent)"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <text
      x={cellX(0) - 40}
      y="46"
      textAnchor="middle"
      fontFamily="'Fira Code',monospace"
      fontSize="20"
      fill="var(--accent)"
    >
      1
    </text>
    <text
      x={cellX(0) - 30}
      y="86"
      textAnchor="middle"
      fontFamily="'Bradley Hand','Segoe Print',Caveat,cursive"
      fontSize="15"
      fill="var(--color-text-secondary)"
    >
      carry lost
    </text>

    {/* ── sign-bit callout ────────────────────────────────────────────── */}
    <text
      x={centerX(0)}
      y={BOT + 24}
      textAnchor="middle"
      fontFamily="'Bradley Hand','Segoe Print',Caveat,cursive"
      fontSize="15"
      fill="var(--accent)"
    >
      sign bit
    </text>
    <line
      x1={centerX(0)}
      y1={BOT + 2}
      x2={centerX(0)}
      y2={BOT + 11}
      stroke="var(--accent)"
      strokeWidth="1.2"
      opacity="0.7"
    />

    {/* ── the punchline equation ──────────────────────────────────────── */}
    <text
      x={cellX(7) + CELL_W}
      y={BOT + 26}
      textAnchor="end"
      fontFamily="'Fira Code',monospace"
      fontSize="20"
      fill="var(--color-text-primary)"
    >
      127 + 1 ={" "}
      <tspan fill="var(--accent)" fontWeight="600">
        -128
      </tspan>
    </text>

    {/* ── titles ──────────────────────────────────────────────────────── */}
    <text
      x="42"
      y="332"
      fontFamily="'Bradley Hand','Segoe Print',Caveat,cursive"
      fill="var(--color-text-primary)"
      fontSize="26"
    >
      when a byte runs out of room
    </text>
    <text
      x="638"
      y="332"
      textAnchor="end"
      fontFamily="'Fira Code',monospace"
      fill="var(--color-text-secondary)"
      fontSize="13"
    >
      cs · 03
    </text>
  </svg>
);

export default Blog3Thumbnail;
