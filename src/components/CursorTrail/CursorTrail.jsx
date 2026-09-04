import { useEffect, useRef } from "react";
import { GLYPH_PATHS } from "../../data/glyphPaths";
import "./CursorTrail.scss";

const SVG_NS = "http://www.w3.org/2000/svg";
const STEP = 100; // px of cursor travel between sketches
const LIFETIME = 1400; // ms, matches the CSS animation

/**
 * Pencil trail: the cursor sketches tiny wireframe primitives along its
 * path. Each glyph draws itself in, tumbles as it drifts along the direction
 * of travel, then erases stroke-by-stroke from the other end (no plain
 * fade). Fast sweeps sketch bigger, looser shapes; slow moves leave small
 * precise ones. Every 5th glyph is inked in the accent color.
 */
const CursorTrail = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return undefined;
    }
    const container = containerRef.current;
    const last = { x: 1e4, y: 1e4, t: 0 };
    let count = 0;

    const onMove = (e) => {
      const rect = container.getBoundingClientRect();
      if (e.clientY < rect.top || e.clientY > rect.bottom) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const dx = x - last.x;
      const dy = y - last.y;
      const dist = Math.hypot(dx, dy);
      if (dist < STEP) return;
      const dt = Math.max(e.timeStamp - last.t, 1);
      last.x = x;
      last.y = y;
      last.t = e.timeStamp;

      if (container.childElementCount > 12) container.firstChild.remove();

      // Cursor speed (px/ms) scales the sketch: slow = small + tight,
      // fast sweep = bigger + looser.
      const speed = Math.min(dist / dt, 3);
      const size = 16 + speed * 8;
      // Drift continues along the direction of travel, with a little
      // perpendicular scatter so a straight sweep doesn't read as a rail.
      const scatter = (Math.random() - 0.5) * 30;
      const driftX = (dx / dist) * (18 + speed * 14) - (dy / dist) * scatter;
      const driftY = (dy / dist) * (18 + speed * 14) + (dx / dist) * scatter;

      const svg = document.createElementNS(SVG_NS, "svg");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute(
        "class",
        `cursor-trail__glyph${count % 5 === 4 ? " is-accent" : ""}`
      );
      svg.style.left = `${x}px`;
      svg.style.top = `${y}px`;
      svg.style.width = `${size.toFixed(0)}px`;
      svg.style.height = `${size.toFixed(0)}px`;
      svg.style.setProperty("--rot", `${(Math.random() * 80 - 40).toFixed(0)}deg`);
      svg.style.setProperty(
        "--rot-end",
        `${(Math.random() * 220 - 110).toFixed(0)}deg`
      );
      svg.style.setProperty("--dx", `${driftX.toFixed(0)}px`);
      svg.style.setProperty("--dy", `${driftY.toFixed(0)}px`);
      const d = GLYPH_PATHS[count++ % GLYPH_PATHS.length];
      for (const seg of d.split("M").filter(Boolean)) {
        const path = document.createElementNS(SVG_NS, "path");
        path.setAttribute("d", `M${seg}`);
        path.setAttribute("pathLength", "1");
        svg.appendChild(path);
      }
      container.appendChild(svg);
      setTimeout(() => svg.remove(), LIFETIME);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return <div className="cursor-trail" ref={containerRef} aria-hidden="true" />;
};

export default CursorTrail;
