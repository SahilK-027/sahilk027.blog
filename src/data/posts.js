// Single flat post registry — replaces the old blogSeries/blogPost split.
// `date` is ISO (drives year grouping + sorting on the landing page),
// `displayDate` is what readers see. `url` is flat: /blogs/<slug> — journey
// path segments are gone along with the series concept.
export const posts = [
  {
    blogNo: 1,
    title: "Introduction to Series: Three.js Journey",
    date: "2024-04-27",
    displayDate: "27th April 2024",
    url: "/blogs/introduction-to-series-three-js-journey",
    tags: ["three.js", "webgl"],
    readtime: "7 min",
    keywords: [
      "Introduction to Series: Three.js Journey",
      "Three.js",
      "WebGL",
      "3D",
      "Intro",
      "three js",
    ],
  },
  {
    blogNo: 2,
    title: "Into the 3rd Dimension: Build Your First 3D Project",
    date: "2024-05-18",
    displayDate: "18th May 2024",
    url: "/blogs/into-the-3rd-dimension-build-your-first-3d-project",
    tags: ["three.js", "webgl"],
    readtime: "15 min",
    keywords: [
      "Into the 3rd Dimension: Build Your First 3D Project",
      "Three.js",
      "First 3D Project",
      "three js",
    ],
  },
  {
    blogNo: 3,
    title: "Let me answer why bit-manipulation?",
    date: "2024-06-15",
    displayDate: "15th June 2024",
    url: "/blogs/let-me-answer-why-bit-manipulation",
    tags: ["bit-manipulation", "cs"],
    readtime: "5 min",
    keywords: [
      "Let me answer why bit-manipulation?",
      "Bit Manipulation",
      "CS Fundamentals",
      "Computer Science",
      "Algorithms",
      "Bitwise Operators",
    ],
  },
  {
    blogNo: 4,
    title: "Getting Started with Bit Manipulation Techniques (The Basics)",
    date: "2024-06-17",
    displayDate: "17th June 2024",
    url: "/blogs/getting-started-with-bit-manipulation-techniques-the-basics",
    tags: ["bit-manipulation", "cs"],
    readtime: "9 min",
    keywords: [
      "Getting Started with Bit Manipulation Techniques The Basics",
      "Bit Manipulation",
      "CS Fundamentals",
      "Bitwise Operators",
      "Bitwise",
      "bitmask",
      "bitset",
    ],
  },
  {
    blogNo: 5,
    title: "Exploring Binary Arithmetic and Memory Representation",
    date: "2024-06-23",
    displayDate: "23rd June 2024",
    url: "/blogs/exploring-binary-arithmetic-and-memory-representation",
    tags: ["bit-manipulation", "cs"],
    readtime: "14 min",
    keywords: [
      "Exploring Binary Arithmetic and Memory Representation",
      "Bit Manipulation",
      "CS Fundamentals",
      "Binary Arithmetic",
      "Memory Representation",
      "Computer Science",
      "Algorithms",
    ],
  },
  {
    blogNo: 6,
    title: "Building Sci-Fi Mystery Box: Introduction to Textures",
    date: "2024-09-04",
    displayDate: "4th September 2024",
    url: "/blogs/building-sci-fi-mystery-box-introduction-to-textures",
    tags: ["three.js", "webgl"],
    readtime: "15 mins",
    keywords: [
      "Building Sci-Fi Mystery Box: Introduction to Textures",
      "Three.js",
      "Textures",
    ],
  },
  {
    blogNo: 7,
    title: "Building an Infinite Particle Background: Intro to Particle System",
    date: "2024-10-02",
    displayDate: "2nd October 2024",
    url: "/blogs/building-an-infinite-particle-background-intro-to-particle-system",
    tags: ["three.js", "webgl"],
    readtime: "10 mins",
    keywords: [
      "Building an Infinite Particle Background: Intro to Particle System",
      "Three.js",
      "Particles",
    ],
  },
  {
    blogNo: 8,
    title:
      "Achieving Photorealism in 3D: A Guide to Realistic Rendering Techniques",
    date: "2024-11-23",
    displayDate: "23rd November 2024",
    url: "/blogs/achieving-photorealism-in-3d-a-guide-to-realistic-rendering-techniques",
    tags: ["three.js", "webgl"],
    readtime: "16 mins",
    keywords: [
      "Achieving Photorealism in 3D: A Guide to Realistic Rendering Techniques",
      "Realistic rendering",
      "3D model",
      "Three JS",
    ],
  },
  {
    blogNo: 9,
    title: "Zero: The Number That Isn’t a Number, or Is It?",
    date: "2025-04-06",
    displayDate: "6th April 2025",
    url: "/blogs/zero-the-number-that-isnt-a-number-or-its-it",
    tags: ["misc"],
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
