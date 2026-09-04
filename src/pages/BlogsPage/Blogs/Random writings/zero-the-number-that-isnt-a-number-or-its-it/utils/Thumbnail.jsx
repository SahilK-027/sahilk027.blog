// Blog 7 thumbnail: the merchant's ledger from the blog's thought experiment.
// Three sacks of grain, then one, then none — and on the last row the tally
// column just stops, because a world without zero has no mark for "none". The
// accent question mark sits in the hole where a 0 belongs. No outer frame: the
// shelves and the divider carry the ledger read, so the elements stay big
// enough to survive card size. viewBox is 1.91:1 (OG ratio).

const ROWS = [
  { y: 116, day: "day 1", sacks: 3 },
  { y: 186, day: "day 2", sacks: 1 },
  { y: 256, day: "day 3", sacks: 0 },
];

const SACK_X = [156, 218, 280];
const TALLY_X = [408, 436, 464];
const DIVIDER_X = 348;

// a tied grain sack, drawn with slightly uneven curves
const Sack = ({ x, y, i }) => (
  <g
    fill="none"
    stroke="var(--color-text-primary)"
    strokeWidth="2.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    transform={`rotate(${i % 2 ? 2 : -2.5} ${x} ${y})`}
  >
    <path
      d={`M${x - 8} ${y - 20} C ${x - 27} ${y - 8}, ${x - 26} ${y + 19},
          ${x} ${y + 20} C ${x + 26} ${y + 19}, ${x + 27} ${y - 8},
          ${x + 8} ${y - 20} Z`}
    />
    <path d={`M${x - 10} ${y - 20} L${x + 10} ${y - 21}`} />
    <path
      d={`M${x - 6} ${y - 21} C ${x - 5} ${y - 29}, ${x + 5} ${y - 29},
          ${x + 6} ${y - 21}`}
      opacity="0.8"
    />
  </g>
);

const Blog7Thumbnail = ({ className, style }) => (
  <svg
    className={className}
    style={style}
    width="100%"
    viewBox="0 0 680 357"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>
      A merchant's ledger with three sacks, one sack, then an empty shelf that
      cannot be written down
    </title>
    <desc>
      Monochrome hand-drawn illustration of an ancient ledger. Day one has three
      grain sacks and three tally marks, day two has one sack and one mark, day
      three has an empty shelf and no mark at all, only a question mark, because
      without zero there is no symbol for none.
    </desc>

    {/* column captions */}
    <g
      fontFamily="'Bradley Hand','Segoe Print',Caveat,cursive"
      fontSize="21"
      fill="var(--color-text-secondary)"
    >
      <text x="218" y="56" textAnchor="middle">
        what I had
      </text>
      <text x="452" y="56" textAnchor="middle">
        what I wrote
      </text>
    </g>

    {/* the only rule on the page: the column divider */}
    <path
      d={`M${DIVIDER_X} 72 C ${DIVIDER_X + 2} 150, ${DIVIDER_X - 1} 230,
          ${DIVIDER_X} 296`}
      fill="none"
      stroke="var(--color-text-primary)"
      strokeWidth="1.8"
      strokeLinecap="round"
      opacity="0.35"
    />

    {ROWS.map(({ y, day, sacks }) => (
      <g key={day}>
        <text
          x="118"
          y={y + 6}
          textAnchor="end"
          fontFamily="'Fira Code',monospace"
          fontSize="15"
          fill="var(--color-text-secondary)"
          opacity="0.75"
        >
          {day}
        </text>

        {/* shelf — dashed and faint once there is nothing left on it */}
        <path
          d={`M132 ${y + 28} C 200 ${y + 26.5}, 262 ${y + 29.5}, 316 ${y + 27.5}`}
          fill="none"
          stroke="var(--color-text-primary)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity={sacks ? 0.5 : 0.28}
          strokeDasharray={sacks ? undefined : "7 8"}
        />

        {SACK_X.slice(0, sacks).map((x, i) => (
          <Sack key={x} x={x} y={y} i={i} />
        ))}

        {/* one tally stroke per sack, hand-struck */}
        {TALLY_X.slice(0, sacks).map((x, i) => (
          <path
            key={x}
            d={`M${x} ${y - 20} C ${x + 2.5} ${y - 4}, ${x - 1.5} ${y + 6}, ${
              x + 2
            } ${y + 22}`}
            fill="none"
            stroke="var(--color-text-primary)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
        ))}
      </g>
    ))}

    {/* the empty store */}
    <text
      x="224"
      y="262"
      textAnchor="middle"
      fontFamily="'Bradley Hand','Segoe Print',Caveat,cursive"
      fontSize="21"
      fill="var(--color-text-secondary)"
      opacity="0.85"
    >
      sold them all
    </text>

    {/* the hole in the ledger, left open on purpose */}
    <text
      x="436"
      y="282"
      textAnchor="middle"
      fontFamily="'Bradley Hand','Segoe Print',Caveat,cursive"
      fontSize="72"
      fill="var(--accent)"
    >
      ?
    </text>

    <text
      x="42"
      y="336"
      fontFamily="'Bradley Hand','Segoe Print',Caveat,cursive"
      fill="var(--color-text-primary)"
      fontSize="27"
    >
      how do you count what isn&rsquo;t there?
    </text>
    <text
      x="640"
      y="336"
      textAnchor="end"
      fontFamily="'Fira Code',monospace"
      fill="var(--color-text-secondary)"
      fontSize="13"
    >
      math · 07
    </text>
  </svg>
);

export default Blog7Thumbnail;
