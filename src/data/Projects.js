export const Projects = [
  {
    id: 1,
    idSelector: "trinity-2023",
    name: "Trinity 2023",
    thumbnailUrl:
      "https://ucba91ba7a4b96d9d0a2fde37d73.previews.dropboxusercontent.com/p/thumb/ACM_sPbcGaJ1_lPvKk1QlylOUJqV1NyAgoacyi0rqhjOi1Uue5A3JaVb1PPRAF2gwXVIhRPuddB2CYiAcnHGtWv7xG6Ue509t9zy_iagZa9m51jrw4sCRj0-m3XUAHSbxqsOxU8hdAQahgAA9ZcYUsRCV3KN4Qs_uY65dLyPceEXuuSfmBxt3YusshW9h6Vf3KT2N0k1vQSMDHQuS7ikCBmi-By6fObKYyj0IEoudtF-g-dq3aqUknR_3IbuvCqUHFsA9LoakVSLkQF2G7TuQXYbdjVfPe3upyyiijmQzxzYDPHJzpjiQtgUfllilKzfBPeJn0dF6unbLjoDX24n52cT_wUOsBRxBY8Q2fXnsrxYFakZGjjcEJ2JrjWhK44RC7I/p.png",
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
    thumbnailUrl:
      "https://uca30a52db3871e7e625f8c5bfc7.previews.dropboxusercontent.com/p/thumb/ACNdfLrTeFQ62Gpp1iPTvzzs1BSEsarpzY_TPQur7x7qLyrrteZcQ9nisPu1sc6hGNBMsr5n2zOnwlIcl5zlvLHTr503AwknwvQV4LDgjmuPgCRa9ce7hTRaqASqOlFrGJxgMXmhb2qvB-VifAryH0fWMju_RFux2fKIEBr7b382DUhVBtqKvW63dRGVX0-5DMg_P0HlggBnB3MclglCK3zcYykd5tjubGfel0YKS4e537ylAeNTkQ_YmessGztHvAWJZL6vnZB46_TKHiWEwX4v1BB_dpSoMOMZ7pkieUOIl-dB2-3ZVY7bb9HeeBJqhoMarqWlshHp-mUNJXpOJ8wWj7ZBd0oQp_amzTMDtu3x1dKgpxpzwVKSsiGp6OICOlo/p.png",
    concept: ["3D", "Web", "Frontend"],
    projectUrl: "/projects/innovision",
  },
  {
    id: 3,
    idSelector: "giticon",
    name: "Giticon",
    thumbnailUrl:
      "https://uc04dac08fdf3240fd7954ceabfb.previews.dropboxusercontent.com/p/thumb/ACPOUVEfE3Hk3WBZxnKt43-5o9q378bNBBVxK4O-QzTR2E7nFQsHbpIlG4sSAgIfL42JJUYwQWTkQNOZBR7hFeubPIzrTWsXiAGJUi2WzS7WWAnrjbalo_y38qHLGD0GK9ruCVbzZpRBChDoVAbUbBPxvhQvSTmXagrwKJp5XN4La98k8eDHeTs6UT8LoePUC1n_WBL6mS23cIzXRRSQwOJ-qXbFTGeHFM_fDZj8mwsKPuymAXm9OciSNIPzdiozFc40h8ru2dv7liHmNnRylSisY3Ogm_SzVJS6deYsURe7M1xxhQoOfRUfd7LLi285l0VmGNPpXuHahPvU0RLEauitICezadW0z0of7VjM9RAV8YHSGSnYUequ_V2-UtZdDhI/p.png",
    concept: ["3D", "Web", "Frontend"],
    projectUrl: "/projects/giticon",
  },
  {
    id: 4,
    idSelector: "butterfly-experience",
    name: "Butterfly",
    thumbnailUrl:
      "https://uc73666877a1fc11c5695d8a39b6.previews.dropboxusercontent.com/p/thumb/ACMBO5ei9GCdLGvnUgGimRO5XtDMFk4RnvMRX0icJ9v-5BnDI-jobU_BPEu3lpT4hbWAHPPk6JlwsfyBAgACCCZOSMOjRneK8eOW0gs8Such3LOgjbbpEaksotpzLshVYwUn23qtmjx1tjzKx82tQfGL566Wx7z4SVSmIWiN1WsawhXZMeoXnD3r2c1fEHkdtaH20GzimB2kacw3UPAMgC3sZOJsk-qfkVjSZIC7lH5_TKZ64dpxsmV8-NjyVPCBQFJCFqOxF7M8n_eVW9rTmj44zSir71uAc11dLpWIez78ylnxYnVREuSIlosp1UmT0w101MLyF4fK4kWuoXWgHCgr-ZuEh-NkaOm2WJyJLvg8S8BCgsVtI2xdNGDpp-bYpi4/p.png",
    concept: ["3D Illustration", "Digital Art"],
    projectUrl: "/projects/butterfly-experience",
  },
  {
    id: 5,
    idSelector: "assemblescript",
    name: "AssembleScript",
    thumbnailUrl:
      "https://ucd807e576685c223c9593445abd.previews.dropboxusercontent.com/p/thumb/ACMxpd3oKUXNPpt32Z0gPa_P0sgwVrJvSIzI8u9W4L5dhJ3G3kHiYoRnU19CMlHAqAlS8nbJEin1_zIdQp7S9yR5hRCCgudipIH4YyfkRQ32RfVJbaUfoKatekeFNsO88L9nU8iw-kYiuqmfwLbKlNrHRHfT7NpMltsklI-UE9K317kKiONxh_svbntSCciMiGVQ3T3tuUPhQJVwK5r07OZdw43sss98jJhyZi0XGdCLkxn3rvNjAh1tEs3ewLeyC5leLudugYrl3Z56ztaobLHJ9lPFrg1CyV12aT_lMmfFDpzuQoAsnJY313xo1ZnnlRzEIjBc6MPa-LPbyjgfaPliit3LTZweQuDk7ODru_kluLAH0dpRlp4mlLuraqqNWpk/p.png",
    concept: ["3D", "Web", "Full Stack", "Compiler"],
    projectUrl: "/projects/assemblescript",
  },
  {
    id: 6,
    idSelector: "sight",
    name: "SIGHT Analyzer",
    thumbnailUrl:
      "https://uc0e992ebbe973cba7b9b2f6080b.previews.dropboxusercontent.com/p/thumb/ACMz-G0vvQC83kEHN0hjNtZON5vFEEzGVkZIdUPpfHl1B0WuzSy4aH0JsZhtFd1k9213tix8gG-T8IGoKHwr8yiHhBBHN_FJfgBeXYtqqdOuudvaP-DtS1OGH9gEKjTGchlaDN6xlL4HB2zZC4ZfB6KCTAxz2cyIheFaAPR7S7LSK1Wic9Xk6cDAHWLPNUvjzWnC9wTy6OucXwou0zYNTD33cGNyheQSprlO8ZJ_1ig8bFip2OA2SGvWHb25eGQcVuQIpoDvug2ZO3q5QAnpwwXj8xUSDvdiWGUmc8w9MHD_L_zP18OTE1OeLpe5htr4aATmNuu-1fabsGrP8k5qJyON1mpLb4qP7g2jv49kslvyJSCS1gQ2SGUxxtyVlOcgPfc/p.png",
    concept: ["ML", "OpenCV", "YoloV8"],
    projectUrl: "/projects/sight",
  },
  {
    id: 7,
    idSelector: "trinity-2024",
    name: "Trinity 2024",
    thumbnailUrl:
      "https://ucd3f8aa593a2f95282662037c43.previews.dropboxusercontent.com/p/thumb/ACMIac4Vmgdp08xiRYyiow69vhiYSDJrphec5ktQe28L1ZQgsaypRn03Ke8w_8l9MVYRBPKozd7b2kVYT1LtdHjOseDU1Z_P28v-v5M7vE_EOFD6YoJ4fbqVoBB8B-tM-xbBQ9hc-cHp6Cvs32XSnS7BL_TYYvkeej44Pv_s4inKLRwis_CUD30eAFk0ZbZCX6hI4eNGO5fPilubfNjUrNRgWr5Z8hYNfhZnQqTkWCag9gHKc6CkwqRgx2xRCBB9NSaOl_r6-2SR3Cn2207Zin9AA39zy9ZCB0hK4n4bi-zgpEo7mmM6SfqEVNHlFMixGiQsKH5ZR57950bzQ_x3C52hyfenx9APkE0xpLsdmrcVLBtT2sEZa_-UUWU7x8W85gI/p.png",
    concept: ["WebGL", "Web", "Full Stack"],
    projectUrl: "/projects/trinity-2024",
  },
  {
    id: 8,
    idSelector: "particles-gpgpu",
    name: "Particles GPGPU",
    thumbnailUrl:
      "https://uc7a6b4e50ec23117fa72e7ae7ea.previews.dropboxusercontent.com/p/thumb/ACOk7Q0Fz-ils_xdzxb9hmhebbRzgdbMCh99z9myX6OOn1TfTfNth6wT5NNKkTTKGIIWHql2j2Gn2-Yh3z9nm83bmvU2RvLiskfYm1m-nl5Qom9yBSNtkACtOk__m2iBPwz6sGdiyvdCCNb1_-kDgAElgTyoIVuyiGuqy03ytNwC914OEmNYoGz__XU_C5RkAF_RaO5QB8_uscnnmXYyKB2FrwkCeI8HXisjC7qusbp2hyloAI6nSbT0NAFN4_ARwpqXvphAolgrsfyWCm-Zi2pXnHEYeSF2ZLrDNO0GyRQHrcS1n53A5xpY8qwTJKoN5XAwazSdjUzGV5SnsprsWbe0asMLjcBnJEbFsZ32hkI8k77FlMzpxoOZbR1tAQKRrRM/p.png",
    concept: ["3D Illustration", "Shaders"],
    projectUrl: "/projects/particles-gpgpu",
  },
  {
    id: 9,
    idSelector: "ironman-holograms",
    name: "Ironman Holograms",
    thumbnailUrl:
      "https://uc8fd5ed8ad2e3c359d2808f8b04.previews.dropboxusercontent.com/p/thumb/ACOa8M_b6QSrXSCb17LdonzL9JYeyLhwX8nDAZXSw1U_nEzZ-x3Yzt72mT1jWXCGO6PROasnPdN9ZfEPZLSUHbtnr6X8-rucUIi8lodGyyOiCQx0ZT23OyjgERbsztKV5ZPS-IdLpYsSVqEivXy7dm9f7pbM3qiEta5y0O6dv--IqK4GZSq_VAknM6_rDtKFvox-styu8J47riLKEUa5T6l2fLCnGrXnEcOFW02IhBvYAwSQvQwrCiRg-zONWHC5UfSW7e5Y2WeCwR16t7itk_pdtGXwU5cdK3HM2josjSk3FBjv00gwMK9QZ4G-n-rw2WVmknTL5O1hONsyzvOtcKyopaPjx00VuLcCVlBMSuO0QccB3VP8qDyljU6YgtNW1cY/p.png",
    concept: ["3D Illustration", "Shaders"],
    projectUrl: "/projects/ironman-holograms",
  },
];
