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

    lenis = new Lenis({ autoRaf: true });
    return () => {
      lenis?.destroy();
      lenis = null;
    };
  }, []);
};
