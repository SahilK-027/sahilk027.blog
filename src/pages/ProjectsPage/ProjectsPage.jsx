import React from "react";
import "./ProjectsPage.scss";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const ProjectsPage = ({
  openCMDCenter,
  controlMusic,
  isMusicPlaying,
  theme,
  toggleTheme,
}) => {
  return (
    <>
      <Navbar
        openCMDCenter={openCMDCenter}
        controlMusic={controlMusic}
        isMusicPlaying={isMusicPlaying}
        theme={theme}
      />
      <div className="page projects-page">
        <div className="section projects-page-container">
          <h1>Projects </h1>
        </div>
      </div>
      <Footer toggleTheme={toggleTheme} />
    </>
  );
};

export default ProjectsPage;
