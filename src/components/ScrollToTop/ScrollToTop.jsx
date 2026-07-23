import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { scrollToTop } from "../../hooks/useLenis";

/**
 * Scroll management for client-side routing. On a fresh link click (PUSH) or a
 * redirect (REPLACE) we jump to the top of the new page. On POP — back/forward
 * AND a full-page refresh — we do nothing, letting the browser's native scroll
 * restoration return the user to where they were. This replaces the per-page
 * `scrollTo(0,0)` on mount, which fired on refresh too and always yanked users
 * to the top.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navType = useNavigationType();
  const navTypeRef = useRef(navType);
  navTypeRef.current = navType;

  // Keyed on pathname only: search-param updates (e.g. tag filter) share the
  // same pathname and must not scroll, even though they change navType.
  useEffect(() => {
    if (navTypeRef.current !== "POP") scrollToTop();
  }, [pathname]);

  return null;
};

export default ScrollToTop;
