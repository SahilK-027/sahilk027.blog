import { createContext, useContext, useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import music from "../assets/audio/ghostrifter-purple-dream.ogg";
import { applyAccent, DEFAULT_ACCENT, getAccent } from "../data/accents";
import { getLenis } from "../hooks/useLenis";

const AppContext = createContext(null);

// h in degrees, s/l in percent → [r, g, b] in 0..1 for the blast shader.
const hslToRgb = (h, s, l) => {
  const a = (s / 100) * Math.min(l / 100, 1 - l / 100);
  const f = (n) => {
    const k = (n + h / 30) % 12;
    return l / 100 - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
  };
  return [f(0), f(8), f(4)];
};

/**
 * Central app state: theme, background music, and command-center visibility.
 * Replaces the old prop-drilling of these values through every page/blog.
 */
export const AppProvider = ({ children }) => {
  const [isCommandCenterOpen, setIsCommandCenterOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || "dark"
  );
  const [accent, setAccentState] = useState(
    () => document.documentElement.dataset.accent || DEFAULT_ACCENT
  );

  // `origin` (viewport px, e.g. the clicked swatch) triggers the WebGL
  // color-blast overlay; without it the accent just swaps.
  const setAccent = (name, origin) => {
    const a = getAccent(name);
    if (origin && a.name !== accent) {
      window.dispatchEvent(
        new CustomEvent("accent-blast", {
          detail: { x: origin.x, y: origin.y, rgb: hslToRgb(a.h, a.s, a.l) },
        })
      );
    }
    applyAccent(a.name);
    setAccentState(a.name);
    Cookies.set("accent", a.name, { expires: 365 });
  };

  // Single Audio instance kept in a ref — created once, never re-created on
  // unrelated state changes (fixes the old effect that rebuilt Audio on every
  // toggle and depended on unrelated key state).
  const audioRef = useRef(null);

  const openCMDCenter = () => {
    setIsCommandCenterOpen(true);
    document.documentElement.classList.add("no-scroll");
    // Lenis scrolls the page programmatically, so overflow:hidden alone
    // doesn't stop it — pause it while the palette owns the wheel.
    getLenis()?.stop();
  };

  const closeCMDCenter = () => {
    setIsCommandCenterOpen(false);
    document.documentElement.classList.remove("no-scroll");
    getLenis()?.start();
  };

  const controlMusic = () => setIsMusicPlaying((prev) => !prev);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;

    // Apply the theme synchronously: flip data-theme (drives all CSS vars) and
    // freeze per-element transitions so only the crossfade animates.
    const apply = () => {
      root.classList.add("theme-switching");
      root.dataset.theme = next;
    };

    // View Transitions crossfade the whole page as one uniform layer, so every
    // element fades together regardless of its own CSS. Fall back to an instant
    // swap where the API is unavailable.
    if (document.startViewTransition) {
      const vt = document.startViewTransition(apply);
      vt.finished.finally(() => root.classList.remove("theme-switching"));
    } else {
      apply();
      requestAnimationFrame(() =>
        requestAnimationFrame(() => root.classList.remove("theme-switching"))
      );
    }

    setTheme(next);
    Cookies.set("theme", next, { expires: 365 });
  };

  // Keep cookie in sync on first load (the actual DOM theme is set by the
  // inline script in index.html to avoid a flash of the wrong theme).
  useEffect(() => {
    if (!Cookies.get("theme")) Cookies.set("theme", theme, { expires: 365 });
  }, []);

  // Lazily build the single audio element, then just play/pause it.
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(music);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.8;
    }
    const audio = audioRef.current;
    if (isMusicPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [isMusicPlaying]);

  const value = {
    theme,
    toggleTheme,
    accent,
    setAccent,
    isMusicPlaying,
    controlMusic,
    isCommandCenterOpen,
    openCMDCenter,
    closeCMDCenter,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within an AppProvider");
  return ctx;
};
