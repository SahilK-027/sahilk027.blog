// Blog 7 thumbnail: a big bold zero as the hero, doodled around with the
// equations it quietly holds up (limits, Euler's identity, trig, derivatives,
// integrals, roots, indeterminate forms). The 0 is a real serif numeral so it
// reads as a character, not an egg. Monochrome flat line-art, single accent on
// the 0 and every literal zero, so it flips with light/dark and the accent
// picker. No gradients, no shadows. viewBox is 1.91:1 (OG ratio).

// a floating formula (chalk-faint, slightly rotated for a doodle feel)
const F = ({ x, y, size = 18, rot = 0, opacity = 0.7, children }) => (
  <text
    x={x}
    y={y}
    transform={rot ? `rotate(${rot} ${x} ${y})` : undefined}
    fontFamily="'Fira Code',monospace"
    fontSize={size}
    fill="var(--color-text-primary)"
    opacity={opacity}
  >
    {children}
  </text>
);

// an accent literal zero inside a formula
const Z = ({ children = "0" }) => (
  <tspan fill="var(--accent)" fontWeight="600" opacity="1">
    {children}
  </tspan>
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
      A hand-drawn bold zero surrounded by the equations it underpins
    </title>
    <desc>
      Monochrome illustration of zero as the foundation of math: a bold accent
      zero numeral surrounded by floating equations including limits, Euler's
      identity, trig identities, a derivative, an integral, a root, and
      indeterminate forms.
    </desc>

    {/* the hero: a real serif 0, stretched taller for a tall numeral look */}
    <text
      x="340"
      y="250"
      textAnchor="middle"
      transform="matrix(1 0 0 1.24 0 -62)"
      fontFamily="Georgia, 'Times New Roman', serif"
      fontWeight="700"
      fontSize="232"
      fill="var(--accent)"
    >
      0
    </text>

    {/* ── formulas doodled around the zero ────────────────────────────── */}
    {/* top row: wraps over the 0 */}
    <F x="150" y="52" size={19} rot={-4}>
      e
      <tspan dy="-8" fontSize="13">
        iπ
      </tspan>
      <tspan dy="8"> + 1 = </tspan>
      <Z />
    </F>
    <F x="316" y="64" size={16} rot={3} opacity={0.6}>
      <Z />/<Z /> = ?
    </F>
    <F x="456" y="50" size={16} rot={3}>
      cos <Z /> = 1
    </F>

    {/* left */}
    <F x="70" y="98" size={21} rot={-6}>
      lim h→<Z />
    </F>
    <F x="56" y="146" size={15} rot={4} opacity={0.62}>
      sin <Z /> = <Z />
    </F>
    <F x="80" y="192" size={18} rot={3}>
      1 ÷ <Z /> = ?
    </F>
    <F x="60" y="236" size={14} rot={-5} opacity={0.6}>
      √<Z /> = <Z />
    </F>
    <F x="104" y="278" size={16} rot={-2}>
      x + <Z /> = x
    </F>

    {/* right */}
    <F x="490" y="98" size={23} rot={4}>
      dy/dx
    </F>
    <F x="504" y="142" size={15} rot={-3} opacity={0.62}>
      ∞·<Z /> = ?
    </F>
    <F x="498" y="186" size={18} rot={-2}>
      ∫ f dx
    </F>
    <F x="474" y="230" size={20} rot={3}>
      f(x) = <Z />
    </F>
    <F x="502" y="272" size={14} rot={2} opacity={0.6}>
      log <Z /> = -∞
    </F>

    {/* bottom centre, clear of the title */}
    <F x="268" y="308" size={16} rot={-2} opacity={0.62}>
      n
      <tspan dy="-7" fontSize="11">
        <Z />
      </tspan>
      <tspan dy="7"> = 1</tspan>
    </F>
    <F x="410" y="314" size={15} rot={3}>
      <Z>0!</Z> = 1
    </F>

    {/* ── titles ──────────────────────────────────────────────────────── */}
    <text
      x="42"
      y="338"
      fontFamily="'Bradley Hand','Segoe Print',Caveat,cursive"
      fill="var(--color-text-primary)"
      fontSize="24"
    >
      the zero beneath all math
    </text>
    <text
      x="640"
      y="338"
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
