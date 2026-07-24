import { useEffect, useState } from "react";
import "./QuoteShare.scss";

const MAX_QUOTE = 220; // leave room for quotes + URL inside a tweet

/**
 * "Highlight to tweet". Watches for text selections inside `containerRef`
 * (the blog body) and floats a small tweet button above the selection. Clicking
 * opens X's intent composer pre-filled with the quoted passage + page URL.
 */
const QuoteShare = ({ containerRef }) => {
  const [popup, setPopup] = useState(null); // { top, left, text } | null

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return undefined;

    const clear = () => setPopup(null);
    // Don't dismiss when the click lands on the bubble itself — otherwise the
    // popup unmounts before the anchor's click fires and Twitter never opens.
    const clearIfOutside = (e) => {
      if (!e.target?.closest?.(".quote-share")) setPopup(null);
    };

    // Current selection's viewport rect, or null if not a valid in-article
    // selection. Read fresh each time so scroll can re-anchor the bubble.
    const currentRect = () => {
      const sel = window.getSelection();
      const text = sel?.toString().trim();
      if (!text || text.length < 8 || sel.rangeCount === 0) return null;

      // Containment via the range's common ancestor — more reliable than
      // anchor/focus nodes, which the browser sometimes reports outside the
      // range after a drag select.
      const range = sel.getRangeAt(0);
      let node = range.commonAncestorContainer;
      if (node.nodeType === Node.TEXT_NODE) node = node.parentNode;
      if (!container.contains(node)) return null;

      // Whole-range bounding box — robust for multi-line / multi-block
      // selections where per-line client rects can be zero-width.
      const rect = range.getBoundingClientRect();
      if (!rect || (rect.width === 0 && rect.height === 0)) return null;
      return { rect, text };
    };

    // Fixed-position (viewport coords). Sit above the selection, but flip
    // below when there isn't room (e.g. selection near the top / navbar).
    const place = ({ rect, text }) => {
      const MIN_TOP = 70; // clear the fixed navbar
      const above = rect.top - 46;
      const below = above < MIN_TOP;
      const left = Math.min(
        Math.max(rect.left + rect.width / 2, 90),
        window.innerWidth - 90
      );
      setPopup({ top: below ? rect.bottom + 10 : above, left, below, text });
    };

    const onSelection = () => {
      const found = currentRect();
      if (!found) return clear();
      place(found);
    };

    // Re-anchor to the selection on scroll instead of clearing — the bubble
    // tracks the text. rAF-throttled so Lenis's frequent scroll events are cheap.
    let rafId = null;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const found = currentRect();
        if (found) place(found);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Recompute whenever the selection changes (covers mouse drag, keyboard,
    // double/triple-click). Debounced so we act on the settled selection, and
    // gated on `dragging` so the bubble only appears once the drag is released.
    let dragging = false;
    let timer = null;
    const schedule = () => {
      clearTimeout(timer);
      timer = setTimeout(onSelection, 120);
    };

    const onSelectionChange = () => {
      if (dragging) return; // wait until mouseup during a drag-select
      schedule();
    };
    const onMouseDown = (e) => {
      dragging = true;
      clearIfOutside(e);
    };
    const onMouseUp = () => {
      dragging = false;
      schedule();
    };

    document.addEventListener("selectionchange", onSelectionChange);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      clearTimeout(timer);
      if (rafId) cancelAnimationFrame(rafId);
      document.removeEventListener("selectionchange", onSelectionChange);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("scroll", onScroll);
    };
  }, [containerRef]);

  if (!popup) return null;

  const quote =
    popup.text.length > MAX_QUOTE
      ? `${popup.text.slice(0, MAX_QUOTE - 1).trimEnd()}…`
      : popup.text;
  const url = typeof window !== "undefined" ? window.location.href : "";
  const intent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `“${quote}”`
  )}&url=${encodeURIComponent(url)}`;

  return (
    <a
      className={`quote-share${popup.below ? " quote-share--below" : ""}`}
      href={intent}
      target="_blank"
      rel="noreferrer"
      // Keep the selection alive: mousedown default would clear it before click.
      onMouseDown={(e) => e.preventDefault()}
      style={{ top: `${popup.top}px`, left: `${popup.left}px` }}
    >
      <i className="fa-brands fa-x-twitter" aria-hidden="true" />
      <span>Tweet this</span>
    </a>
  );
};

export default QuoteShare;
