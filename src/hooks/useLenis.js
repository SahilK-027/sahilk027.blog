import { useEffect } from "react";
import Lenis from "lenis";

// Module-level singleton so any component (ScrollToTop, TOC) can drive the
// same instance without prop drilling. Null when smooth scroll is disabled
// (touch devices / reduced motion) — callers must fall back to native APIs.
let lenis = null;

export const getLenis = () => lenis;

export const scrollToTop = (immediate = true) => {
  if (lenis) lenis.scrollTo(0, { immediate });
  else window.scrollTo(0, 0);
};

export const scrollToTarget = (target, offset = -90) => {
  if (lenis) {
    lenis.scrollTo(target, { offset });
    return;
  }
  const node =
    typeof target === "string" ? document.querySelector(target) : target;
  if (node?.getBoundingClientRect) {
    window.scrollTo({
      top: window.scrollY + node.getBoundingClientRect().top + offset,
      behavior: "smooth",
    });
  }
};

/**
 * Mount once at the app root. Skips smooth scroll entirely on touch devices
 * (native momentum scrolling is already smooth; syncing it causes jank) and
 * for users preferring reduced motion.
 */
export const useLenis = () => {
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const touchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (reducedMotion || touchDevice) return undefined;

    lenis = new Lenis({
      autoRaf: true,
      // Silky, Locomotive-like feel: a longer glide with an exponential
      // ease-out so momentum decays into the bounds instead of stopping hard
      // at the very top / bottom.
      duration: 1.4,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // expo out
      smoothWheel: true,
      wheelMultiplier: 0.9, // slightly lighter wheel so the glide reads longer
      lerp: 0.075, // low lerp = more inertia / smoother catch-up
      // Let native scroll win only inside elements that explicitly opt out with
      // data-lenis-prevent. We deliberately do NOT list the code editor here:
      // fully excluding it from Lenis meant scrolling over a short pane (or past
      // its top/bottom) left the page stuck, because the wheel never reached Lenis.
      // Instead CodeSandpack does an edge-aware handoff (a wheel listener that only
      // consumes the event while the pane can still scroll that way, otherwise lets
      // it bubble here). The preview pane also keeps Lenis; its scroll-guard overlay
      // handles the iframe swallowing wheel events.
      prevent: (node) => node?.closest?.("[data-lenis-prevent]") != null,
    });
    return () => {
      lenis?.destroy();
      lenis = null;
    };
  }, []);
};
