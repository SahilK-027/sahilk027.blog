export const blogSeries = [
  {
    seriesTitle: "Three.js Journey",
    filterTag: "Threejs Journey",
    seriesID: 1,
    seriesDescription:
      "Learn Three.js from scratch with this series of blog posts.",
    // blogID
    blogsCollection: [1],
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
    blogDate: "19th April 2024",
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
