import React, { useEffect } from "react";
import "./ProjectsPage.scss";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Projects } from "../../data/Projects";
import { Link } from "react-router-dom";

const ProjectsPage = ({
  openCMDCenter,
  controlMusic,
  isMusicPlaying,
  theme,
  toggleTheme,
}) => {
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
      />
      <div className="page projects-page">
        <div className="section-top projects-page-container">
          <h1>Collection of my projects 🧑‍💻</h1>
          <div className="projects-container">
            {Projects.map((project, index) => (
              <div key={index}>
                <div className="project-description">
                  <div>
                    <h2>
                      <Link className="link" to={project.projectUrl}>
                        {project.name}
                      </Link>
                    </h2>
                  </div>
                  <div>
                    {project.concept.map((concept, idx) => (
                      <span key={index + idx}>
                        {concept}
                        {idx !== project.concept.length - 1 ? " • " : ""}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="project-card" key={index}>
                  <div className="image-holder">
                    <Link to={project.projectUrl}>
                      <img src={project.thumbnailUrl} alt={project.name} />
                    </Link>
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
