// Importing necessary libraries and tools
import React, { useRef, useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";

// Importing necessary components and tools
import Tooltip from "../Tooltip/Tooltip";

// Importing necessary styles && data
import "./CommandCenter.scss";
import { commandShortcuts, cmdItems } from "../../data/CommandShortCuts";
import { Link } from "react-router-dom";

// Blog series data
import { blogSeries, blogPost } from "../../data/BlogsData";

import Loader from "../Loader/Loader";
const noFilter = "No filter";
/**
 * SearchBlogs component
 * @returns {JSX.Element} - CommandCenter component
 */

const SearchBlogs = ({
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

      if (searchQuery !== "" || selectedFilter !== noFilter) {
        let searchedBlogs = blogPost;

        if (searchQuery !== "") {
          // Filter the blogs based on the search query
          searchedBlogs = blogPost.filter((blog) =>
            blog.keywords.some((keyword) =>
              keyword.toLowerCase().includes(searchQuery.toLowerCase())
            )
          );

          // If no results found, try matching with each word separately
          if (searchedBlogs.length === 0) {
            const searchWords = searchQuery.toLowerCase().split(" ");
            searchedBlogs = blogPost.filter((blog) =>
              blog.keywords.some((keyword) =>
                searchWords.some((word) => keyword.toLowerCase().includes(word))
              )
            );
          }
        }

        if (selectedFilter !== noFilter) {
          searchedBlogs = searchedBlogs.filter((blog) => {
            return blog.filterTag === selectedFilter;
          });
        }

        setTimeout(() => {
          setSearchedFilteredBlogs(searchedBlogs);
          setLoadingBlogs(false);
        }, 1500);
      } else {
        setSearchedFilteredBlogs(null);
        setLoadingBlogs(false);
      }
    }, 1000);

    // Cleanup function to clear timeout
    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedFilter]);

  return (
    <div className="search-bar">
      <input
        autoFocus={true}
        type="text"
        placeholder="Search a blog post with keywords..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Tooltip content="Filter Blogs" direction="top">
        <div className="filter-posts-container" onClick={handleDropdownToggle}>
          <i className="fa-solid fa-filter filter-icon"></i>
        </div>
      </Tooltip>
      {showDropdown && (
        <div className="dropdown-menu">
          <div className="dropdown-top">
            <div>
              <h5>Filter Blog Series</h5>
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
            {blogSeries.map((series, index) => (
              <li key={index}>
                <div
                  className="series-container"
                  onClick={() => handleFilterSelection(series.filterTag)}
                >
                  <i
                    className={`fa-solid fa-check ${
                      selectedFilter === series.filterTag ? "visible" : ""
                    }`}
                  ></i>
                  <div className="series-title">{series.filterTag}</div>
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
    <div className="item-center">
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
              <span>
                <b>
                  {searchedFilteredBlogs.length > 1
                    ? `${searchedFilteredBlogs.length} results`
                    : `${searchedFilteredBlogs.length} result`}{" "}
                </b>
                for blogs matching entered keyword
              </span>
              {searchedFilteredBlogs.map((blog, index) => (
                <div style={{ display: "flex", marginTop: 4 }} key={index}>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: 15,
                      fontWeight: 600,
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {index + 1}.{" "}
                  </span>
                  <Link to={blog.blogUrl} onClick={closeCMDCenter}>
                    {blog.blogTitle}
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-result">
              Sorry, I haven't written any blog about it yet! 😅
            </div>
          )}
        </div>
      ) : (
        <div className="cmd-items">
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
