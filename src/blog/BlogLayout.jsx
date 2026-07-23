import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MDXProvider } from "@mdx-js/react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import LeftSidebar from "../components/LeftSideBar/LeftSidebar";
import SignatureForBlackBg from "../components/SVG-JSX/SignatureForBlackBg/SignatureForBlackBg";
import SignatureForWhiteBg from "../components/SVG-JSX/SignatureForWhiteBg/SignatureForWhiteBg";
import { useApp } from "../context/AppContext";
import { postsByDateDesc } from "../data/posts";
import { GLYPH_PATHS } from "../data/glyphPaths";
import { scrollToTarget } from "../hooks/useLenis";
import { mdxComponents } from "./mdxComponents";
import "../pages/BlogsPage/Blogs/Blogs.scss";

/**
 * Single shell every MDX blog renders into. Owns navbar, scroll progress,
 * auto-generated clickable TOC, header, poster, article outro and the site
 * footer. Blog content is just the `children` (compiled MDX).
 */
const BlogLayout = ({ meta, poster, children }) => {
  const { theme, isMusicPlaying, controlMusic, openCMDCenter } = useApp();

  const { pathname } = useLocation();
  const contentRef = useRef(null);
  const [sections, setSections] = useState([]);
  const [activeSection, setActiveSection] = useState(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  // Build the TOC automatically from the rendered section headings — authors no
  // longer maintain a hand-written `sections` array in every blog.
  useEffect(() => {
    const nodes = contentRef.current?.querySelectorAll(".blog-section-title");
    setSections(Array.from(nodes || []).map((n) => n.textContent));
    // Keyed on the route so the TOC rebuilds per blog, not on every render.
    // Scroll reset is handled globally by <ScrollToTop>.
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollHeight, scrollTop, clientHeight } =
        document.documentElement;
      const fullHeight = scrollHeight - clientHeight;
      setScrollPercentage(fullHeight > 0 ? (scrollTop / fullHeight) * 100 : 0);

      // Active section = the last heading scrolled past (with a 300px lead).
      const headings =
        contentRef.current?.querySelectorAll(".blog-section-title") || [];
      let current = null;
      headings.forEach((heading, index) => {
        if (scrollTop >= heading.offsetTop - 300) current = index;
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Chronological neighbours (postsByDateDesc is newest-first, so "older"
  // is the next index and "newer" the previous one).
  const postIndex = postsByDateDesc.findIndex(
    (p) => p.blogNo === meta?.blogNo
  );
  const olderPost = postsByDateDesc[postIndex + 1] ?? null;
  const newerPost = postIndex > 0 ? postsByDateDesc[postIndex - 1] : null;

  const jumpToSection = (index) => {
    const nodes = contentRef.current?.querySelectorAll(".blog-section-title");
    if (nodes?.[index]) scrollToTarget(nodes[index], -110);
  };

  return (
    <>
      <Navbar
        openCMDCenter={openCMDCenter}
        controlMusic={controlMusic}
        isMusicPlaying={isMusicPlaying}
        theme={theme}
        pageTitle={meta?.title}
      />
      <div className="page blog-series-page">
        <LeftSidebar
          scrollPercentage={scrollPercentage}
          activeSection={activeSection}
          sections={sections}
          onSelect={jumpToSection}
        />
        <article className="section-top">
          <Link to="/" className="blog-back">
            <i
              className="fa-solid fa-arrow-left-long"
              aria-hidden="true"
            ></i>
            All posts
          </Link>
          <header className="blog-header">
            <div className="blog-kicker">
              <svg
                className="blog-kicker__glyph"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {GLYPH_PATHS[(meta?.blogNo ?? 0) % GLYPH_PATHS.length]
                  .split("M")
                  .filter(Boolean)
                  .map((seg, j) => (
                    <path key={j} d={`M${seg}`} pathLength="1" />
                  ))}
              </svg>
              <span>
                Entry {String(meta?.blogNo ?? 0).padStart(2, "0")}
              </span>
              <span className="blog-kicker__leader" aria-hidden="true" />
              <time dateTime={meta?.date}>{meta?.displayDate}</time>
              <span className="blog-kicker__sep" aria-hidden="true">
                ·
              </span>
              <span>{meta?.readtime} read</span>
            </div>
            <h1 className="blog-title">{meta?.title}</h1>
            <div className="blog-tags">
              {meta?.tags?.map((tag) => (
                <Link
                  key={tag}
                  className="blog-tag"
                  to={`/?tag=${encodeURIComponent(tag)}`}
                >
                  {tag}
                </Link>
              ))}
            </div>
          </header>
          {poster}
          <div className="main-blog-content" ref={contentRef}>
            <MDXProvider components={mdxComponents}>{children}</MDXProvider>
          </div>

          <footer className="blog-outro">
            <p className="blog-outro__kicker">
              <span className="blog-outro__dot" aria-hidden="true" />
              Thanks for reading
            </p>
            <p className="blog-outro__text">
              Enjoyed this article? More of my work lives on{" "}
              <a
                className="link"
                target="_blank"
                rel="noreferrer"
                href="https://github.com/SahilK-027"
              >
                GitHub
              </a>
              . Questions or corrections — open a thread in the{" "}
              <a
                className="link"
                target="_blank"
                rel="noreferrer"
                href="https://github.com/SahilK-027/sahilk027.blog/discussions"
              >
                discussion forum
              </a>
              .
            </p>
            <div className="blog-outro__signature" aria-hidden="true">
              {theme === "dark" ? (
                <SignatureForBlackBg />
              ) : (
                <SignatureForWhiteBg />
              )}
            </div>
          </footer>

          {(olderPost || newerPost) && (
            <nav className="post-nav" aria-label="More posts">
              {olderPost ? (
                <Link className="post-nav__card" to={olderPost.url}>
                  <span className="post-nav__label">
                    <i
                      className="fa-solid fa-arrow-left-long"
                      aria-hidden="true"
                    ></i>
                    Older post
                  </span>
                  <span className="post-nav__title">{olderPost.title}</span>
                  <span className="post-nav__meta">
                    {olderPost.displayDate} · {olderPost.readtime}
                  </span>
                </Link>
              ) : (
                <span className="post-nav__spacer" aria-hidden="true" />
              )}
              {newerPost ? (
                <Link
                  className="post-nav__card post-nav__card--next"
                  to={newerPost.url}
                >
                  <span className="post-nav__label">
                    Newer post
                    <i
                      className="fa-solid fa-arrow-right-long"
                      aria-hidden="true"
                    ></i>
                  </span>
                  <span className="post-nav__title">{newerPost.title}</span>
                  <span className="post-nav__meta">
                    {newerPost.displayDate} · {newerPost.readtime}
                  </span>
                </Link>
              ) : (
                <span className="post-nav__spacer" aria-hidden="true" />
              )}
            </nav>
          )}
        </article>
      </div>
      <Footer />
    </>
  );
};

export default BlogLayout;
