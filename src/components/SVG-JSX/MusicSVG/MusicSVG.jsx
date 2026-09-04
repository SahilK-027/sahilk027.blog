import React, { useEffect, useRef } from "react";
import "./MusicSVG.scss";

// Resting wave silhouette (per-bar vertical scale) and each bar's dance cadence.
const REST = [0.34, 0.62, 0.8, 0.62, 0.34];
const DANCE = [
  { dur: 780, delay: -200 },
  { dur: 1050, delay: -50 },
  { dur: 660, delay: -350 },
  { dur: 950, delay: -150 },
  { dur: 820, delay: -280 },
];

/**
 * Music toggle — a five-bar visualizer driven by the Web Animations API. Bars
 * dance while playing; on stop the current frame is captured and tweened back
 * to the resting wave (a removed CSS animation fires no transition, so we do
 * the settle explicitly).
 */
const MusicSVG = ({ controlMusic, isMusicPlaying }) => {
  const barsRef = useRef([]);
  const animsRef = useRef([]);
  const wasPlaying = useRef(false);

  useEffect(() => {
    const bars = barsRef.current.filter(Boolean);
    if (!bars.length) return undefined;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isMusicPlaying && !reduced) {
      animsRef.current.forEach((a) => a && a.cancel());
      animsRef.current = bars.map((bar, i) =>
        bar.animate(
          [
            { transform: "scaleY(0.28)" },
            { transform: "scaleY(0.92)" },
            { transform: "scaleY(0.28)" },
          ],
          {
            duration: DANCE[i].dur,
            delay: DANCE[i].delay,
            iterations: Infinity,
            easing: "ease-in-out",
          }
        )
      );
    } else if (wasPlaying.current) {
      // Settle: freeze the current animated frame, then tween it to rest.
      bars.forEach((bar, i) => {
        const current = getComputedStyle(bar).transform;
        const anim = animsRef.current[i];
        if (anim) anim.cancel();
        bar.animate(
          [
            { transform: current === "none" ? "scaleY(1)" : current },
            { transform: `scaleY(${REST[i]})` },
          ],
          { duration: 480, easing: "ease-out" }
        );
      });
      animsRef.current = [];
    }

    wasPlaying.current = isMusicPlaying;
    return undefined;
  }, [isMusicPlaying]);

  return (
    <div
      className={`music-icon-container ${
        isMusicPlaying ? "play-animation" : ""
      }`}
      onClick={controlMusic}
      role="button"
      tabIndex={0}
      aria-label={isMusicPlaying ? "Pause music" : "Play music"}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          controlMusic();
        }
      }}
    >
      <div className="music-viz" aria-hidden="true">
        {REST.map((_, i) => (
          <span key={i} ref={(el) => (barsRef.current[i] = el)}></span>
        ))}
      </div>
    </div>
  );
};

export default MusicSVG;
