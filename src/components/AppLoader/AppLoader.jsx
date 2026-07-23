import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { GLYPH_PATHS } from "../../data/glyphPaths";
import { getLenis } from "../../hooks/useLenis";
import "./AppLoader.scss";

const RAMP = 2600; // ms — time to light all six glyphs left to right
const FADE = 450; // ms — keep in sync with .app-loader transition

/**
 * Fullscreen boot splash. The hero's wireframe glyph family sits in a row, gray
 * on black. Load progress lights them left to right in the active accent — one
 * primitive per sixth. Progress eases toward ~90% on a timer, then snaps to
 * 100% and releases on window load. No arc, no chrome — just the glyphs filling.
 */
const AppLoader = () => {
  const [phase, setPhase] = useState("shown"); // shown -> fading -> gone
  const [progress, setProgress] = useState(0);
  const loadedRef = useRef(false);

  // Lock page scroll while shown; release the moment we start fading so the
  // native scrollbar comes back with the app (not one fade later, on unmount).
  // The scroll container is <html>; the repo ships an .no-scroll helper.
  useLayoutEffect(() => {
    const locked = phase === "shown";
    document.documentElement.classList.toggle("no-scroll", locked);
    if (!locked) getLenis()?.start();
    return () => document.documentElement.classList.remove("no-scroll");
  }, [phase]);

  useEffect(() => {
    const shownAt = performance.now();
    let goneTimer = 0;
    let raf = 0;

    // Linear time ramp: each glyph lights at an even ~RAMP/6 interval, so the
    // fill reads as a deliberate sequence regardless of how fast the bundle
    // loads. We only start fading once the ramp completes AND the page loaded.
    const tick = () => {
      // Lenis drives scroll programmatically, so overflow:hidden alone doesn't
      // stop it. Keep it stopped every frame in case it inits after we mount.
      getLenis()?.stop();

      const pct = Math.min(100, ((performance.now() - shownAt) / RAMP) * 100);
      setProgress(pct);

      if (pct >= 100 && loadedRef.current) {
        getLenis()?.start(); // hand scroll back to the app
        setPhase("fading");
        goneTimer = setTimeout(() => setPhase("gone"), FADE);
        return; // stop the loop
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const markLoaded = () => {
      loadedRef.current = true;
    };
    if (document.readyState === "complete") markLoaded();
    else window.addEventListener("load", markLoaded, { once: true });

    return () => {
      window.removeEventListener("load", markLoaded);
      clearTimeout(goneTimer);
      cancelAnimationFrame(raf);
      getLenis()?.start();
    };
  }, []);

  if (phase === "gone") return null;

  const lit = (progress / 100) * GLYPH_PATHS.length; // how many glyphs are on

  return (
    <div
      className={`app-loader ${phase === "fading" ? "app-loader--fading" : ""}`}
      role="status"
      aria-label="Loading"
    >
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
