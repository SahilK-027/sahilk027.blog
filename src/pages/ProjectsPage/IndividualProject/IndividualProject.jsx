import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Projects } from "../../../data/Projects";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import "./IndividualProject.scss";

const NotFoundProject = ({ projectName }) => {
  return (
    <div className="project-not-found-page">
      <h1>
        <span className="error-no">Error 404:</span>{" "}
        <span className="rem-h1">That's an error.</span>
      </h1>
      <p>
        Well, well, well, it appears my resume is missing a project named{" "}
        <span className="requested-URL">{projectName}</span>. Looks like I'll
        have to work on it!
      </p>
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

const CurrentProject = ({ currProject }) => {
  return (
    <>
      <h1>{currProject.projectTitle}</h1>
      <p className="project-subtitle">{currProject.subtitle}</p>

      <div className="individual-project-section video-container">
        <video className="video" loop autoPlay muted controls>
          <source src={currProject.videoUrl} type="video/mp4" />
        </video>
      </div>

      <div className="individual-project-section launch-project">
        <h2 className="project-subtitle">🔗 Launch Links: </h2>
        <div className="launch-buttons">
          {currProject.projectHref ? (
            <a target="_blank" className="btn" href={currProject.projectHref}>
              Live Project &nbsp; <i className="fa-solid fa-arrow-right"></i>
            </a>
          ) : (
            <></>
          )}
          {currProject.githubHref ? (
            <a target="_blank" className="btn" href={currProject.githubHref}>
              Source Code &nbsp; <i className="fa-brands fa-github"></i>
            </a>
          ) : (
            <></>
          )}
          {currProject.publicationHref ? (
            <a
              target="_blank"
              className="btn"
              href={currProject.publicationHref}
            >
              Publication &nbsp;{" "}
              <i className="fa-solid fa-file-circle-check"></i>
            </a>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="individual-project-section description">
        <h2 className="project-subtitle">🧑‍💻 The Project: </h2>
        {currProject.detailedDescription.map((description, index) => (
          <>
            <p key={index}>{description}</p>
            <br />
          </>
        ))}
      </div>

      <div className="individual-project-section credits">
        {currProject.credits.length > 0 ? (
          <>
            <h2 className="project-subtitle">🙏 Credits:</h2>
            <ul>
              {currProject.credits.map((credit, index) => (
                <li key={index}>
                  <a
                    className="link"
                    href={credit.profile}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {credit.person}
                  </a>{" "}
                  - {credit.role}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <></>
        )}
      </div>

      <div className="individual-project-section technicalDescription">
        <h2 className="project-subtitle">👨‍🔧 Technical details:</h2>
        {currProject.technicalDescription.map((description, index) => (
          <div>
            <p key={index}>{description}</p>
            <br />
          </div>
        ))}
      </div>

      <div className="individual-project-section techstack-container">
        <h2 className="project-subtitle">📚 Tech stack:</h2>
        {currProject.techStack.map((tech, index) => (
          <div className="tech" key={index}>
            <p>
              <i className="fa-solid fa-arrow-right"></i>{" "}
              <span>{tech.technology}</span>: {tech.useCase}
            </p>
          </div>
        ))}
      </div>

      <div className="individual-project-section learnings">
        <h2 className="project-subtitle">💡 Learnings:</h2>
        <ul>
          {currProject.learnings.map((learning, index) => (
            <li key={index}>
              <p>
                <span>{learning.title}: </span>
                {learning.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const IndividualProject = ({
  openCMDCenter,
  controlMusic,
  isMusicPlaying,
  theme,
  toggleTheme,
}) => {
  const { projectName } = useParams();

  // Find the project object that matches the project name
  const currProject = Projects.find(
    (project) => project.idSelector === projectName
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
        pageTitle={currProject ? currProject.projectTitle : "404 Project Not Found"}
      />
      <div className="page individual-project-page">
        {currProject ? (
          <div className="section-top individual-project-container">
            <CurrentProject currProject={currProject} />
          </div>
        ) : (
          <NotFoundProject projectName={projectName} />
        )}
      </div>
      <Footer toggleTheme={toggleTheme} />
    </>
  );
};

export default IndividualProject;
