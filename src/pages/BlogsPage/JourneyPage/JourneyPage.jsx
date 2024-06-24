import React, { useEffect, useState } from "react";
import "./JourneyPage.scss";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import { blogPost, blogSeries } from "../../../data/BlogsData";
import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import Tooltip from "../../../components/Tooltip/Tooltip";

const NotFoundJourney = ({ journeyName }) => {
  return (
    <div className="journey-not-found-page">
      <h1>
        <span className="error-no">Error 404:</span>{" "}
        <span className="rem-h1">Ohh No...😬!</span>
      </h1>
      <p>
        Well, well, well, it appears the journey named{" "}
        <span className="requested-URL">{journeyName}</span> is not in the
        database. Looks like I'll have to work on it!
      </p>
      <br />
      <p>
        But, don't worry I got you! Click{" "}
        <Link className="link" to="/">
          here
        </Link>{" "}
        to go back home.
      </p>
    </div>
  );
};

const JourneyPage = ({
  openCMDCenter,
  controlMusic,
  isMusicPlaying,
  theme,
  toggleTheme,
}) => {
  const { journeyName } = useParams();
  // const [allReadBlogs, setAllReadBlogs] = useState([]);

  // Find the project object that matches the project name
  const currJourney = blogSeries.find(
    (blogSeries) => blogSeries.selector === journeyName
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    // Load read status from cookie when component mounts
    // const readBlogs = Object.keys(Cookies.get())
    //   .filter((cookie) => cookie.includes("blogReadStatus"))
    //   .map((cookie) => parseInt(cookie.replace("blogReadStatus", "")));
    // setAllReadBlogs(readBlogs);
  }, []);

  // Function to mark a blog as read or delete the cookie if already marked as read
  // const handleBlogReadClick = (blogId) => {
  //   if (allReadBlogs.includes(blogId)) {
  //     Cookies.remove(`blogReadStatus${blogId}`);
  //     setAllReadBlogs(allReadBlogs.filter((id) => id !== blogId));
  //   } else {
  //     Cookies.set(`blogReadStatus${blogId}`, `true`);
  //     setAllReadBlogs([...allReadBlogs, blogId]);
  //   }
  // };

  return (
    <>
      <Navbar
        openCMDCenter={openCMDCenter}
        controlMusic={controlMusic}
        isMusicPlaying={isMusicPlaying}
        theme={theme}
        pageTitle={currJourney?.seriesTitle}
      />
      <div className="page blog-series-page">
        {currJourney ? (
          <>
            <div className="section-top">
              <div className="container">
                <div className="blog-series-header">
                  <h1>{currJourney.seriesTitle}</h1>
                  <p>{currJourney.seriesDescription}</p>
                </div>
              </div>
            </div>
            <div className="section">
              <h2>All Published Blog Articles From the Series</h2>
              <div className="container">
                {currJourney.blogsCollection.length ? (
                  <div className="blog-series-list">
                    {currJourney.blogsCollection.map((blogID) => {
                      const currBlog = blogPost.find(
                        (blog) => blog.blogNo === blogID
                      );
                      {/* const isRead = allReadBlogs.includes(currBlog.blogNo); */}

                      return (
                        <div className="series-item" key={currBlog.blogNo}>
                          <div className="timeline-middle">
                            <div className="timeline-circle"></div>
                          </div>
                          <div className="blog-series-item-container">
                            <Link
                              to={currBlog.blogUrl}
                              className="blog-series-item"
                            >
                              <p>&nbsp;[ {currBlog.sequenceNumberInSeries} ]</p>
                              <h4>{currBlog.blogTitle}</h4>
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="no-blogs">
                    <p style={{ color: "var(--color-error)" }}>
                      No blog articles have been published in this series yet.
                      🤷‍♂️ Please subscribe to the series to get notified about
                      new blog post releases.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <NotFoundJourney journeyName={journeyName} />
        )}
      </div>
      <Footer toggleTheme={toggleTheme} />
    </>
  );
};

export default JourneyPage;
