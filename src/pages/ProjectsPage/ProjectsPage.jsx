import React from "react";
import "./ProjectsPage.scss";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Projects } from "../../data/Projects";

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
          <h1>Collection of my projects:</h1>
          <div className="projects-container">
            {Projects.map((project, index) => (
              <div key={index}>
                <div className="project-description">
                  <div>
                    <h3>
                      {" "}
                      <a className="link" href={project.projectUrl}>
                        {project.name}
                      </a>
                    </h3>
                  </div>
                  <div>
                    {project.concept.map((concept, idx) => (
                      <span key={index + idx}>
                        {concept}{" "}
                        {idx !== project.concept.length - 1 ? " • " : ""}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="project-card" key={index}>
                  <div className="image-holder">
                    <a href={project.projectUrl}>
                      <img src={project.thumbnailUrl} alt={project.name} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer toggleTheme={toggleTheme} />
    </>
  );
};

export default ProjectsPage;
