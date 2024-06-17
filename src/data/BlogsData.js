export const blogSeries = [
  {
    seriesTitle: "Three.js Journey: Stepping Into The of 3D Web Development ☘️",
    titleColor: `linear-gradient(to right, rgb(255 124 150), rgb(255 227 132))`,
    filterTag: "Threejs Journey",
    seriesID: 1,
    seriesDescription:
      "Embark on an immersive journey into the world of Three.js. This series of blog posts will guide you from the fundamentals to advanced techniques of Three.js, covering everything from setup to building complex scenes.",
    seriesUrl: `/blogs/three-js-journey`,
    selector: `three-js-journey`,
    seriesDiscussion:
      "https://github.com/sahilk027-blogs/three-js-journey-series/discussions",
    blogsCollection: [1, 2], // blogNo
    startDate: "19th April 2024",
  },
  {
    seriesTitle:
      "CS-Fundamentals: Bit Manipulation - Making friends with 0s and 1s! 🖥️",
    titleColor: `linear-gradient(270deg, rgb(86 102 255), rgb(79 241 255))`,
    filterTag: "Bit Manipulation",
    seriesID: 2,
    seriesDescription:
      "Dive into the fun world of bit manipulation! Learn cool tricks like masking, shifting, and toggling bits. Perfect for boosting your coding skills and understanding the logic behind computer operations and algorithms.",
    seriesUrl: `/blogs/cs-fundamentals-bit-manipulation`,
    selector: `cs-fundamentals-bit-manipulation`,
    seriesDiscussion:
      "https://github.com/sahilk027-blogs/cs-fundamentals-bit-manipulation/discussions",
    blogsCollection: [3, 4], // blogNo
    startDate: "15th June 2024",
  },
];

export const blogPost = [
  {
    blogNo: 1,
    seriesID: 1,
    sequenceNumberInSeries: 1,
    seriesTitle: "Three.js Journey",
    filterTag: "Threejs Journey",
    blogTitle: "Introduction to Series: Three.js Journey",
    blogDate: "27th April 2024",
    selector: "introduction-to-series-three-js-journey",
    blogUrl: `/blogs/three-js-journey/introduction-to-series-three-js-journey`,
    seriesUrl: `/blogs/three-js-journey`,
    keywords: [
      "Introduction to Series: Three.js Journey",
      "Three.js",
      "Threejs Journey",
      "WebGL",
      "3D",
      "Intro",
      "three js",
    ],
  },
  {
    blogNo: 2,
    seriesID: 1,
    sequenceNumberInSeries: 2,
    seriesTitle: "Three.js Journey",
    filterTag: "Threejs Journey",
    blogTitle: "Into the 3rd Dimension: Build Your First 3D Project",
    blogDate: "18th May 2024",
    selector: "into-the-3rd-dimension-build-your-first-3d-project",
    blogUrl: `/blogs/three-js-journey/into-the-3rd-dimension-build-your-first-3d-project`,
    seriesUrl: `/blogs/three-js-journey`,
    keywords: [
      `Into the 3rd Dimension: Build Your First 3D Project`,
      "Three.js",
      "Threejs Journey",
      "First 3D Project",
      "three js",
    ],
  },
  {
    blogNo: 3,
    seriesID: 2,
    sequenceNumberInSeries: 1,
    seriesTitle: "Bit Manipulation",
    filterTag: "Bit Manipulation",
    blogTitle: "Let me answer why bit-manipulation?",
    blogDate: "15th June 2024",
    selector: "let-me-answer-why-bit-manipulation",
    blogUrl: `/blogs/cs-fundamentals-bit-manipulation/let-me-answer-why-bit-manipulation`,
    seriesUrl: `/blogs/cs-fundamentals-bit-manipulation`,
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
    seriesID: 2,
    sequenceNumberInSeries: 2,
    seriesTitle: "Bit Manipulation",
    filterTag: "Bit Manipulation",
    blogTitle: "Getting Started with Bit Manipulation Techniques",
    blogDate: "17th June 2024",
    selector: "getting-started-with-bit-manipulation-techniques",
    blogUrl: `/blogs/cs-fundamentals-bit-manipulation/getting-started-with-bit-manipulation-techniques`,
    seriesUrl: `/blogs/cs-fundamentals-bit-manipulation`,
    keywords: [
      "Getting Started with Bit Manipulation Techniques",
      "Bit Manipulation",
      "CS Fundamentals",
      "Bitwise Operators",
      "Bitwise",
      "bitmask",
      "bitset",
    ],
  },
];

export const mostRecentBlog = blogPost[blogPost.length - 1];
