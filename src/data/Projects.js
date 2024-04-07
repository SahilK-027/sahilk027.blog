import tr2023 from "../assets/projectThumbnails/trinity-2023.webp";
import innovision from "../assets/projectThumbnails/innovision.webp";
import giticon from "../assets/projectThumbnails/giticon.webp";
import butterfly from "../assets/projectThumbnails/butterfly.webp";
import assemblescript from "../assets/projectThumbnails/assemblescript.webp";
import sight from "../assets/projectThumbnails/sight.webp";
import tr2024 from "../assets/projectThumbnails/trinity-2024.webp";
import particlesGPGPU from "../assets/projectThumbnails/particles-gpgpu.webp";
import ironmanHolograms from "../assets/projectThumbnails/ironman-holograms.webp";

export const Projects = [
  {
    id: 1,
    idSelector: "trinity-2023",
    name: "Trinity 2023",
    thumbnailUrl: tr2023,
    concept: ["3D", "Web", "Full Stack"],
    projectUrl: "/projects/trinity-2023",
    // Detailed Description
    projectTitle: "Trinity 2023: A 3D Interactive Web Experience",
    projectHref: "https://trinity-2023.vercel.app/",
    githubHref: "https://github.com/SahilK-027/Trinity-2023",
    subtitle:
      "A 3D interactive web experience for JSPM RSCOE ACM's boot-camp Trinity 2023",
    detailedDescription: [
      "During the creation of Trinity 2023, I worked on the creation of an immersive 3D web experience using Three.js and Blender. This interactive environment not only served as a visually stunning showcase but also provided practical engagement opportunities, delivering an unforgettable user journey.",

      "To simplify event registration, we integrated a user-friendly participation form. Using the Google Sheet API as the backend, this system effortlessly managed over 100+ overnight registrations, ensuring a hassle-free experience for all participants.",

      "As an additional feature, Trinity 2023 had it's a custom quiz platform build specifically for the event. Around 40 participants used this platform to evaluate their performance, adding an interactive dimension to their engagement with the boot camp.",
    ],
    credits: [
      {
        person: "Abhishek D.",
        role: "Built custom quiz platform",
        profile: "https://github.com/abhishekrd",
      },
    ],
    technicalDescription: [
      "In Trinity 2023, Three.js is used to render immersive 3D visuals, enhancing the overall user experience. Three.js allows for the creation of interactive elements within the 3D environment, enabling users to engage with the content on the website in a dynamic manner. The 3D model of Fighter Drone was built using Blender, a powerful open-source 3D creation suite that offers a wide range of tools for creating high-quality 3D content.",

      "Google Sheets serves as the backend data storage solution for Trinity 2023. Participant registration details and other relevant data are stored in Google Sheets, providing a centralized and easily accessible repository. Used the Google Sheets API to interact with the Google Sheets database programmatically. Through API calls, the website can retrieve data from specific sheets, update records, and perform other operations as required.",

      "MERN stack is used to develop the front end of the Trinity Quiz interface, providing a responsive and fast experience for participants. With the page, we ensure a robust solution that provides an error-free quiz experience for all the participants of Trinity 2023.",
    ],
    techStack: [
      {
        technology: "Three.js",
        useCase:
          "Creating 3D experience and interactive elements on the website",
      },
      {
        technology: "NodeJS",
        useCase: "Backend development and facilitating server-side operations.",
      },
      {
        technology: "MongoDB",
        useCase: "Storing and managing data related to the quiz platform.",
      },
      {
        technology: "Express.js",
        useCase:
          "Building the backend API endpoints and handling HTTP requests.",
      },
      {
        technology: "React.js",
        useCase: "Building the frontend of the quiz platform.",
      },
      {
        technology: "Blender",
        useCase: "Creating 3D models of Fighter Drone and other elements.",
      },
      {
        technology: "Google Sheets API",
        useCase: "Interacting with Google Sheets database programmatically.",
      },
      {
        technology: "Vite (Bundler)",
        useCase:
          "Its efficiency in bundling and optimizing the website's frontend assets.",
      },
    ],
    learnings: [
      {
        title: "3D Interactive Design",
        description:
          "Building an engaging 3D interactive web experience demands a comprehensive grasp of Three.js and Blender. This includes tasks such as designing the 3D environment, and lights, integrating interactive elements seamlessly, and optimizing performance to ensure a smooth user experience. This was my first work in Three.JS, I spent time learning and mastering these tools, experimenting with different design approaches, and fine-tuning performance optimizations to create an immersive and visually captivating experience.",
      },
      {
        title: "Google Sheets Integration",
        description:
          "Integrating Google Sheets as the backend database for the registration system posed its own set of challenges. This required setting up the Google Sheets API, handling data retrieval and updates efficiently, and prioritizing data security and privacy. To address this challenge, I researched the Google Sheets API documentation, implemented a service that handled multiple register requests simultaneously, and ensured data integrity and security throughout the process.",
      },
      {
        title: "Quiz Platform Development",
        description:
          "Developing a custom quiz platform that could handle multiple participants simultaneously and generate ranking results in the end based on score and time taken was a complex task. This involved designing the quiz interface to be intuitive and user-friendly, implementing intricate question logic to cater to various scenarios, and ensuring a seamless user experience from start to finish. To overcome this challenge, me and @Abhishek_D. decided to use the MERN stack to build the front end, and integrated it with Node-express-mongoDB backend as Node.js is known to handle around 1000 requests simultaneously. In the end, we implemented robust error handling and validation mechanisms to ensure a smooth and error-free quiz experience for all participants.",
      },
    ],
  },
  {
    id: 2,
    idSelector: "innovision",
    name: "Innovision",
    thumbnailUrl: innovision,
    concept: ["3D", "Web", "Frontend"],
    projectUrl: "/projects/innovision",
  },
  {
    id: 3,
    idSelector: "giticon",
    name: "Giticon",
    thumbnailUrl: giticon,
    concept: ["3D", "Web", "Frontend"],
    projectUrl: "/projects/giticon",
  },
  {
    id: 4,
    idSelector: "butterfly-experience",
    name: "Butterfly",
    thumbnailUrl: butterfly,
    concept: ["3D Illustration", "Digital Art"],
    projectUrl: "/projects/butterfly-experience",
  },
  {
    id: 5,
    idSelector: "assemblescript",
    name: "AssembleScript",
    thumbnailUrl: assemblescript,
    concept: ["3D", "Web", "Full Stack", "Compiler"],
    projectUrl: "/projects/assemblescript",
  },
  {
    id: 6,
    idSelector: "sight",
    name: "SIGHT Analyzer",
    thumbnailUrl: sight,
    concept: ["ML", "OpenCV", "YoloV8"],
    projectUrl: "/projects/sight",
  },
  {
    id: 7,
    idSelector: "trinity-2024",
    name: "Trinity 2024",
    thumbnailUrl: tr2024,
    concept: ["WebGL", "Web", "Full Stack"],
    projectUrl: "/projects/trinity-2024",
  },
  {
    id: 8,
    idSelector: "particles-gpgpu",
    name: "Particles GPGPU",
    thumbnailUrl: particlesGPGPU,
    concept: ["3D Illustration", "Shaders"],
    projectUrl: "/projects/particles-gpgpu",
  },
  {
    id: 9,
    idSelector: "ironman-holograms",
    name: "Ironman Holograms",
    thumbnailUrl: ironmanHolograms,
    concept: ["3D Illustration", "Shaders"],
    projectUrl: "/projects/ironman-holograms",
  },
];
