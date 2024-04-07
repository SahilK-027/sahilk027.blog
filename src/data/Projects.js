import tr2023 from "../assets/images/projectThumbnails/trinity-2023.webp";
import innovision from "../assets/images/projectThumbnails/innovision.webp";
import giticon from "../assets/images/projectThumbnails/giticon.webp";
import butterfly from "../assets/images/projectThumbnails/butterfly.webp";
import assemblescript from "../assets/images/projectThumbnails/assemblescript.webp";
import sight from "../assets/images/projectThumbnails/sight.webp";
import tr2024 from "../assets/images/projectThumbnails/trinity-2024.webp";
import particlesGPGPU from "../assets/images/projectThumbnails/particles-gpgpu.webp";
import ironmanHolograms from "../assets/images/projectThumbnails/ironman-holograms.webp";

import tr2023Video from "../assets/videos/projectVideos/trinity-2023.mp4";
import innovisionVideo from "../assets/videos/projectVideos/innovision.mp4";
import giticonVideo from "../assets/videos/projectVideos/giticon.mp4";
import butterflyVideo from "../assets/videos/projectVideos/butterfly.mp4";
import assembleScriptVideo from "../assets/videos/projectVideos/assemblescript.mp4";
import sightVideo from "../assets/videos/projectVideos/sight.mp4";
import tr2024Video from "../assets/videos/projectVideos/trinity-2024.mp4";
import particlesGPGPUVideo from "../assets/videos/projectVideos/particles-GPGPU.mp4";
import ironmanHologramsVideo from "../assets/videos/projectVideos/ironman-holograms.mp4";

export const Projects = [
  {
    id: 1,
    idSelector: "trinity-2023",
    name: "Trinity 2023",
    thumbnailUrl: tr2023,
    concept: ["3D", "Web", "Full Stack"],
    projectUrl: "/projects/trinity-2023",
    // Detailed Description
    projectTitle: "Trinity 2023: A 3D Interactive Web Experience 🚀",
    projectHref: "https://trinity-2023.vercel.app/",
    githubHref: "https://github.com/SahilK-027/Trinity-2023",
    subtitle:
      "A 3D interactive web experience for JSPM RSCOE ACM's boot-camp Trinity 2023",
    videoUrl: tr2023Video,
    detailedDescription: [
      "While building Trinity 2023 website, I worked on the creation of an immersive 3D web experience using Three.js and Blender. This interactive environment not only served as a visually stunning showcase but also provided practical engagement opportunities, delivering an unforgettable user journey.",

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
      "In Trinity 2023, we decided to use Three.js to enhance the user experience by rendering immersive 3D visuals on our website. Leveraging Three.js, we were able to create interactive elements within the 3D environment, allowing users to engage dynamically with the content. Additionally, we built the 3D model of the Fighter Drone using Blender, tapping into its extensive toolkit for high-quality 3D content creation.",

      "For backend data storage, we opted for Google Sheets as our solution. All participant registration details and other pertinent data were housed in Google Sheets, offering a centralized and easily accessible repository for our needs. We harnessed the Google Sheets API to interact programmatically with the database, enabling seamless retrieval of data, updating records, and other necessary operations via API calls.",

      "In developing the Trinity Quiz interface, we used the MERN stack to ensure a responsive and seamless experience for participants. With MERN stack,it was easy for use to guarantee an error-free quiz experience and it's evaluation for all participants of Trinity 2023.",
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

    // Detailed Description
    projectTitle:
      "Innovision 2023: An Immersive Web Experience With Abstract 3D Background ⚛",
    projectHref: "https://innovision-2023.vercel.app/",
    subtitle: `Web experience built for JSPM RSCOE's Annual National Level Technical Event "Innovision"`,
    videoUrl: innovisionVideo,
    detailedDescription: [
      "Innovision 2023 is an innovative project developed for JSPM RSCOE's Annual National Level Technical Event, aiming to provide participants with an immersive and engaging web experience. This project stands out with its incorporation of abstract 3D backgrounds, offering a visually captivating environment for users.",

      "One of the key highlights of Innovision 2023 is its use of Three.JS and shaders to create a fully interactive and abstract 3D background. Users will be able to navigate through different sections of the website seamlessly, exploring various elements within the abstract 3D backgrounds.",

      "The website adopts a vibrant and dynamic multicolor theme, adding an element of energy and excitement to the user interface. The combination of bright hues and contrasting tones helps to capture users' attention and create a visually stimulating environment.",
    ],
    credits: [
      {
        person: "Abhishek D.",
        role: "Built chatbot feature",
        profile: "https://github.com/abhishekrd",
      },
    ],
    technicalDescription: [
      "When we embarked on creating Innovision 2023, we knew we wanted to push the boundaries of web design by incorporating immersive 3D graphics. Three.js was the perfect tool for the job. First, we integrated the Three.js library into the project, ensuring seamless access to its powerful functionalities.",

      "With Three.js seamlessly integrated, we began crafting the heart of Innovision 2023 - the 3D abstract background. This canvas served as our stage, where we could bring our abstract backgrounds and interactive elements to life. We meticulously set up the scene, ensuring it provided the perfect backdrop for our event.",

      "Lighting played a crucial role in setting the mood and ambiance of our 3D environment. Drawing from the vast array of lighting options offered by Three.js, we carefully crafted the illumination of our scene, experimenting with different light sources and shading techniques to achieve the desired effect.",

      "User interaction was another key aspect we focused on. We wanted participants to actively engage with our web experience, so we implemented event listeners and controls provided by Three.js. This enabled users to navigate through the scene, interact with objects, and explore the various facets of Innovision 2023 at their own pace.",

      "Optimizing performance was paramount to ensure a smooth and seamless experience for our users. We carefully managed the rendering process, optimized the loading of assets, and fine-tuned the scene to maintain a high level of performance across different devices and browsers. We used techniques such as GPU vertex shader rendering and texture compression to streamline rendering and minimize resource consumption, thus maximizing performance across different devices and screen sizes.",
    ],
    techStack: [
      {
        technology: "Three.js",
        useCase:
          "Creating 3D experience and abstract background on the website",
      },
      {
        technology: "Vanilla JS",
        useCase:
          "Implementing event listeners and controls for user interaction.",
      },
      {
        technology: "Vite (Bundler)",
        useCase:
          "Its efficiency in bundling and optimizing the website's frontend assets.",
      },
    ],
    learnings: [
      {
        title: "Shader Programming:",
        description:
          "One of the most significant learnings from this project has been delving into shaders. I've gained a deeper understanding of how shaders work and their role in creating stunning visual effects within a 3D environment. Experimenting with shaders has opened up new possibilities for manipulating light, textures, and materials, allowing me to achieve custom visual effects and enhance the overall aesthetic appeal of the web experience.",
      },
      {
        title: "Bokeh Pass",
        description:
          "The exploration of bokeh pass has been particularly enlightening. I've learned how to implement this post-processing technique to simulate realistic depth of field effects in the rendered scene. Understanding the intricacies of bokeh pass has enabled me to create visually immersive environments where objects in focus stand out against beautifully blurred backgrounds, adding depth and realism to the 3D scene.",
      },
      {
        title: "Depth Shader",
        description:
          "Another area of learning has been working with depth shaders. By leveraging depth information in the rendering pipeline, I've discovered how to manipulate rendering based on the distance of objects from the camera. Implementing depth shaders has allowed me to achieve effects such as fog, depth-based coloring, and selective rendering, enhancing the visual hierarchy and depth perception within the scene.",
      },
      {
        title: "3D Renderer Pass Optimization",
        description:
          "Throughout the project, I've encountered various challenges related to performance optimization and rendering efficiency. From optimizing shader code to implementing event listeners and handling camera positions, I've used my problem-solving skills and learned how to tackle performance bottlenecks effectively. These experiences have equipped me with valuable strategies for optimizing rendering performance and ensuring smooth user experiences across different devices and screen sizes.",
      },
    ],
  },
  {
    id: 3,
    idSelector: "giticon",
    name: "Giticon",
    thumbnailUrl: giticon,
    concept: ["3D", "Web", "Frontend"],
    githubHref: "https://github.com/SahilK-027/giticon",
    projectUrl: "/projects/giticon",

    // Detailed Description
    projectTitle: "Giticon: An emoji guide for your commit messages. 🎉",
    projectHref: "https://sk027-giticon.vercel.app/",
    subtitle: `The project is not commercial or any standard procedure, but rather my personal preference for using emoticons in commit messages.`,
    videoUrl: giticonVideo,
    detailedDescription: [
      " GitIcon is a project aimed at creating a comprehensive emoji guide for GitHub commit messages. The project serves as a personal preference for using emoticons in commit messages, with the goal of enhancing communication and expressing emotions effectively within the Git version control system.",

      "The project's primary focus is to compile a list of emojis commonly used in commit messages, providing a cheat sheet for developers to reference when composing their own commits. By incorporating emojis into commit messages, developers can add context, convey intent, and inject personality into their contributions to software projects.",

      "One of the standout features of GitIcon is its GitHub-like 3D globe, which is built using Three.js, a popular JavaScript library for creating 3D graphics in web browsers. This interactive globe serves as the main attraction of the project, offering a visually appealing way to explore and navigate through the collection of emojis featured in the guide.",

      "As an open-source project, I actively encouraged contributions from the community, welcoming suggestions for new emojis and improvements to the existing guide.",
    ],
    credits: [],
    technicalDescription: [
      "I chose a selection of emojis commonly used in commit messages, drawing from my own experience and preferences. I structured the guide to be intuitive and easy to navigate, ensuring that developers can quickly find the appropriate emoji for their messages.",

      "One of the standout features of GitIcon is its GitHub-like 3D globe, which I implemented using Three.js, a powerful JavaScript library for creating 3D graphics in web browsers. This interactive globe serves as the centerpiece of the project, offering users a visually engaging way to explore and interact with the collection of emojis featured in the guide.",

      "In terms of technical implementation, I use HTML, CSS, and Vanilla JavaScript to develop the user interface of GitIcon, ensuring compatibility across various web browsers and devices. The interactive functionality of the emoji guide was achieved through JavaScript event handling and DOM manipulation, allowing users to seamlessly browse and select emojis for their commit messages.",
    ],
    techStack: [
      {
        technology: "Three.js",
        useCase: "Building the 3D globe.",
      },
      {
        technology: "Vanilla JS",
        useCase:
          "Implementing event listeners and controls for user interaction.",
      },
      {
        technology: "Vite (Bundler)",
        useCase:
          "Its efficiency in bundling and optimizing the website's frontend assets.",
      },
    ],
    learnings: [
      {
        title: "QuadraticBezierCurve",
        description:
          "I learned about Quadratic Bezier curves in Three.js, which are essential for creating smooth curves and paths in 3D space. Understanding how to manipulate these curves allowed me to implement dynamic and visually appealing animations within the GitIcon project.",
      },
      {
        title: "TubeGeometry",
        description:
          "By exploring TubeGeometry in Three.js, I gained insights into generating tubular geometries based on paths defined by sequences of points.",
      },
    ],
  },
  {
    id: 4,
    idSelector: "butterfly-experience",
    name: "Butterfly",
    thumbnailUrl: butterfly,
    concept: ["3D Illustration", "Digital Art"],
    githubHref: "https://github.com/SahilK-027/Butterfly",
    projectUrl: "/projects/butterfly-experience",

    // Detailed Description
    projectTitle: "Butterfly: Nature's Angels in 3D 🦋",
    projectHref: "https://butterfly-sk027.vercel.app/",
    subtitle: `The project is not commercial, it's just an 3D illustration of a butterfly.`,
    videoUrl: butterflyVideo,
    detailedDescription: [
      "The non-commercial project revolves around the creation of a stunning 3D illustration featuring a butterfly. It's a breathtaking 3D illustration that not only celebrates the beauty of nature but also showcases the limitless potential of digital artistry.",
    ],
    credits: [],
    technicalDescription: [
      "For building this beautiful experience, I opted to go for real-life rendering using R3F (React Three Fiber) and R3F postprocessing. This powerful combination of tools allowed me to bring a level of realism to my digital creations that was previously only achievable through traditional rendering techniques.",

      "With R3F, I was able to seamlessly integrate 3D models and scenes into React applications, To further enhance the visual fidelity of my renders, I incorporated R3F postprocessing. This invaluable toolset allowed me to apply a variety of post-processing effects to my scenes, including the coveted vignette effect. By adding a subtle darkening around the edges of the frame, the vignette effect helped to draw the viewer's eye towards the center of the image, creating a sense of depth and focus that mimics the natural characteristics of real-life photography.",
    ],
    techStack: [
      {
        technology: "React + vite",
        useCase: "Building the frontend of the project.",
      },
      {
        technology: "React Three Fiber",
        useCase: "Integrating 3D models and scenes into React applications.",
      },
    ],
    learnings: [
      {
        title: "R3F 3D Rendering",
        description:
          " I learned the importance of leveraging the capabilities of React Three Fiber to seamlessly import GLB models into my scenes. By utilizing the useLoader hook provided by R3F, I was able to load GLB files efficiently and incorporate them as primitives within my 3D environments.",
      },
      {
        title: "Vignetted Postprocessing",
        description:
          "Additionally, I explored how to apply R3F postprocessing effects to enhance the visual quality of my GLB primitives. By incorporating postprocessing components such as Vignette or Bloom, I was able to add depth and realism to my scenes, further immersing users in the virtual environment.",
      },
    ],
  },
  {
    id: 5,
    idSelector: "assemblescript",
    name: "AssembleScript",
    thumbnailUrl: assemblescript,
    concept: ["Interpreter design", "Full Stack"],
    projectUrl: "/projects/assemblescript",

    // Detailed Description
    projectTitle: "AssembleScript: Unleash Your Inner Avenger... With Code! 🛡️",
    projectHref: "https://assemblescript.vercel.app/",
    githubHref: "https://github.com/AssembleProgramming/AssembleScript",
    subtitle: `Our very own programming language, designed for the true MCU enthusiasts! Forget "print('Hello, World!')", it's time to code vision('Wanda')!`,
    videoUrl: assembleScriptVideo,
    detailedDescription: [
      "AssembleScript is a project revolving around topic of compiler design that brings together the exhilarating world of programming and the captivating universe of the Marvel Cinematic Universe (MCU). Designed for true MCU enthusiasts, AssembleScript introduces a custom programming language inspired by iconic Marvel characters and storylines. With AssembleScript, users can harness the power of coding to embark on thrilling adventures, channeling their inner avenger through lines of code.",

      "At the heart of AssembleScript lies a custom programming language. Drawing inspiration from beloved Marvel characters, locations, and plotlines, the language's syntax and concepts reflect the rich tapestry of the MCU. From declaring variables named after superheroes to invoking functions reminiscent of iconic battles, users are immersed in a coding experience that resonates with their passion for Marvel.",

      "To provide users with a seamless coding experience, we've developed a web-based programming environment that serves as the digital playground for AssembleScript enthusiasts. Within this intuitive and accessible platform, users can write, test, and debug their AssembleScript code in real-time, all from the convenience of their web browsers. The environment features syntax highlighting, code completion, and error feedback, empowering users to code with confidence and precision.",

      "Our team has painstakingly developed an interpreter specifically tailored to execute AssembleScript code. This interpreter serves as the engine that brings AssembleScript to life, translating users' code into machine-readable instructions for execution. With robust error handling and performance optimization, the interpreter ensures the seamless execution of AssembleScript programs, enabling users to bring their coding creations to fruition without hindrance.",

      "In addition to providing a platform for individual coding endeavors, AssembleScript fosters community engagement and friendly competition through its full-stack interface for arranging coding contests. Users can participate in challenges, showcase their coding prowess, and compete with fellow Avengers-in-training in a thrilling coding battleground. The interface facilitates contest management, participant registration, submission evaluation, and winner announcement, creating an immersive and dynamic contest experience for all participants.",
    ],
    credits: [
      {
        person: "Shashank B.",
        role: "Co-creator of AssembleScript, maintain the documentation",
        profile: "https://github.com/shashankbhosagi",
      },
    ],
    technicalDescription: [
      "As the architect behind AssembleScript, I embarked on a thrilling journey to bring together the worlds of coding and the Marvel Cinematic Universe (MCU) through a custom programming language and web-based platform. Here's a detailed account of how I brought this vision to life:",

      "Drawing inspiration from Marvel's iconic characters and narratives, me and my fellow developer designed the syntax and semantics of AssembleScript. Each aspect of the language, from variable declarations to function invocations, was imbued with elements of beloved Marvel heroes, locations, and plotlines. Through this process, I aimed to create a coding experience that resonates deeply with MCU enthusiasts, allowing them to express their creativity and passion for Marvel through lines of code.",

      "To execute AssembleScript code, we first developed a robust interpreter capable of parsing, analyzing, and executing AssembleScript programs. Leveraging TypeScript's powerful type system and modern language features, we implemented the interpreter with a focus on efficiency, reliability, and extensibility. Error handling mechanisms were carefully designed to provide informative feedback to users, guiding them through the debugging process and ensuring a smooth coding experience.",

      "Central to AssembleScript is its web-based programming environment, where users can write, test, and debug their code in real-time. Using React.js, we designed and implemented an intuitive and interactive user interface that seamlessly integrates with the interpreter backend. Syntax highlighting and error feedback were implemented to enhance usability and productivity, allowing users to code with confidence and precision.",
    ],
    techStack: [
      {
        technology: "TypeScript",
        useCase:
          "AssembleScript is developed using TypeScript, leveraging its static typing and modern language features to enhance code quality and maintainability.",
      },
      {
        technology: "React.js",
        useCase:
          "The web-based programming environment of AssembleScript is powered by React.js, enabling the creation of dynamic and interactive user interfaces.",
      },
      {
        technology: "NodeJS",
        useCase:
          "AssembleScript's backend infrastructure is built using NodeJS, facilitating seamless communication between the frontend and backend components of the platform.",
      },
      {
        technology: "MongoDB",
        useCase:
          "MongoDB serves as the database solution for AssembleScript, providing a flexible and scalable storage solution for user profiles, code snippets, contest data, and more.",
      },
      {
        technology: "Bootstrap",
        useCase:
          "AssembleScript's user interface is designed using Bootstrap, ensuring consistency, responsiveness, and accessibility across different devices and screen sizes.",
      },
    ],
    learnings: [
      {
        title: "Language Design Principles",
        description:
          "Designing AssembleScript involved a meticulous exploration of language design principles, including syntax, semantics, and user experience. I learned how to balance creativity with practicality, ensuring that the language not only reflected the essence of the Marvel universe but also remained intuitive and accessible to users of varying skill levels.",
      },
      {
        title: "Interpreter Development",
        description:
          "Developing the interpreter for AssembleScript challenged me to delve into the intricacies of parsing, analyzing, and executing code. I gained a deeper understanding of language processing techniques, error handling strategies, and performance optimization methods, honing my skills in software architecture and algorithm design",
      },
      {
        title: "Project Management",
        description:
          "Managing the entire development lifecycle of AssembleScript provided valuable lessons in project planning, execution, and iteration. I learned how to prioritize tasks, allocate resources effectively, adapt to changing requirements, and iterate based on user feedback, enhancing my project management skills and agile mindset.",
      },
    ],
  },
  {
    id: 6,
    idSelector: "sight",
    name: "SIGHT Analyzer",
    thumbnailUrl: sight,
    concept: ["ML", "OpenCV", "YoloV8"],
    projectUrl: "/projects/sight",

    // Detailed Description
    projectTitle: "SIGHT: Event Detection and Analysis System 👀",
    githubHref: "https://github.com/SahilK-027/SIGHT-Analyzer",
    publicationHref: "https://ijritcc.org/index.php/ijritcc/article/view/6651",
    subtitle: `A video analysis application to generate timestamps for car accidents captured in recorded video footage.`,
    videoUrl: sightVideo,
    detailedDescription: [
      `Welcome to SIGHT, where vision meets intelligence to revolutionize the analysis of traffic incidents. SIGHT stands for "System Identifying Geospatial Hazards and Threats," and it's not just another video analysis application—it's a game-changer in the field of traffic incident management.`,

      "Imagine a scenario where every second counts in responding to a car accident on the road. Traditional methods of analyzing video footage to determine the exact time of an incident can be time-consuming and prone to errors. That's where SIGHT comes in. By leveraging the power of OpenCV and machine learning, SIGHT automates the process of detecting and timestamping car accidents in recorded video footage. It aims to streamline the analysis of traffic incidents, enabling faster response times and more effective incident management.",

      "The implementation of SIGHT has yielded significant improvements in the analysis of traffic incidents, as evidenced by the results:",

      "Precision Improvement: The precision of car accident detection in SIGHT has increased from 91.3% to 93.8%. This means that SIGHT is now more accurate in identifying genuine car accidents, reducing the likelihood of false alarms and incorrect timestamps.",

      "Reduction in False Alarms: The reduction in false alarms percentage, calculated at approximately 28.74%, demonstrates the tangible impact of SIGHT's enhancements. By minimizing false alarms, SIGHT ensures that incident responders can focus their attention on genuine incidents, improving overall response efficiency and effectiveness.",

      "In summary, SIGHT is not just a tool—it's a solution that empowers incident responders with the intelligence and efficiency needed to handle traffic incidents swiftly and effectively. By harnessing the power of computer vision and machine learning, SIGHT redefines the way we approach incident analysis, paving the way for safer and smarter roads.",
    ],
    credits: [
      {
        person: "Saurabh M.",
        role: "Co-creator of SIGHT, Generation of images for training",
        profile: "https://github.com/saurdfsafd",
      },
      {
        person: "Satej T.",
        role: "Co-creator of SIGHT, documentation",
        profile: "https://github.com/saurdfsafd",
      },
      {
        person: "Sanket S.",
        role: "Co-creator of SIGHT, testing",
        profile: "#",
      },
    ],
    technicalDescription: [
      "Building SIGHT was an exciting journey that involved leveraging novel technologies in computer vision and machine learning to create a powerful tool for traffic incident analysis. Here's how I brought this vision to life:",

      "Our first step was to gather a comprehensive dataset of video footage capturing various traffic incidents. This dataset served as the foundation for training our machine learning models. With a curated dataset in hand, we proceeded to fine-tune and train a YOLOv8 model, a state-of-the-art object detection algorithm, to recognize and detect car accidents in video footage.",

      "Once the model was trained and validated, we integrated it into the SIGHT system, leveraging the power of OpenCV for video processing and analysis. OpenCV provided a robust framework for handling video streams, allowing us to extract meaningful insights such as vehicle movements, object detection, and scene analysis in real-time.",

      "On the backend, we developed a full-stack web application using Flask, a lightweight Python web framework, to provide the core functionality of SIGHT. Flask enabled us to handle video uploads, process them through our trained machine learning model, and generate timestamp reports for identified car accidents. Additionally, we used Flask to manage user authentication, access control, and data persistence, ensuring a secure and seamless user experience.",

      "On the frontend, we used React.js, a popular JavaScript library, to create an intuitive and user-friendly interface for interacting with the SIGHT application. The frontend interface allowed users to upload video footage, view real-time analysis results, and access timestamp reports with ease. Through responsive design and dynamic user interactions, we aimed to enhance usability and accessibility across different devices and screen sizes.",

      "The integration of React.js with Flask was achieved using RESTful APIs, enabling smooth communication between the frontend and backend components of the application.",
    ],
    techStack: [
      {
        technology: "YOLOv8",
        useCase:
          "YOLOv8 is used in SIGHT for car accident detection in video footage. By training and fine-tuning the YOLOv8 model on a dataset of traffic incident videos, we enable SIGHT to accurately identify and localize car accidents within recorded footage, providing valuable insights for incident analysis.",
      },
      {
        technology: "OpenCV",
        useCase:
          "OpenCV serves as the backbone of SIGHT's video processing and analysis capabilities. It is used for tasks such as video stream capture, frame manipulation, object detection, and scene analysis. With OpenCV, we extract relevant information from video footage, enabling SIGHT to identify vehicle movements, detect objects, and analyze scenes for potential car accidents.",
      },
      {
        technology: "Flask",
        useCase:
          "In SIGHT, Flask is used for developing the backend infrastructure of the web application. It handles tasks such as video upload, interaction with the machine learning model, generation of timestamp reports, user authentication, and data persistence. Flask enables seamless communication between the frontend and backend components of SIGHT, facilitating the smooth operation of the application.",
      },
      {
        technology: "React.js",
        useCase:
          "React.js powers the frontend interface of SIGHT, providing users with an intuitive and interactive platform for interacting with the application.",
      },
    ],
    learnings: [
      {
        title: "Deep Learning and Computer Vision",
        description:
          "Developing SIGHT involved delving into deep learning techniques and computer vision algorithms, particularly the implementation and fine-tuning of the YOLOv8 model for car accident detection. I learned about neural networks, convolutional layers, loss functions, and optimization techniques, gaining hands-on experience in training and evaluating deep learning models for real-world applications.",
      },
      {
        title: "Data Preparation and Annotation",
        description:
          "Gathering and preparing the dataset for training the machine learning model was a crucial aspect of building SIGHT. I learned the importance of data quality, diversity, and balance, as well as the process of annotating video footage with ground truth labels for training purposes. This experience honed my skills in data preprocessing, annotation tools, and dataset management.",
      },
      {
        title: "Model Training and Evaluation",
        description:
          "Training the YOLOv8 model involved experimenting with different hyperparameters, optimization algorithms, and training strategies to achieve optimal performance. I gained insights into model training workflows, hyperparameter tuning, and techniques for evaluating model performance using metrics such as precision, recall, and F1 score.",
      },
      {
        title: "OpenCV and Video Processing",
        description:
          "Implementing video processing and analysis capabilities in SIGHT using OpenCV was a significant learning experience. I learned about frame manipulation, object detection, feature extraction, and scene analysis techniques, as well as the integration of OpenCV with Python for building real-time applications.",
      },
    ],
  },
  {
    id: 7,
    idSelector: "trinity-2024",
    name: "Trinity 2024",
    thumbnailUrl: tr2024,
    concept: ["WebGL", "Web", "Full Stack"],
    projectUrl: "/projects/trinity-2024",

    // Detailed Description
    projectTitle:
      "Trinity-2024: A 3D Interactive Web Experience with multicolor fluid simulation 🌈",
    projectHref: "https://trinity-2024.vercel.app/",
    subtitle: `Website built for a beginner-friendly live hands-on Boot camp on 3D game development with React Three Fiber.`,
    videoUrl: tr2024Video,
    detailedDescription: [
      "While building Trinity 2024 website, I worked on the creation of an immersive 3D web experience using Three.js and WebGL. The stunning fluid simulation effect not only served as a visually stunning showcase but also provided practical engagement opportunities, delivering an unforgettable user journey.",

      "To simplify event registration, we integrated a user-friendly participation form. Using the Google Sheet API as the backend, this system effortlessly managed over 80+ overnight registrations, ensuring a hassle-free experience for all participants.",

      "As an additional feature, Trinity 2024 had it's a custom project gallery platform build specifically for the participants to showcase their projects. This platform was designed to be interactive and engaging, allowing participants to share their creations with the community and receive feedback on their work.",
    ],
    credits: [
      {
        person: "Shashank B.",
        role: "Co-creator of AssembleScript, maintain the documentation",
        profile: "https://github.com/shashankbhosagi",
      },
    ],
    technicalDescription: [
      "Our frontend with interactive fluid simulation animation is a dynamic and immersive user interface (UI) built to showcase fluid dynamics through interactive animations.",

      "JavaScript was used to implement the interactive fluid simulation animation. We leveraged either WebGL directly or the Three.js library to render high-performance 3D graphics in the browser, enabling smooth and realistic fluid dynamics simulation.",

      "We implemented a fluid simulation algorithm, such as Navie-Stokes equations. The algorithm computes the velocity, pressure, and density of fluid particles based on physical laws.",
    ],
    techStack: [
      {
        technology: "WebGL and Shaders GLSL",
        useCase:
          "WebGL and Shaders GLSL were used to create the fluid simulation effect in the 3D environment.",
      },
      {
        technology: "Vite (Bundler)",
        useCase:
          "Its efficiency in bundling and optimizing the website's frontend assets.",
      },
      {
        technology: "Google Sheets API",
        useCase: "Interacting with Google Sheets database programmatically.",
      },
      {
        technology: "MongoDB",
        useCase: "Storing and managing data related to the quiz platform.",
      },
    ],
    learnings: [
      {
        title: "Navier-Stokes Equation",
        description:
          "I learned that the Navier-Stokes equation is a fundamental partial differential equation that describes the motion of fluid particles in three-dimensional space. Studying the Navier-Stokes equation deepened my understanding of fluid dynamics principles and provided a theoretical foundation for implementing fluid simulation algorithms.",
      },
      {
        title: "Fluid Simulation",
        description:
          "I learned about the computational techniques used to discretize the Navier-Stokes equation and simulate fluid motion on a discrete grid or particle system. Experimenting with these algorithms allowed me to explore the trade-offs between accuracy, stability, and computational efficiency in fluid simulation.",
      },
    ],
  },
  {
    id: 8,
    idSelector: "particles-gpgpu",
    name: "Particles GPGPU",
    thumbnailUrl: particlesGPGPU,
    concept: ["3D Illustration", "Shaders"],
    projectUrl: "/projects/particles-gpgpu",

    // Detailed Description
    projectTitle:
      "Particles-GPGPU: Cool particles effect using GPGPU in Three.js 🌌",
    projectHref: "https://particles-gpgpu-sk027.vercel.app/",
    githubHref: "https://github.com/SahilK-027/0x7444ff",
    subtitle: `A stunning particle effect created using General-Purpose computing on Graphics Processing Units (GPGPU) in Three.js.`,
    videoUrl: particlesGPGPUVideo,
    detailedDescription: [
      "This project is a showcase of 3D graphics, demonstrating the beauty and complexity of particle morphing rendering and flow-field animation. By leveraging WebGL or Three.js, JavaScript, and creative algorithmic techniques, I have created a captivating and interactive experience that pushes the boundaries of web-based visualizations and immersive storytelling.",
    ],
    credits: [],
    technicalDescription: [
      "I implemented a 3D rendering engine capable of rendering thousands of particles in a dynamic and visually appealing manner. By utilizing GPGPU techniques, we harnessed the computational power of the GPU to perform complex calculations and simulations, enabling fluid and responsive particle animations.",

      "Particle morphing techniques, such as vertex displacement or shader manipulation, were employed to create fluid and organic transformations of particle shapes and structures. Through shader programming or procedural generation techniques, I achieved smooth transitions between particle states, creating mesmerizing visual effects that evolve in real-time.",

      "Flowfield animation was implemented to simulate dynamic vector fields that influence the movement and behavior of particles in the scene. Generated flowfields using algorithms such as Perlin noise, simplex noise, or cellular automata, which produce coherent and organic patterns of motion.",
    ],
    techStack: [
      {
        technology: "Three.js",
        useCase:
          "Used Three.js to harness the power of the GPU for high-performance 3D rendering in the browser.",
      },
      {
        technology: "Vite (Bundler)",
        useCase:
          "Its efficiency in bundling and optimizing the website's frontend assets.",
      },
      {
        technology: "Blender",
        useCase:
          "Vertex shading of 3D models for the particle effects using Blender.",
      },
    ],
    learnings: [
      {
        title: "Advanced 3D Graphics Programming",
        description:
          "Implementing real-time 3D particle morphing rendering and flowfield animation required a deep understanding of advanced graphics programming techniques. I learned about advance shader programming, vertex manipulation, and procedural generation, which are essential for creating dynamic and visually stunning particle effects and animations.",
      },
      {
        title: "Optimization and Performance Tuning",
        description:
          "Optimizing rendering performance was crucial for achieving smooth and responsive animations, especially when dealing with a large number of particles and complex flowfield dynamics. I gained insights into GPU acceleration, shader optimization, and culling techniques, which are effective strategies for maximizing rendering efficiency and minimizing computational overhead.",
      },
    ],
  },
  {
    id: 9,
    idSelector: "ironman-holograms",
    name: "Ironman Holograms",
    thumbnailUrl: ironmanHolograms,
    concept: ["3D Illustration", "Shaders"],
    projectUrl: "/projects/ironman-holograms",

    // Detailed Description
    projectTitle: "Ironman Holograms: Cool holograms in Three.js 🩻",
    projectHref: "https://iron-man-sk027.vercel.app/",
    githubHref: "https://github.com/SahilK-027/0x7444ff",
    subtitle: `A stunning ironman hologram effect created using Three.js.`,
    videoUrl: ironmanHologramsVideo,
    detailedDescription: [
      `"Ironman Holograms" is an impressive showcase of holographic visuals brought to life using the power of Three.js. Inspired by the futuristic hologram displays seen in the Ironman movies, this project demonstrates the capabilities of Three.js in creating captivating and immersive 3D experiences.`,
    ],
    credits: [],
    technicalDescription: [
      "The project's seamless integration of Three.js with web technologies allows for smooth performance and responsiveness across different devices and browsers. Whether accessed on desktops, laptops, or mobile devices, users can enjoy the immersive holographic experience without compromising on quality or interactivity.",

      `The holographic effect in "Ironman Holograms" was achieved through a combination of vertex and fragment shaders.`,

      "Vertex shaders were responsible for animating the 3D models of Ironman suits and other holographic elements, creating the illusion of movement and depth. Fragment shaders added visual enhancements to the holographic elements, such as color modulation, specular highlights, and emissive glow effects, simulating the appearance of holographic projections.",
    ],
    techStack: [
      {
        technology: "Three.js",
        useCase:
          "Used Three.js to harness the power of the GPU for high-performance 3D rendering in the browser.",
      },
      {
        technology: "Vite (Bundler)",
        useCase:
          "Its efficiency in bundling and optimizing the website's frontend assets.",
      },
      {
        technology: "Blender",
        useCase: "3D model assembly for the hologram effects using Blender.",
      },
    ],
    learnings: [
      {
        title: "Performance Optimization",
        description:
          "Performance optimization techniques were employed to ensure smooth rendering and responsive interaction, especially when dealing with complex shaders and high-resolution holographic visuals. Techniques such as shader caching, uniform buffering, and shader minification were used to minimize shader compilation times and reduce runtime overhead. dditionally, WebGL features such as instanced rendering and vertex buffer objects (VBOs) were utilized to optimize rendering performance and reduce GPU draw calls.",
      },
    ],
  },
];
