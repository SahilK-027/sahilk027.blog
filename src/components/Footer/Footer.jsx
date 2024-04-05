import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <span>
          © {new Date().getFullYear()} Sahil K | All Rights Reserved. Developed
          with <i className="fa-solid fa-heart"></i> by{" "}
          <a
            target="_blank"
            className="link"
            href="https://github.com/SahilK-027"
          >
            SahilK-027
          </a>
          .
        </span>
      </div>
    </footer>
  );
};

export default Footer;
