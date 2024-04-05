import React from "react";
import "./ProjectsPage.scss";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const ProjectsPage = ({ openCMDCenter }) => {
  return (
    <>
      <Navbar openCMDCenter={openCMDCenter} />
      <div className="page projects-page">
        <div className="section projects-page-container">
          <h1>Projects </h1>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProjectsPage;
