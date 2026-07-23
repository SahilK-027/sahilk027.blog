// Importing necessary libraries and tools
import React, { useRef, useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";

// Importing necessary styles && data
import "./CommandCenter.scss";
import { commandShortcuts, cmdItems } from "../../data/CommandShortCuts";
import { Link, useNavigate } from "react-router-dom";

// Blog post data
import { posts, allTags, postsByDateDesc } from "../../data/posts";
import { GLYPH_PATHS } from "../../data/glyphPaths";

import Loader from "../Loader/Loader";

// One of the six brand primitives, keyed by blog number — same mapping as
// the archive rows, so a post keeps its glyph everywhere.
const PostGlyph = ({ n }) => (
  <svg className="cmd-glyph" viewBox="0 0 24 24" aria-hidden="true">
    {GLYPH_PATHS[n % GLYPH_PATHS.length]
      .split("M")
      .filter(Boolean)
      .map((seg, j) => (
        <path key={j} d={`M${seg}`} pathLength="1" />
      ))}
  </svg>
);
const noFilter = "No filter";
/**
 * SearchBlogs component
 * @returns {JSX.Element} - CommandCenter component
 */

const SearchBlogs = ({
  closeCMDCenter,
  selectedFilter,
  showDropdown,
  handleFilterSelection,
  handleDropdownToggle,
  setLoadingBlogs,
  setSearchedFilteredBlogs,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoadingBlogs(true);

      if (
        (searchQuery !== "" && searchQuery.trim().length > 0) ||
        selectedFilter !== noFilter
      ) {
        let searchedBlogs = posts;

        if (searchQuery !== "") {
          const haystack = (blog) => [
            blog.title,
            ...blog.tags,
            ...blog.keywords,
          ];

          // Filter the blogs based on the search query
          searchedBlogs = posts.filter((blog) =>
            haystack(blog).some((keyword) =>
              keyword.toLowerCase().includes(searchQuery.toLowerCase())
            )
          );

          // If no results found, try matching with each word separately
          if (searchedBlogs.length === 0) {
            const searchWords = searchQuery.toLowerCase().split(" ");
            searchedBlogs = posts.filter((blog) =>
              haystack(blog).some((keyword) =>
                searchWords.some((word) => keyword.toLowerCase().includes(word))
              )
            );
          }
        }

        if (selectedFilter !== noFilter) {
          searchedBlogs = searchedBlogs.filter((blog) =>
            blog.tags.includes(selectedFilter)
          );
        }

        setTimeout(() => {
          setSearchedFilteredBlogs(searchedBlogs);
          setLoadingBlogs(false);
        }, 250);
      } else {
        setSearchedFilteredBlogs(null);
        setLoadingBlogs(false);
      }
    }, 300);

    // Cleanup function to clear timeout
    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedFilter]);

  return (
    <div className="search-bar">
      <i className="fa-solid fa-magnifying-glass search-icon" aria-hidden="true"></i>
      <input
        autoFocus={true}
        type="text"
        placeholder="Search posts by title, tag or keyword…"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div
        className="filter-posts-container"
        onClick={handleDropdownToggle}
        title="Filter by tag"
        aria-label="Filter by tag"
      >
        <i className="fa-solid fa-filter filter-icon"></i>
      </div>
      <button
        className="cmd-close"
        onClick={closeCMDCenter}
        title="Close (Esc)"
        aria-label="Close command menu"
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
      {showDropdown && (
        <div className="dropdown-menu">
          <div className="dropdown-top">
            <div>
              <h5>Filter by tag</h5>
            </div>
            <div onClick={handleDropdownToggle}>
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>

          <ul>
            <li>
              <div
                className="series-container"
                onClick={() => handleFilterSelection(noFilter)}
              >
                <i
                  className={`fa-solid fa-check ${
                    selectedFilter === noFilter ? "visible" : ""
                  }`}
                ></i>
                <div className="series-title">No filter</div>
              </div>
            </li>
            {allTags.map((tag) => (
              <li key={tag}>
                <div
                  className="series-container"
                  onClick={() => handleFilterSelection(tag)}
                >
                  <i
                    className={`fa-solid fa-check ${
                      selectedFilter === tag ? "visible" : ""
                    }`}
                  ></i>
                  <div className="series-title">{tag}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

/**
 * Zero state — the six brand primitives sketch themselves in, with an offramp
 * to a random post instead of a dead end.
 */
const EmptyState = ({ closeCMDCenter }) => {
  const navigate = useNavigate();
  const randomPost = () => {
    const pick = posts[Math.floor(Math.random() * posts.length)];
    navigate(pick.url);
    closeCMDCenter();
  };
  return (
    <div className="cmd-empty">
      <div className="cmd-empty__glyphs" aria-hidden="true">
        {GLYPH_PATHS.map((d, i) => (
          <svg key={i} viewBox="0 0 24 24" style={{ "--i": i }}>
            {d.split("M").filter(Boolean).map((seg, j) => (
              <path key={j} d={`M${seg}`} pathLength="1" />
            ))}
          </svg>
        ))}
      </div>
      <p className="cmd-empty__label">No entries found</p>
      <p className="cmd-empty__text">
        Nothing in the archive matches that yet.
      </p>
      <button className="cmd-empty__btn" onClick={randomPost}>
        Read a random post
        <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
      </button>
    </div>
  );
};

/**
 * Quick actions — palette-native commands: jump to a random post, flip the
 * theme, cycle the accent through the six brand hues.
 */
const QuickActions = ({ closeCMDCenter }) => {
  const navigate = useNavigate();

  const randomPost = () => {
    const pick = posts[Math.floor(Math.random() * posts.length)];
    navigate(pick.url);
    closeCMDCenter();
  };

  return (
    <div>
      <h4>Quick actions</h4>
      <button className="cmd-action" onClick={randomPost}>
        <div className="icon">
          <i className="fa-solid fa-dice" aria-hidden="true"></i>
        </div>
        <div className="nav-link">Read a random post</div>
      </button>
    </div>
  );
};

/**
 * ItemCenter component
 * @returns {JSX.Element} - CommandCenter component
 */
const ItemCenter = ({
  closeCMDCenter,
  searchedFilteredBlogs,
  loadingBlogs,
  selectedFilter,
  setSelectedFilter,
}) => {
  const handleRemoveFilter = () => {
    setSelectedFilter(noFilter);
  };
  return (
    // data-lenis-prevent: wheel events here drive this panel's own scroll,
    // not the Lenis-smoothed page behind the overlay.
    <div className="item-center" data-lenis-prevent>
      {loadingBlogs ? (
        <Loader />
      ) : searchedFilteredBlogs ? (
        <div className="search-filter-result">
          {selectedFilter !== noFilter ? (
            <div className="filter">
              <span>Applied filter: </span>
              <div className="filter-container">
                <div className="filter-name">{selectedFilter}</div>
                <div>
                  <i
                    className="fa-solid fa-xmark"
                    onClick={handleRemoveFilter}
                  ></i>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          {searchedFilteredBlogs.length > 0 ? (
            <div className="result">
              <span className="result-count">
                {String(searchedFilteredBlogs.length).padStart(2, "0")}{" "}
                {searchedFilteredBlogs.length > 1 ? "entries" : "entry"} found
              </span>
              {searchedFilteredBlogs.map((blog) => (
                <Link
                  className="cmd-post-row"
                  key={blog.blogNo}
                  to={blog.url}
                  onClick={closeCMDCenter}
                >
                  <PostGlyph n={blog.blogNo} />
                  <span className="cmd-post-row__title">{blog.title}</span>
                  <span className="cmd-post-row__leader" aria-hidden="true" />
                  <span className="cmd-post-row__meta">{blog.readtime}</span>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState closeCMDCenter={closeCMDCenter} />
          )}
        </div>
      ) : (
        <div className="cmd-items">
          <QuickActions closeCMDCenter={closeCMDCenter} />
          <div>
            <h4>Recent entries</h4>
            {postsByDateDesc.slice(0, 3).map((blog) => (
              <Link
                className="cmd-post-row"
                key={blog.blogNo}
                to={blog.url}
                onClick={closeCMDCenter}
              >
                <PostGlyph n={blog.blogNo} />
                <span className="cmd-post-row__title">{blog.title}</span>
                <span className="cmd-post-row__leader" aria-hidden="true" />
                <span className="cmd-post-row__meta">{blog.readtime}</span>
              </Link>
            ))}
          </div>
          {cmdItems.map((item, index) => (
            <div key={index}>
              <h4>{item.title}</h4>
              {item.navLinks.map((link, idx) => (
                <Link
                  target={link.target}
                  key={idx}
                  to={link.href}
                  onClick={closeCMDCenter}
                >
                  <div className="icon">
                    <i className={`fa ${link.icon}`}></i>
                  </div>
                  <div className="nav-link">{link.text}</div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 *  ShortCuts component
 * @returns {JSX.Element} - CommandCenter Shortcuts component
 */
const ShortCuts = () => {
  return (
    <div className="short-cuts">
      {commandShortcuts.map((shortcut, index) => (
        <div key={index} className="shortcut-item">
          <div className="shortcut-name">{shortcut.name}</div>
          <div className="shortcut-key">
            <div className="shortcut-letter">G</div>
            <div className="shortcut-letter">{shortcut.shortcut}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * CommandCenter component
 * @param {*} param0
 * @returns  {JSX.Element} - CommandCenter component
 */
const CommandCenter = ({ closeCMDCenter }) => {
  // Ref to the command center
  const commandCenterRef = useRef(null);
  const [selectedFilter, setSelectedFilter] = useState(noFilter);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loadingBlogs, setLoadingBlogs] = useState(false);
  const [searchedFilteredBlogs, setSearchedFilteredBlogs] = useState(null);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleFilterSelection = (filter) => {
    setSelectedFilter(filter);
    setShowDropdown(false);
  };

  // Event listener to handle the click outside the command center to close it
  useEffect(() => {
    // Function to handle the click outside the command center
    const handleClickOutside = (event) => {
      // If the click is outside the command center, close the command center
      if (
        commandCenterRef.current &&
        !commandCenterRef.current.contains(event.target)
      ) {
        closeCMDCenter();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Unsubscribing the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [commandCenterRef]);

  const animationProps = useSpring({
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1 },
  });

  return (
    <div className="command-center-container">
      <animated.div
        className="command-center"
        style={animationProps}
        ref={commandCenterRef}
      >
        <SearchBlogs
          closeCMDCenter={closeCMDCenter}
          selectedFilter={selectedFilter}
          showDropdown={showDropdown}
          handleFilterSelection={handleFilterSelection}
          handleDropdownToggle={handleDropdownToggle}
          setLoadingBlogs={setLoadingBlogs}
          setSearchedFilteredBlogs={setSearchedFilteredBlogs}
        />
        <ItemCenter
          closeCMDCenter={closeCMDCenter}
          searchedFilteredBlogs={searchedFilteredBlogs}
          loadingBlogs={loadingBlogs}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
        <ShortCuts />
      </animated.div>
    </div>
  );
};

export default CommandCenter;
