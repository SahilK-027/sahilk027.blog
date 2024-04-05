// This file contains the data for the command shortcuts that are displayed in the command center
export const commandShortcuts = [
  {
    name: "Menu",
    shortcut: "H",
    action: (openCMDCenter) => openCMDCenter(),
  },
  {
    name: "Blog",
    shortcut: "B",
    action: () => console.log("Navigating to random blog"),
  },
  {
    name: "Music",
    shortcut: "M",
    action: () => console.log("Navigating to random blog"),
  },
  {
    name: "Theme",
    shortcut: "T",
    action: () => {
      const html = document.querySelector("html");
      html.dataset.theme = html.dataset.theme === "dark" ? "light" : "dark";
    },
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
        href: "",
        icon: "fa-solid fa-blog",
        text: "Read the most recent blog post",
        target: "_self",
      },
      {
        href: "",
        icon: "fa-regular fa-lightbulb",
        text: "Suggest a topic for blog",
        target: "_self",
      },
      {
        href: "https://www.dropbox.com/scl/fi/o9ks6egn520k1qycbzw0s/resume.pdf?rlkey=p7b0d25l1an8grc1hixtddc34&dl=0",
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
        text: "Follow me on GitHub",
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
