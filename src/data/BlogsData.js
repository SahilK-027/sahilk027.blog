export const blogSeries = [
  {
    seriesTitle: "Three.js Journey: Stepping Into The of 3D Web Development ☘️",
    filterTag: "Threejs Journey",
    seriesID: 1,
    seriesDescription:
      "Embark on an immersive journey into the world of Three.js, a powerful JavaScript library for creating stunning 3D visualizations and experiences on the web. This series of blog posts will guide you from the fundamentals to advanced techniques of Three.js, covering everything from setup to building complex scenes.",
    seriesUrl: `/blogs/three-js-journey`,
    selector: `three-js-journey`,
    seriesDiscussion:
      "https://github.com/sahilk027-blogs/three-js-journey-series/discussions",
    blogsCollection: [1, 2], // blogNo
    startDate: "19th April 2024",
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
    blogDate: "19th May 2024",
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
];

export const mostRecentBlog = blogPost[blogPost.length - 1];
