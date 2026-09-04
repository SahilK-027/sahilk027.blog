import { defineConfig } from "vite";
import dotenv from "dotenv";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

// https://vitejs.dev/config/
dotenv.config();
export default defineConfig({
  plugins: [
    // MDX must run before the React plugin so JSX inside .mdx is transformed.
    {
      enforce: "pre",
      ...mdx({
        // Required for <MDXProvider> to actually inject our component map.
        providerImportSource: "@mdx-js/react",
        remarkPlugins: [
          remarkFrontmatter,
          // Exposes frontmatter as a named `frontmatter` export from each .mdx file.
          [remarkMdxFrontmatter, { name: "frontmatter" }],
          remarkGfm,
        ],
        rehypePlugins: [rehypeSlug],
      }),
    },
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
  ],
  define: {
    "process.env": process.env,
  },
});
