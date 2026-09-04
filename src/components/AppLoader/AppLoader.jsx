import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { GLYPH_PATHS } from "../../data/glyphPaths";
import { markAppReady } from "../../hooks/appReady";
import logo from "../../assets/images/logo.webp";
import logoBlack from "../../assets/images/logoForBlackBg.webp";
import logoWhite from "../../assets/images/logoForWhiteBg.webp";
import "./AppLoader.scss";

const REVEAL = 900; // ms — full slat-shutter reveal; keep in sync with SCSS
// ms into the reveal at which deferred landing motion is released. Both ends of
// the range are wrong, for the same reason from opposite sides. At REVEAL
// (where this used to sit) the shutter clears onto a still page and the hero's
// spawn only begins once the eye has settled on it — a beat of dead white. At 0
// the spawn plays out behind solid slats: it lands ~160ms in and the splash is
// spent by ~400ms, so the shutter opens on the aftermath.
//
// Just past halfway. The deliberate part is what this HIDES: the first few
// frames of the spawn are a tight over-compressed knot, which is the one pose
// in the whole animation that looks like a trick rather than like fluid. Those
// frames play behind the slats, and what emerges through the opening shutter is
// already a falling, spreading mass.
const READY_AT = 400;
const MIN_VISIBLE = 300; // ms — floor so an instant load doesn't flash the splash
const EASE = 6; // higher = snappier catch-up of the shown bar to real progress
const SLATS = GLYPH_PATHS.length; // shutter panels — one per glyph

// Warmup assets: logos the landing paints on first view (navbar/footer).
// Decoding them here means they're hot in cache the moment the loader releases.
const WARMUP = [logo, logoBlack, logoWhite];

// Heavy chunks the landing needs but that load lazily. Kicking the import off
// during the splash pulls the download into the loader window so the hero is
// ready — or nearly — when we release. Must resolve to the SAME module the
// page lazy-loads so this warms the cache instead of duplicating the fetch.
const WARMUP_CHUNKS = [
  () => import("../../components/PhysicsHero/PhysicsHero"),
];

/**
 * Fullscreen boot splash. The hero's wireframe glyph family sits in a row, gray
 * on black. The bar reflects REAL load progress — warmup images decoding plus
 * the window `load` event — easing toward the live target each frame, then
 * snapping to 100% and releasing. Shown only while actually loading (min 300ms
 * to avoid a flash). No fixed timer. On release the black panel splits into
 * vertical slats that lift away in a stagger (a geometric shutter, one slat per
 * glyph), revealing the page. `markAppReady` fires PART WAY THROUGH that lift
 * (see READY_AT), so the hero's spawn is already under way behind the slats and
 * the page is in motion by the time they clear.
 */
const AppLoader = () => {
  const [phase, setPhase] = useState("shown"); // shown -> revealing -> gone
  const [progress, setProgress] = useState(0); // eased bar the user sees
  const targetRef = useRef(0); // live fraction of real work done (0..1)

  // Lock page scroll while shown; release the moment we start fading so the
  // native scrollbar comes back with the app (not one fade later, on unmount).
  // The scroll container is <html>; the repo ships an .no-scroll helper.
  useLayoutEffect(() => {
    document.documentElement.classList.toggle("no-scroll", phase === "shown");
    return () => document.documentElement.classList.remove("no-scroll");
  }, [phase]);

  useEffect(() => {
    const shownAt = performance.now();
    let goneTimer = 0;
    let readyTimer = 0;
    let raf = 0;

    // Real work: warmup images to decode + lazy landing chunks to fetch + the
    // window `load` event. Each unit that completes bumps the live target; the
    // bar eases toward it every frame.
    const totalUnits = WARMUP.length + WARMUP_CHUNKS.length + 1;
    let doneUnits = 0;
    const bump = () => {
      doneUnits += 1;
      targetRef.current = doneUnits / totalUnits;
    };

    // Fetch each lazy landing chunk. Count once regardless of outcome so a
    // failed import never wedges the bar; the page's own lazy() retries later.
    WARMUP_CHUNKS.forEach((load) => load().then(bump, bump));

    // Warm the logo cache. Count each image once, success or failure, so a
    // missing asset never wedges the loader below 100%.
    WARMUP.forEach((src) => {
      const img = new Image();
      const once = () => bump();
      img.onload = once;
      img.onerror = once;
      img.src = src;
      // Already cached (complete) images may skip onload entirely.
      if (img.complete) bump();
    });

    const markLoaded = () => bump();
    if (document.readyState === "complete") markLoaded();
    else window.addEventListener("load", markLoaded, { once: true });

    let shown = 0; // eased 0..1
    let last = shownAt;
    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05); // clamp big gaps
      last = now;
      // Exponential ease so the bar chases real progress smoothly, no timer.
      shown += (targetRef.current - shown) * (1 - Math.exp(-EASE * dt));
      if (targetRef.current >= 1 && shown > 0.995) shown = 1;
      setProgress(shown * 100);

      const elapsed = now - shownAt;
      if (shown >= 1 && elapsed >= MIN_VISIBLE) {
        setPhase("revealing"); // slats lift away
        // Released DURING the reveal (see READY_AT), not after it. The motion
        // this gates is the hero's spawn, which is over in about a second —
        // comparable to the reveal itself — so where in the reveal it starts
        // decides which half of it the user actually gets to see.
        readyTimer = setTimeout(markAppReady, READY_AT);
        goneTimer = setTimeout(() => setPhase("gone"), REVEAL);
        return; // stop the loop
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("load", markLoaded);
      clearTimeout(goneTimer);
      clearTimeout(readyTimer);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (phase === "gone") return null;

  const lit = (progress / 100) * GLYPH_PATHS.length; // how many glyphs are on

  return (
    <div
      className={`app-loader ${
        phase === "revealing" ? "app-loader--revealing" : ""
      }`}
      role="status"
      aria-label="Loading"
    >
      {/* Black shutter: side-by-side slats read as one panel, then lift away
          in a stagger on reveal. One slat per glyph. */}
      <div className="app-loader__slats" aria-hidden="true">
        {Array.from({ length: SLATS }).map((_, i) => (
          <span key={i} className="app-loader__slat" style={{ "--i": i }} />
        ))}
      </div>
      <div className="app-loader__row">
        {GLYPH_PATHS.map((d, i) => (
          <svg
            key={i}
            className={`app-loader__glyph ${
              i < lit ? "app-loader__glyph--on" : ""
            }`}
            style={{ "--hue": i * 60 }}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {d.split("M")
              .filter(Boolean)
              .map((seg, j) => (
                <path key={j} d={`M${seg}`} />
              ))}
          </svg>
        ))}
      </div>
    </div>
  );
};

export default AppLoader;
