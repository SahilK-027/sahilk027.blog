import React, { useEffect } from "react";
import "./JourneyPage.scss";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import { blogPost, blogSeries } from "../../../data/BlogsData";
import { Link, useParams } from "react-router-dom";

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

  // Find the project object that matches the project name
  const currJourney = blogSeries.find(
    (blogSeries) => blogSeries.selector === journeyName
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
                      return (
                        <div className="series-item">
                          <div className="timeline-middle">
                            <div className="timeline-circle"></div>
                          </div>
                          <div>
                            <Link
                              to={currBlog.blogUrl}
                              key={currBlog.sequenceNumberInSeries}
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
