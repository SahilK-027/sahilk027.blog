import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { postsByDateDesc } from "../../data/posts";
import "./BlogTags.scss";

/**
 * Tag chips for a blog header. Clicking a tag no longer navigates home —
 * it opens a popover listing other posts that share the tag, so readers can
 * jump straight to related reading without leaving the article context.
 */
const BlogTags = ({ tags = [], currentBlogNo }) => {
  const [openTag, setOpenTag] = useState(null);
  const wrapRef = useRef(null);

  // Close on outside click / Escape.
  useEffect(() => {
    if (!openTag) return undefined;
    const onClick = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpenTag(null);
    };
    const onKey = (e) => e.key === "Escape" && setOpenTag(null);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [openTag]);

  if (!tags.length) return null;

  const related = openTag
    ? postsByDateDesc.filter(
        (p) => p.blogNo !== currentBlogNo && p.tags?.includes(openTag)
      )
    : [];

  return (
    <div className="blog-tags" ref={wrapRef}>
      {tags.map((tag) => {
        const isOpen = openTag === tag;
        return (
          <div key={tag} className="blog-tags__item">
            <button
              type="button"
              className={`blog-tag${isOpen ? " is-open" : ""}`}
              aria-expanded={isOpen}
              onClick={() => setOpenTag(isOpen ? null : tag)}
            >
              {tag}
            </button>
            {isOpen && (
              <div className="tag-popover" role="dialog" aria-label={`Posts tagged ${tag}`}>
                <div className="tag-popover__head">
                  <span className="tag-popover__title">
                    More on <b>{tag}</b>
                  </span>
                  <button
                    type="button"
                    className="tag-popover__close"
                    aria-label="Close"
                    onClick={() => setOpenTag(null)}
                  >
                    <i className="fa-solid fa-xmark" aria-hidden="true" />
                  </button>
                </div>
                {related.length ? (
                  <ul className="tag-popover__list">
                    {related.map((p) => (
                      <li key={p.blogNo}>
                        <Link
                          className="tag-popover__link"
                          to={p.url}
                          onClick={() => setOpenTag(null)}
                        >
                          <span className="tag-popover__link-title">
                            {p.title}
                          </span>
                          <span className="tag-popover__link-meta">
                            {p.displayDate} · {p.readtime}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="tag-popover__empty">
                    No other posts tagged this yet.
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BlogTags;
