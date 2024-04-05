import React from "react";
import "./Footer.scss";

const Footer = ({ toggleTheme }) => {
  return (
    <footer>
      <div className="footer-content">
        <div className="left">
          <span>
            © {new Date().getFullYear()} | Developed with{" "}
            <i className="fa-solid fa-heart"></i> by{" "}
            <a
              target="_blank"
              className="link"
              href="https://github.com/SahilK-027"
            >
              SahilK-027
            </a>
          </span>
        </div>

        <div className="right">
          Theme
          <span>
            <input
              type="checkbox"
              className="checkbox"
              id="checkbox"
              onChange={toggleTheme}
            />
            <label htmlFor="checkbox" className="checkbox-label">
              <i className="fas fa-moon"></i>
              <i className="fas fa-sun"></i>
              <span className="ball"></span>
            </label>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
