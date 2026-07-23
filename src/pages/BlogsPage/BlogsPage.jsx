import { Suspense, lazy, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import TagFilter from "../../components/TagFilter/TagFilter";
import YearLog from "../../components/YearLog/YearLog";
import CursorTrail from "../../components/CursorTrail/CursorTrail";
import { postsByDateDesc } from "../../data/posts";
import { scrollToTarget } from "../../hooks/useLenis";

import "./BlogsPage.scss";

// Heavy three.js chunk stays out of the critical path — the page renders
// instantly and the physics pile fades in when its code arrives.
const PhysicsHero = lazy(() =>
  import("../../components/PhysicsHero/PhysicsHero")
);

// Parallax depth: the hero is sticky (scroll speed 0) while the sheet below
// slides over it at full speed; the copy additionally sinks and fades so the
// hero recedes instead of just getting wiped.
const useHeroParallax = (fadeRef, driftRefs) => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let parked = false;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        // Deep in the page the hero is invisible under the sheet — skip the
        // style writes entirely instead of restyling a hidden layer.
        const deep = y > window.innerHeight * 1.5;
        if (deep && parked) return;
        parked = deep;
        const p = Math.min(y / window.innerHeight, 1);
        // The whole hero layer — canvas included — fades as one, so the
        // shapes recede with the copy instead of floating over the sheet.
        if (fadeRef.current) {
          fadeRef.current.style.opacity = String(Math.max(1 - p * 1.15, 0));
        }
        for (const ref of driftRefs) {
          if (ref.current) {
            ref.current.style.transform = `translateY(${y * 0.3}px)`;
          }
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
    // Refs are stable tuples created once in Hero.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

const Hero = () => {
  const latest = postsByDateDesc[0];
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const metaRef = useRef(null);
  useHeroParallax(heroRef, [contentRef, metaRef]);
  const entryCount = postsByDateDesc.length;
  const firstEntryYear = postsByDateDesc[postsByDateDesc.length - 1]?.date.slice(
    0,
    4
  );
  // Total shelf time: sum of per-post read times ("7 min" → 7).
  const totalMinutes = postsByDateDesc.reduce(
    (sum, p) => sum + (parseInt(p.readtime, 10) || 0),
    0
  );
  const shelfTime =
    totalMinutes >= 60
      ? `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`
      : `${totalMinutes}m`;

  return (
    <header className="hero" ref={heroRef}>
      <Suspense fallback={null}>
        <PhysicsHero />
      </Suspense>
      <div className="hero-content" ref={contentRef}>
        <div className="hero-page hero-page--left">
          <p className="hero-kicker">
            <span className="hero-kicker__dot" aria-hidden="true" />
            Sahil Kandhare
            <span className="hero-kicker__sep" aria-hidden="true" />
            Creative Developer
          </p>
          <h1 className="hero-title">
            Field notes from a curious mind,{" "}
            <span className="hero-title__accent">
              one rabbit hole at a time.
            </span>
          </h1>
          <p className="hero-sub">
            Three.js, WebGL and shaders, CS fundamentals — and whatever else
            curiosity drags me into — written the way I wish someone had
            explained it to me.
          </p>
          <div className="hero-links">
            <a
              href="#writing-log"
              onClick={(e) => {
                e.preventDefault();
                // Land at the section top itself — the sheet edge (and its
                // rounded corners) ends up 64px past the viewport top, so no
                // sliver of the hero can remain visible.
                scrollToTarget("#writing-log", 0);
              }}
            >
              Browse the archive
              <i className="fa-solid fa-arrow-down" aria-hidden="true"></i>
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/SahilK-027"
            >
              GitHub
              <i
                className="fa-solid fa-arrow-up-right-from-square"
                aria-hidden="true"
              ></i>
            </a>
          </div>
        </div>
        <aside className="hero-page hero-page--right hero-index">
          <p className="hero-index__heading">Index</p>
          <dl className="hero-index__rows">
            <div className="hero-index__row">
              <dt>Entries</dt>
              <span className="hero-index__leader" aria-hidden="true" />
              <dd>{String(entryCount).padStart(2, "0")}</dd>
            </div>
            <div className="hero-index__row">
              <dt>Writing since</dt>
              <span className="hero-index__leader" aria-hidden="true" />
              <dd>{firstEntryYear}</dd>
            </div>
            <div className="hero-index__row">
              <dt>Shelf time</dt>
              <span className="hero-index__leader" aria-hidden="true" />
              <dd>{shelfTime}</dd>
            </div>
            <div className="hero-index__row">
              <dt>Status</dt>
              <span className="hero-index__leader" aria-hidden="true" />
              <dd>
                <span className="hero-index__pulse" aria-hidden="true" />
                Exploring
              </dd>
            </div>
          </dl>
          {latest && (
            <div className="hero-index__latest">
              <p className="hero-index__latest-label">Freshly inked</p>
              <Link to={latest.url}>
                {latest.title}
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </Link>
              <p className="hero-index__latest-meta">
                {latest.displayDate} · {latest.readtime} read
              </p>
            </div>
          )}
        </aside>
      </div>
      <div className="hero-meta" ref={metaRef}>
        <span className="hero-meta__scroll" aria-hidden="true">
          <span className="hero-meta__line" />
          Scroll
        </span>
        <div className="hero-meta__socials">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.linkedin.com/in/sahilk027/"
          >
            LinkedIn
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://x.com/SahilK027"
            aria-label="X (Twitter)"
          >
            <span aria-hidden="true">𝕏</span>
          </a>
          <a href="mailto:sahilkandhare027@gmail.com">Email</a>
        </div>
      </div>
    </header>
  );
};

const BlogsPage = ({
  openCMDCenter,
  controlMusic,
  isMusicPlaying,
  theme,
  toggleTheme,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTag = searchParams.get("tag");

  const setTag = (tag) => {
    if (tag) setSearchParams({ tag }, { replace: true });
    else setSearchParams({}, { replace: true });
  };

  const visiblePosts = activeTag
    ? postsByDateDesc.filter((p) => p.tags.includes(activeTag))
    : postsByDateDesc;

  return (
    <>
      <Navbar
        openCMDCenter={openCMDCenter}
        controlMusic={controlMusic}
        isMusicPlaying={isMusicPlaying}
        theme={theme}
        pageTitle="Sahil K — blog"
      />
      <div className="blogsPage-container">
        <Hero />
        <div className="landing-sheet">
          <CursorTrail />
          <main className="page landing-main">
            <section className="log-section" id="writing-log">
              <div className="log-header">
              <p className="section-kicker">
                <span className="section-kicker__dot" aria-hidden="true" />
                The archive
              </p>
              <div className="log-header-row">
                <h2 className="log-title">
                  Writing log
                  <span className="log-count">{visiblePosts.length}</span>
                </h2>
              </div>
              <TagFilter activeTag={activeTag} onSelect={setTag} />
            </div>
              <YearLog posts={visiblePosts} onTagClick={setTag} />
            </section>
          </main>
        </div>
      </div>
      <Footer toggleTheme={toggleTheme} />
    </>
  );
};

export default BlogsPage;
