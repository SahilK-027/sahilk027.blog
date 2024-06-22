import React from "react";

const BlogImage = ({ imgDark, imgLight, theme, description }) => {
  return (
    <div className="image">
      <img src={theme === "dark" ? imgDark : imgLight}></img>
      <p>{description}</p>
    </div>
  );
};

export default BlogImage;
