import "./TagFilter.scss";
import { allTags } from "../../data/posts";

/**
 * Horizontal pill row for filtering posts by tag. Active tag is stored in the
 * `?tag=` search param by the parent (shareable URLs, survives refresh).
 */
const TagFilter = ({ activeTag, onSelect }) => {
  return (
    <div className="tag-filter" role="tablist" aria-label="Filter posts by tag">
      <button
        className={`tag-pill ${activeTag ? "" : "active"}`}
        onClick={() => onSelect(null)}
      >
        all
      </button>
      {allTags.map((tag) => (
        <button
          key={tag}
          className={`tag-pill ${activeTag === tag ? "active" : ""}`}
          onClick={() => onSelect(activeTag === tag ? null : tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default TagFilter;
