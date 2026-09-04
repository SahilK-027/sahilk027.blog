import { Link } from "react-router-dom";
import { mostRecentBlog } from "../../data/posts";
import { GLYPH_PATHS } from "../../data/glyphPaths";
import "./YearLog.scss";

// Each post's wireframe mark — deterministic via blogNo, drawn hairline.
// pathLength=1 lets the hover animation redraw the figure with one keyframe.
const PostGlyph = ({ n }) => (
  <svg className="post-glyph" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    {GLYPH_PATHS[n % GLYPH_PATHS.length]
      .split("M")
      .filter(Boolean)
      .map((seg, i) => (
        <path key={i} d={`M${seg}`} pathLength="1" />
      ))}
  </svg>
);

// 12 tiny bars, one per month — height proportional to posts that month.
const ActivityStrip = ({ monthCounts, max }) => (
  <div className="activity-strip" aria-hidden="true">
    {monthCounts.map((count, i) => (
      <span
        key={i}
        className={`month-bar ${count > 0 ? "filled" : ""}`}
        style={count > 0 ? { height: `${6 + (count / max) * 14}px` } : undefined}
      />
    ))}
  </div>
);

/**
 * The time log: editorial two-column layout — a sticky year rail on the left
 * (year, count, monthly activity strip), TOC-style post rows on the right.
 */
const YearLog = ({ posts, onTagClick }) => {
  const byYear = new Map();
  for (const post of posts) {
    const year = post.date.slice(0, 4);
    if (!byYear.has(year)) byYear.set(year, []);
    byYear.get(year).push(post);
  }
  const years = [...byYear.keys()].sort((a, b) => b.localeCompare(a));

  if (years.length === 0) {
    return <p className="year-log-empty">No posts match this tag yet.</p>;
  }

  return (
    <div className="year-log">
      {years.map((year) => {
        const yearPosts = byYear
          .get(year)
          .sort((a, b) => b.date.localeCompare(a.date));
        const monthCounts = Array.from({ length: 12 }, () => 0);
        yearPosts.forEach((p) => {
          monthCounts[Number(p.date.slice(5, 7)) - 1] += 1;
        });
        const max = Math.max(...monthCounts, 1);

        return (
          <section key={year} className="year-group">
            <div className="year-rail">
              <div className="year-rail__inner">
                <h2 className="year-rail__year">{year}</h2>
                <span className="year-rail__count">
                  {yearPosts.length} {yearPosts.length === 1 ? "post" : "posts"}
                </span>
                <ActivityStrip monthCounts={monthCounts} max={max} />
              </div>
            </div>

            <ul className="post-list">
              {yearPosts.map((post, idx) => (
                <li key={post.blogNo} className="post-row">
                  <Link to={post.url} className="post-link">
                    <span className="post-figure" aria-hidden="true">
                      <PostGlyph n={post.blogNo} />
                      <span className="post-index">
                        {String(yearPosts.length - idx).padStart(2, "0")}
                      </span>
                    </span>
                    <span className="post-main">
                      <span className="post-title">{post.title}</span>
                      <span className="post-meta">
                        {post.blogNo === mostRecentBlog.blogNo && (
                          <span className="post-badge">Latest</span>
                        )}
                        <time dateTime={post.date}>{post.displayDate}</time>
                        <span className="post-meta__dot" aria-hidden="true" />
                        <span className="post-readtime">{post.readtime}</span>
                      </span>
                    </span>
                  </Link>
                  <span className="post-leader" aria-hidden="true" />
                  <span className="post-tags">
                    {post.tags.map((tag) => (
                      <button
                        key={tag}
                        className="post-tag"
                        onClick={() => onTagClick(tag)}
                      >
                        {tag}
                      </button>
                    ))}
                  </span>
                  <i
                    className="fa-solid fa-arrow-right post-arrow"
                    aria-hidden="true"
                  ></i>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
};

export default YearLog;
