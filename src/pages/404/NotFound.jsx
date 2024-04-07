import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./NotFound.scss";
import { Link } from "react-router-dom";

const NotFound = ({
  openCMDCenter,
  controlMusic,
  isMusicPlaying,
  theme,
  toggleTheme,
}) => {
  const [requestedURL, setRequestedURL] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    // Get the current path from window.location.pathname
    const currentPath = window.location.pathname;
    // Extract the text after the leading slash
    const URL = currentPath.substring(1);
    console.log(URL);
    setRequestedURL(URL);
  }, []);

  return (
    <>
      <Navbar
        openCMDCenter={openCMDCenter}
        controlMusic={controlMusic}
        isMusicPlaying={isMusicPlaying}
        theme={theme}
        pageTitle="404 Page Not Found"
      />
      <div className="page not-found-page">
        <h1>
          <span className="error-no">Error 404:</span>{" "}
          <span className="rem-h1">That's an error.</span>
        </h1>
        <p>
          The requested URL{" "}
          <span className="requested-URL">/{requestedURL}</span> was not found
          on this server. That's all I know.🤦‍♂️!
        </p>
        <p>
          Don't worry I got you! Click{" "}
          <Link className="link" to="/">
            here
          </Link>{" "}
          to go back home.
        </p>
      </div>
      <Footer toggleTheme={toggleTheme} />
    </>
  );
};

export default NotFound;
