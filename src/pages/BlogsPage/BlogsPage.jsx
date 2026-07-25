import { Suspense, lazy, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import TagFilter from '../../components/TagFilter/TagFilter';
import YearLog from '../../components/YearLog/YearLog';
import CursorTrail from '../../components/CursorTrail/CursorTrail';
import { postsByDateDesc } from '../../data/posts';
import { scrollToTarget } from '../../hooks/useLenis';

import './BlogsPage.scss';

// Heavy three.js chunk stays out of the critical path — the page renders
// instantly and the physics pile fades in when its code arrives.
const PhysicsHero = lazy(
  () => import('../../components/PhysicsHero/PhysicsHero'),
);

// Parallax: the fixed hero drifts up at a fraction of scroll speed while the
// sheet climbs over it at full speed — the classic depth cue. Only the first
// screen matters; past that the hero is fully covered, so we clamp and stop.
const useHeroParallax = (heroRef) => {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = Math.min(window.scrollY, window.innerHeight);
        if (heroRef.current) {
          heroRef.current.style.transform = `translateY(${-y * 0.25}px)`;
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [heroRef]);
};

const Hero = () => {
  const latest = postsByDateDesc[0];
  const heroRef = useRef(null);
  useHeroParallax(heroRef);
  const entryCount = postsByDateDesc.length;
  const firstEntryYear = postsByDateDesc[
    postsByDateDesc.length - 1
  ]?.date.slice(0, 4);
  // Total shelf time: sum of per-post read times ("7 min" → 7).
  const totalMinutes = postsByDateDesc.reduce(
    (sum, p) => sum + (parseInt(p.readtime, 10) || 0),
    0,
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
      <div className="hero-content">
        <div className="hero-page hero-page--left">
          <p className="hero-kicker">
            <span className="hero-kicker__dot" aria-hidden="true" />
            Sahil Kandhare
          </p>
          <h1 className="hero-title">
            Notes from a curious mind,{' '}
            <span className="hero-title__accent">
              one rabbit hole at a time.
            </span>
          </h1>
          <p className="hero-sub">
            Long-form notes on whatever problem currently has my attention. One
            topic at a time, taken apart properly and written the way I wish
            someone had explained it to me.
          </p>
        </div>
        <aside className="hero-page hero-page--right hero-index">
          <p className="hero-index__heading">Index</p>
          <dl className="hero-index__rows">
            <div className="hero-index__row">
              <dt>Entries</dt>
              <span className="hero-index__leader" aria-hidden="true" />
              <dd>{String(entryCount).padStart(2, '0')}</dd>
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
        </aside>
      </div>
      {/* Pinned to the bottom edge of the hero, not the copy column — it is a
          scroll affordance for the whole screen. */}
      <a
        className="hero-scroll-cue"
        href="#writing-log"
        onClick={(e) => {
          e.preventDefault();
          // Land at the section top itself — the sheet edge (and its rounded
          // corners) ends up 64px past the viewport top, so no sliver of the
          // hero can remain visible.
          scrollToTarget('#writing-log', 0);
        }}
      >
        <i className="fa-solid fa-arrow-down" aria-hidden="true"></i>
        <span>Browse the archive</span>
        <i className="fa-solid fa-arrow-down" aria-hidden="true"></i>
      </a>
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
  const activeTag = searchParams.get('tag');

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
