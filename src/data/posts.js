// Single flat post registry — replaces the old blogSeries/blogPost split.
// `date` is ISO (drives year grouping + sorting on the landing page),
// `displayDate` is what readers see. `url` is flat: /blogs/<slug> — journey
// path segments are gone along with the series concept.
export const posts = [
  {
    // Merged rewrite of the two old bit-manipulation posts, which are gone.
    blogNo: 2,
    title: "How Does a Computer Store -1 When All It Has Is 0s and 1s?",
    date: "2026-07-25",
    displayDate: "25th July 2026",
    url: "/blogs/how-computers-store-negative-numbers",
    tags: ["bits"],
    readtime: "14 min",
    keywords: [
      "How Does a Computer Store -1",
      "Two's Complement",
      "Sign Bit",
      "Integer Overflow",
      "Bit Manipulation",
      "CS Fundamentals",
      "Binary Number System",
      "Signed Integers",
      "Memory Representation",
    ],
  },
  {
    blogNo: 7,
    title: "Zero: The Number That Isn’t a Number, or Is It?",
    date: "2025-04-06",
    displayDate: "6th April 2025",
    url: "/blogs/zero-the-number-that-isnt-a-number-or-its-it",
    tags: ["math"],
    readtime: "12 min",
    keywords: [
      "Zero: The Number That Isn’t a Number, or Is It?",
      "Random writings",
      "Aryabhata",
    ],
  },
];

export const allTags = [...new Set(posts.flatMap((p) => p.tags))].sort();

// Newest first — canonical ordering for lists, prev/next, and "latest post".
export const postsByDateDesc = [...posts].sort((a, b) =>
  b.date.localeCompare(a.date)
);

export const mostRecentBlog = postsByDateDesc[0];
