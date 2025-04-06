import React from "react";
import "./BlogsFooter.scss";
import BlogLetter from "../BlogsLetter/BlogLetter";
import SignatureForBlackBg from "../SVG-JSX/SignatureForBlackBg/SignatureForBlackBg";
import SignatureForWhiteBg from "../SVG-JSX/SignatureForWhiteBg/SignatureForWhiteBg";

const BlogsFooter = ({ theme }) => {
  return (
    <div className="footer-bg">
      <div className="footer-container">
        {/* <BlogLetter /> */}
        <span className="footer-txt">
          Enjoyed reading this article 🤓?
          If you're interested in seeing more of my similar work, feel free to check out
          my{" "}
          <a
            href="https://github.com/SahilK-027"
            target="_blank"
            className="link"
          >
            GitHub!
          </a>
        </span>
        <br />
        <span className="footer-txt">
          Have doubts or question regarding this article? Feel free to reach out
          to me on{" "}
          <a
            href="https://github.com/SahilK-027/sahilk027.blog/discussions"
            target="_blank"
            className="link"
          >
            Discussion Forum
          </a>{" "}
        </span>
        <br /> <br /> <br />
        Have a great day! 🚀
        <div className="signature-container">
          <div className="dash">— </div>

          <div className="signature">
            {theme === "dark" ? (
              <SignatureForBlackBg />
            ) : (
              <SignatureForWhiteBg />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsFooter;
