// Scroll helpers. The site used to run Lenis (JS-driven smooth scroll); it was
// removed because re-animating the browser's scroll fights long-form reading:
// trackpad input arrives with the OS's own momentum and got a second smoothing
// pass on top, the scrollbar lagged the content, and every scrollable pane
// needed a bespoke wheel handoff to escape it. Native scroll is what readers
// expect, so these are thin wrappers over the platform.

export const scrollToTop = (immediate = true) => {
  window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
};

export const scrollToTarget = (target, offset = -90) => {
  const node =
    typeof target === "string" ? document.querySelector(target) : target;
  if (!node?.getBoundingClientRect) return;
  window.scrollTo({
    top: window.scrollY + node.getBoundingClientRect().top + offset,
    behavior: "smooth",
  });
};
