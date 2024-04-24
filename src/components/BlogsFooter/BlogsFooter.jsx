import React from "react";
import "./BlogsFooter.scss";
import BlogLetter from "../BlogsLetter/BlogLetter";
import SignatureForBlackBg from "../SVG-JSX/SignatureForBlackBg/SignatureForBlackBg";
import SignatureForWhiteBg from "../SVG-JSX/SignatureForWhiteBg/SignatureForWhiteBg";

const BlogsFooter = ({ theme }) => {
  return (
    <div className="footer-bg">
      <div className="footer-container">
        <span className="footer-txt">
          Enjoyed reading this article 🤓? Stay updated with the latest
          insights, and news from my blog by subscribing to my blogsletter. By
          subscribing, you'll receive regular updates directly to your inbox,
          keeping you informed and engaged with the latest content. Don't miss
          out on valuable information and exclusive updates—subscribe now to
          join our community of readers and stay connected!
        </span>
        <BlogLetter />
        <span className="footer-txt">
          Want to show your appreciation 😊? give this{" "}
          <a
            href="https://github.com/SahilK-027/sahilk027.blog"
            target="_blank"
            className="link"
          >
            project repository
          </a>{" "}
          star ⭐️ <br />
          Feeling extra appreciative? Follow me on
          <a
            href="https://github.com/SahilK-027"
            target="_blank"
            className="link"
          >
            GitHub
          </a>{" "}
          for even more appreciation 😂
        </span>
        <br />
        <span className="footer-txt">
          Have doubts or question regarding this article? Feel free to reach out
          to me on{" "}
          <a
            href="https://github.com/sahilk027-blogs"
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
