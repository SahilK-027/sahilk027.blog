// This file contains the data for the command shortcuts that are displayed in the command center
import { mostRecentBlog } from "./BlogsData";
const mostRecentBlogLink = mostRecentBlog.blogUrl;

export const commandShortcuts = [
  {
    name: "Menu",
    shortcut: "H",
    action: (openCMDCenter) => openCMDCenter(),
  },
  {
    name: "Blog",
    shortcut: "B",
    action: () => {
      window.open(mostRecentBlogLink, "_self");
    },
  },
  {
    name: "Music",
    shortcut: "M",
    action: (_, controlMusic) => controlMusic(),
  },
  {
    name: "Theme",
    shortcut: "T",
    action: (_, __, toggleTheme) => toggleTheme(),
  },
];

export const cmdItems = [
  {
    title: "Actions",
    navLinks: [
      {
        href: "/projects",
        icon: "fa-solid fa-arrow-right",
        text: "Checkout my project work",
        target: "_self",
      },
      {
        href: mostRecentBlogLink,
        icon: "fa-solid fa-blog",
        text: "Read the most recent blog post",
        target: "_self",
      },
      {
        href: "https://github.com/SahilK-027/sahilk027.blog/discussions",
        icon: "fa-regular fa-lightbulb",
        text: "Suggest a topic for blog",
        target: "_target",
      },
      {
        href: "https://www.dropbox.com/scl/fi/6d224bxcx097fzj0mvter/sahil_k_may_2025.pdf?rlkey=mvmbi16wbfilpzfhfxmfmynhc&st=gi7q6jc3&dl=0",
        icon: "fa-regular fa-file-lines",
        text: "Download my resume",
        target: "_blank",
      },
    ],
  },
  {
    title: "Connect with me",
    navLinks: [
      {
        href: "https://github.com/SahilK-027",
        icon: "fa-brands fa-github",
        text: "Checkout my GitHub",
        target: "_blank",
      },
      {
        href: "https://www.linkedin.com/in/sahilk027/",
        icon: "fa-brands fa-linkedin-in",
        text: "Connect with me on LinkedIn",
        target: "_blank",
      },
      {
        href: "mailto:sahilkandhare027@gmail.com",
        icon: "fa-regular fa-envelope",
        text: "Send me an E-Mail",
        target: "_blank",
      },
    ],
  },
];
