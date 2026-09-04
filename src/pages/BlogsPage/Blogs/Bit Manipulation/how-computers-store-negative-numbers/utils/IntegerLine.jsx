// In-article figure for "every register is a wheel": all 16 patterns of a
// 4-bit register laid out as a signed number line. The two ends are joined by
// the wrap arc, which is the whole point: the line has no ends, so one step
// below 0000 is 1111. Same line-art vocabulary as the poster, so it flips with
// light/dark and the accent picker.

const COUNT = 16;
const X0 = 44; // centre of the leftmost cell
const STEP = 39;
const AXIS_Y = 150;

const cx = (i) => X0 + i * STEP;

const CELLS = Array.from({ length: COUNT }, (_, i) => {
  const signed = i - COUNT / 2; // -8 .. +7, left to right
  const unsigned = signed < 0 ? signed + COUNT : signed;
  return {
    signed,
    binary: unsigned.toString(2).padStart(4, "0"),
    negative: signed < 0,
  };
});

const ZERO_X = cx(COUNT / 2); // 0000
const MINUS_ONE_X = cx(COUNT / 2 - 1); // 1111
const LEFT_X = cx(0);
const RIGHT_X = cx(COUNT - 1);

const IntegerLine = ({ className, style }) => (
  <svg
    className={className}
    style={{ width: "100%", margin: "12px 0", ...style }}
    viewBox="0 14 680 272"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>
      A 4-bit signed number line from -8 to +7, with the ends joined by a wrap
    </title>
    <desc>
      Hand-drawn number line showing all sixteen 4-bit patterns. The left half
      is negative with sign bit 1, the right half is positive with sign bit 0,
      one step left of 0000 is 1111 which is minus one, and a dashed arc joins
      the two ends because adding one past +7 rolls over to -8.
    </desc>

    {/* the ends are the same place: the line is really a loop */}
    <g
      fill="none"
      stroke="var(--color-text-secondary)"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.75"
    >
      <path
        d={`M${RIGHT_X} 118 C ${RIGHT_X + 20} 52, ${LEFT_X - 20} 52, ${LEFT_X} 118`}
        strokeDasharray="8 7"
      />
      <path d={`M${LEFT_X - 8} 104 L${LEFT_X} 120 L${LEFT_X + 9} 106`} />
    </g>
    <text
      x="340"
      y="60"
      textAnchor="middle"
      fontFamily="'Bradley Hand','Segoe Print',Caveat,cursive"
      fontSize="19"
      fill="var(--color-text-secondary)"
    >
      add 1 past +7 and it rolls back to -8
    </text>

    {/* the axis, drawn by hand */}
    <path
      d={`M20 ${AXIS_Y + 1} C 180 ${AXIS_Y - 1}, 340 ${AXIS_Y + 2}, 500 ${AXIS_Y}
          C 570 ${AXIS_Y - 1}, 620 ${AXIS_Y + 1}, 660 ${AXIS_Y}`}
      fill="none"
      stroke="var(--color-text-primary)"
      strokeWidth="2.4"
      strokeLinecap="round"
      opacity="0.6"
    />

    {CELLS.map(({ signed, binary, negative }, i) => {
      const x = cx(i);
      const hot = signed === 0 || signed === -1;
      return (
        <g key={signed}>
          <line
            x1={x}
            y1={AXIS_Y - 8}
            x2={x}
            y2={AXIS_Y + 9}
            stroke={hot ? "var(--accent)" : "var(--color-text-primary)"}
            strokeWidth={hot ? 2.6 : 2}
            strokeLinecap="round"
            opacity={hot ? 1 : 0.5}
          />
          {/* what it reads as */}
          <text
            x={x}
            y={AXIS_Y - 20}
            textAnchor="middle"
            fontFamily="'Fira Code',monospace"
            fontSize="15"
            fontWeight={hot ? "600" : "400"}
            fill={
              hot
                ? "var(--accent)"
                : negative
                ? "var(--color-text-secondary)"
                : "var(--color-text-primary)"
            }
          >
            {signed > 0 ? `+${signed}` : signed}
          </text>
          {/* the bits underneath */}
          <text
            x={x}
            y={AXIS_Y + 30}
            textAnchor="middle"
            fontFamily="'Fira Code',monospace"
            fontSize="12"
            fill={hot ? "var(--accent)" : "var(--color-text-primary)"}
            opacity={hot ? 1 : 0.7}
          >
            {binary}
          </text>
        </g>
      );
    })}

    {/* one step left of zero is all ones */}
    <g
      fill="none"
      stroke="var(--accent)"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d={`M${ZERO_X} 196 C ${ZERO_X - 6} 212, ${MINUS_ONE_X + 6} 212, ${MINUS_ONE_X} 198`}
        strokeDasharray="7 6"
      />
      <path
        d={`M${MINUS_ONE_X + 9} 206 L${MINUS_ONE_X - 1} 195 L${MINUS_ONE_X - 4} 208`}
      />
    </g>
    <text
      x={MINUS_ONE_X - 26}
      y="222"
      textAnchor="end"
      fontFamily="'Bradley Hand','Segoe Print',Caveat,cursive"
      fontSize="19"
      fill="var(--accent)"
    >
      0 minus 1 lands on all ones
    </text>

    {/* the halves, and the bit that decides which one you are in */}
    <g
      fill="none"
      stroke="var(--color-text-secondary)"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.6"
    >
      <path d={`M${LEFT_X} 244 L${LEFT_X} 252 L${MINUS_ONE_X} 252 L${MINUS_ONE_X} 244`} />
      <path d={`M${ZERO_X} 244 L${ZERO_X} 252 L${RIGHT_X} 252 L${RIGHT_X} 244`} />
    </g>
    <g
      textAnchor="middle"
      fontFamily="'Bradley Hand','Segoe Print',Caveat,cursive"
      fontSize="18"
      fill="var(--color-text-secondary)"
    >
      <text x={(LEFT_X + MINUS_ONE_X) / 2} y="274">
        sign bit 1 · negatives
      </text>
      <text x={(ZERO_X + RIGHT_X) / 2} y="274">
        sign bit 0 · positives
      </text>
    </g>
  </svg>
);

export default IntegerLine;
