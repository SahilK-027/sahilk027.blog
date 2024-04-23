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
    blogsCollection: [1], // blogNo
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
    blogDate: "1st May 2024",
    selector: "introduction-to-series-three-js-journey",
    blogUrl: `/blogs/three-js-journey/introduction-to-series-three-js-journey`,
    keywords: [
      "Introduction to Series: Three.js Journey",
      "Three.js",
      "Threejs Journey",
      "WebGL",
      "3D",
      "Intro",
      "three js",
    ],
    views: 0,
  },
];

export const mostRecentBlog = blogPost[blogPost.length - 1];
