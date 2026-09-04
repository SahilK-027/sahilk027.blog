// Fig 2.0 — positional notation, redrawn as inline SVG so it picks up the
// theme and accent instead of shipping two baked PNGs (2l.png / 2d.png).
// One row of digit cells carries everything: place name above, index and power
// below, value under that, then the sum. Hand-drawn line-art to match the blog
// thumbnails. viewBox stays wide (~2:1) so the figure doesn't tower over the
// paragraph it belongs to.

const DIGITS = [
  { d: "7", place: "thousands", value: "7000", pow: "3" },
  { d: "3", place: "hundreds", value: "300", pow: "2" },
  { d: "2", place: "tens", value: "20", pow: "1" },
  { d: "5", place: "units", value: "5", pow: "0" },
];

const BOX_W = 64;
const BOX_TOP = 44;
const BOX_H = 58;
const BOX_X = [150, 214, 278, 342];
const cx = (i) => BOX_X[i] + BOX_W / 2;

const PositionalFigure = ({ className }) => (
  <svg
    className={className}
    width="100%"
    viewBox="0 0 680 330"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>How positional notation turns the digits 7325 into a value</title>
    <desc>
      The number 7325 drawn as four digit cells labelled thousands, hundreds,
      tens and units, each indexed with a power of ten from 10^3 down to 10^0,
      worth 7000, 300, 20 and 5, summing back to 7325.
    </desc>

    <text
      x="34"
      y="82"
      fontFamily="'Fira Code',monospace"
      fontSize="18"
      fill="var(--color-text-primary)"
    >
      number =
    </text>

    {DIGITS.map(({ d, place, value, pow }, i) => (
      <g key={place}>
        {/* place name */}
        <text
          x={cx(i)}
          y="30"
          textAnchor="middle"
          fontFamily="'Bradley Hand','Segoe Print',Caveat,cursive"
          fontSize="16"
          fill="var(--color-text-secondary)"
        >
          {place}
        </text>

        {/* the digit cell, drawn with a wobbly outline */}
        <path
          d={`M${BOX_X[i] + (i % 2 ? 1.4 : 0)} ${BOX_TOP + 1.2} L${
            BOX_X[i] + BOX_W
          } ${BOX_TOP - 1} L${BOX_X[i] + BOX_W - 1.2} ${BOX_TOP + BOX_H} L${
            BOX_X[i] - 1
          } ${BOX_TOP + BOX_H - 1.4} Z`}
          fill="none"
          stroke="var(--color-text-primary)"
          strokeWidth="2.2"
          strokeLinejoin="round"
          strokeLinecap="round"
          opacity="0.75"
        />
        <text
          x={cx(i)}
          y={BOX_TOP + 42}
          textAnchor="middle"
          fontFamily="'Fira Code',monospace"
          fontSize="30"
          fill="var(--color-text-primary)"
        >
          {d}
        </text>

        {/* index of the place, and what it is worth */}
        <path
          d={`M${cx(i)} ${BOX_TOP + BOX_H + 4} C ${cx(i) + 1.6} ${
            BOX_TOP + BOX_H + 12
          }, ${cx(i) - 1.6} ${BOX_TOP + BOX_H + 18}, ${cx(i)} ${
            BOX_TOP + BOX_H + 24
          }`}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.5"
        />
        <text
          x={cx(i)}
          y="146"
          textAnchor="middle"
          fontFamily="'Fira Code',monospace"
          fontSize="15"
          fill="var(--accent)"
        >
          {d} × 10
          <tspan dy="-6" fontSize="11">
            {pow}
          </tspan>
        </text>
        <text
          x={cx(i)}
          y="170"
          textAnchor="middle"
          fontFamily="'Fira Code',monospace"
          fontSize="15"
          fill="var(--color-text-primary)"
          opacity="0.8"
        >
          {value}
        </text>
      </g>
    ))}

    <text
      x="424"
      y="80"
      fontFamily="'Bradley Hand','Segoe Print',Caveat,cursive"
      fontSize="17"
      fill="var(--accent)"
    >
      radix 10
    </text>

    {/* why the last place is called "units" */}
    <path
      d="M420 142 C 444 138, 462 134, 476 126"
      fill="none"
      stroke="var(--accent)"
      strokeWidth="1.3"
      strokeLinecap="round"
      opacity="0.55"
    />
    <text
      x="482"
      y="126"
      fontFamily="'Fira Code',monospace"
      fontSize="14"
      fill="var(--accent)"
    >
      10
      <tspan dy="-5" fontSize="10">
        0
      </tspan>
      <tspan dy="5"> = 1</tspan>
    </text>
    <text
      x="482"
      y="148"
      fontFamily="'Bradley Hand','Segoe Print',Caveat,cursive"
      fontSize="15"
      fill="var(--color-text-secondary)"
    >
      hence &ldquo;units&rdquo;
    </text>

    {/* add the places back up */}
    <g fontFamily="'Fira Code',monospace" fill="var(--color-text-primary)">
      <text x="34" y="228" fontSize="15">
        number = 7×10
        <tspan dy="-5" fontSize="10">
          3
        </tspan>
        <tspan dy="5"> + 3×10</tspan>
        <tspan dy="-5" fontSize="10">
          2
        </tspan>
        <tspan dy="5"> + 2×10</tspan>
        <tspan dy="-5" fontSize="10">
          1
        </tspan>
        <tspan dy="5"> + 5×10</tspan>
        <tspan dy="-5" fontSize="10">
          0
        </tspan>
      </text>
      <text x="112" y="254" fontSize="15" opacity="0.8">
        = 7000 + 300 + 20 + 5
      </text>
      <text x="112" y="282" fontSize="19" fill="var(--accent)">
        = 7325
      </text>
    </g>

    <text
      x="360"
      y="282"
      fontFamily="'Bradley Hand','Segoe Print',Caveat,cursive"
      fontSize="16"
      fill="var(--color-text-secondary)"
    >
      empty place? that&rsquo;s what 0 is for
    </text>
  </svg>
);

export default PositionalFigure;
