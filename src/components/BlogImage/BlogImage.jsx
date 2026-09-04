import React from "react";
import { useApp } from "../../context/AppContext";

// Theme falls back to context when not passed explicitly (MDX usage). Legacy
// blogs may still pass `theme`. `src` is a single-image shortcut for MDX where
// only one asset exists; otherwise pass `imgDark`/`imgLight`.
const BlogImage = ({ imgDark, imgLight, src, theme, description, alt }) => {
  const { theme: ctxTheme } = useApp();
  const activeTheme = theme ?? ctxTheme;
  const resolved = src ?? (activeTheme === "dark" ? imgDark : imgLight);
  return (
    <div className="image">
      <img src={resolved} alt={alt ?? description ?? ""} />
      {description && <p>{description}</p>}
    </div>
  );
};

export default BlogImage;
