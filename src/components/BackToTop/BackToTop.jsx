import { useEffect, useState } from "react";
import { scrollToTop } from "../../hooks/useLenis";
import "./BackToTop.scss";

/**
 * Floating "scroll to top" button. Hidden until the reader is `threshold`
 * pixels down the page, then fades in bottom-right. Uses the shared Lenis
 * instance so the ride matches the rest of the site.
 */
const BackToTop = ({ threshold = 600 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return (
    <button
      type="button"
      className={`back-to-top${visible ? " is-visible" : ""}`}
      onClick={() => scrollToTop(false)}
      aria-label="Back to top"
      title="Back to top"
      tabIndex={visible ? 0 : -1}
    >
      <i className="fa-solid fa-arrow-up" aria-hidden="true" />
    </button>
  );
};

export default BackToTop;
