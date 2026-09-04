// Thumbnail for "How does a computer store -1": the question, not the answer.
// You type a minus sign. Memory is a fixed row of cells that hold nothing but
// 0 and 1. So where does the minus go? The wheel and two's complement are the
// payoff inside the post, so the poster only sets up the puzzle. Hand-drawn
// line-art, accent on the minus and the question. viewBox is 1.91:1 (OG ratio).

const CELL_W = 34;
const CELL_GAP = 3;
const CELL_X0 = 372;
const CELL_TOP = 96;
const CELL_H = 48;
const BITS = ["1", "0", "1", "1", "0", "1", "0", "0"];

const BitsThumbnail = ({ className, style }) => (
  <svg
    className={className}
    style={style}
    width="100%"
    viewBox="0 0 680 357"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>
      You type minus one, but memory only holds zeros and ones, so where does
      the minus go?
    </title>
    <desc>
      Hand-drawn illustration posing the question the post answers. On the left,
      the line of code int x = -1 with the minus sign circled. On the right, a
      row of memory cells holding only zeros and ones. An arrow with a question
      mark runs from the minus to the cells, because there is nowhere in them to
      write it.
    </desc>

    {/* what you write */}
    <g fontFamily="'Fira Code',monospace" fontSize="30">
      <text x="52" y="122" fill="var(--color-text-primary)">
        int x =
      </text>
      <text x="206" y="122" fill="var(--accent)" fontWeight="600">
        -
      </text>
      <text x="244" y="122" fill="var(--color-text-primary)">
        1;
      </text>
    </g>

    {/* the minus, circled by hand with an overshoot tail. The gap in the code
        above is there so the loop only ever encloses the sign. */}
    <g
      fill="none"
      stroke="var(--accent)"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M220 84 C 202 85, 193 97, 194 112 C 195 128, 205 137, 218 136
           C 231 135, 239 123, 238 108 C 237 94, 228 85, 216 85
           C 210 85, 205 87, 202 91"
        strokeWidth="2.6"
      />
    </g>

    <text
      x="52"
      y="170"
      fontFamily="'Bradley Hand','Segoe Print',Caveat,cursive"
      fontSize="20"
      fill="var(--color-text-secondary)"
    >
      you write this
    </text>

    {/* what the machine has: a fixed row of cells, 0 or 1, nothing else */}
    <text
      x={CELL_X0 + (BITS.length * (CELL_W + CELL_GAP)) / 2}
      y="76"
      textAnchor="middle"
      fontFamily="'Bradley Hand','Segoe Print',Caveat,cursive"
      fontSize="20"
      fill="var(--color-text-secondary)"
    >
      the computer understands this
    </text>

    {BITS.map((b, i) => {
      const x = CELL_X0 + i * (CELL_W + CELL_GAP);
      const r = x + CELL_W;
      const bot = CELL_TOP + CELL_H;
      return (
        <g key={i}>
          <path
            d={`M${x + (i % 2 ? 1 : 0)} ${CELL_TOP + 1} L${r} ${CELL_TOP - 1}
                L${r - 1} ${bot} L${x - 1} ${bot - 1.2} Z`}
            fill="none"
            stroke="var(--color-text-primary)"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            opacity="0.7"
          />
          <text
            x={x + CELL_W / 2}
            y={CELL_TOP + 34}
            textAnchor="middle"
            fontFamily="'Fira Code',monospace"
            fontSize="22"
            fill="var(--color-text-primary)"
          >
            {b}
          </text>
        </g>
      );
    })}

    <text
      x={CELL_X0 + (BITS.length * (CELL_W + CELL_GAP)) / 2}
      y="176"
      textAnchor="middle"
      fontFamily="'Bradley Hand','Segoe Print',Caveat,cursive"
      fontSize="19"
      fill="var(--color-text-secondary)"
    >
      0 or 1. no third option.
    </text>

    {/* the minus leaves the code looking for somewhere to live, and the arrow
        lands on the cells it cannot fit into */}
    <g
      fill="none"
      stroke="var(--accent)"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M228 150 C 276 212, 348 208, 394 168" strokeDasharray="9 8" />
      <path d="M387 184 L396 166 L378 172" />
    </g>

    {/* the question, sitting on the arrow where it gives up */}
    <text
      x="300"
      y="192"
      textAnchor="middle"
      fontFamily="'Bradley Hand','Segoe Print',Caveat,cursive"
      fontSize="62"
      fill="var(--accent)"
    >
      ?
    </text>

    <text
      x="340"
      y="292"
      textAnchor="middle"
      fontFamily="'Bradley Hand','Segoe Print',Caveat,cursive"
      fontSize="30"
      fill="var(--color-text-primary)"
    >
      so where does the minus go?
    </text>

    <text
      x="640"
      y="330"
      textAnchor="end"
      fontFamily="'Fira Code',monospace"
      fill="var(--color-text-secondary)"
      fontSize="13"
    >
      bits · 02
    </text>
  </svg>
);

export default BitsThumbnail;
