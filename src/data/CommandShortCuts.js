// This file contains the data for the command shortcuts that are displayed in the command center
import { mostRecentBlog } from "./posts";
const mostRecentBlogLink = mostRecentBlog.url;

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
    title: "Connect",
    navLinks: [
      {
        href: "https://github.com/SahilK-027/sahilk027.blog/discussions",
        icon: "fa-regular fa-lightbulb",
        text: "Suggest a topic for blog",
        target: "_blank",
      },
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
        href: "https://x.com/SahilK027",
        icon: "fa-brands fa-x-twitter",
        text: "Find me on 𝕏 (Twitter)",
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
