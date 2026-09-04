import { posts } from "./posts";

// Auto-discover every MDX blog under pages/BlogsPage/Blogs. Adding a new blog is
// just dropping a `.mdx` file with `blogNo` frontmatter — no route wiring, no
// App.jsx edit. This replaces the old hand-maintained <Route> list.
const modules = import.meta.glob("../pages/BlogsPage/Blogs/**/*.mdx", {
  eager: true,
});

export const mdxBlogs = Object.values(modules)
  .map((mod) => {
    const blogNo = mod.frontmatter?.blogNo;
    const meta = posts.find((b) => b.blogNo === blogNo);
    if (!meta) {
      console.warn(
        `[blogRegistry] MDX with blogNo=${blogNo} has no matching entry in posts.js.`
      );
      return null;
    }
    // A blog may `export const poster = <.../>` for a custom hero; posts
    // without one render no poster.
    return { Component: mod.default, meta, poster: mod.poster ?? null };
  })
  .filter(Boolean);
