// Importing necessary libraries and tools
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Cookies from "js-cookie";

// Importing necessary components and pages
import BlogsPage from "./pages/BlogsPage/BlogsPage";
import ProjectsPage from "./pages/ProjectsPage/ProjectsPage";
import NotFound from "./pages/404/NotFound";
import CommandCenter from "./components/CommandCenter/CommandCenter";

// Importing necessary data
import { commandShortcuts } from "./data/CommandShortCuts";

// Importing Assets
import music from "./assets/audio/ghostrifter-purple-dream.ogg";
import IndividualProject from "./pages/ProjectsPage/IndividualProject/IndividualProject";
import PublisherPage from "./pages/PublisherPage/PublisherPage";
import JourneyPage from "./pages/BlogsPage/JourneyPage/JourneyPage";
import IntroThreeJS from "./pages/BlogsPage/Blogs/ThreeJS Journey/introduction-to-series-three-js-journey/IntroThreeJS";
import First3DProject from "./pages/BlogsPage/Blogs/ThreeJS Journey/into-the-3rd-dimension-build-your-first-3d-project/First3DProject";
import BitManipulationIntro from "./pages/BlogsPage/Blogs/Bit Manipulation/let-me-answer-why-bit-manipulation/BitManipulationIntro";
import GettingStartedWithBitManipulation from "./pages/BlogsPage/Blogs/Bit Manipulation/getting-started-with-bit-manipulation-techniques/GettingStartedBitManipulation";
import ArithmaticsAndMemoryRepresentation from "./pages/BlogsPage/Blogs/Bit Manipulation/exploring-binary-arithmetic-and-memory-representation/ArithmaticsAndMemoryRepresentation";
import TexturesBlog from "./pages/BlogsPage/Blogs/ThreeJS Journey/building-sci-fi-mystery-box-introduction-to-textures/Textures";
import ParticlesBlog from "./pages/BlogsPage/Blogs/ThreeJS Journey/building-an-infinite-particle-background-intro-to-particle-system/Particles";
import RealisticRender from "./pages/BlogsPage/Blogs/ThreeJS Journey/achieving-photorealism-in-3d-a-guide-to-realistic-rendering-techniques/RealisticRender";

/**
 * `App` component is the root component of the application.
 * @returns {JSX.Element} - App component
 */
const App = () => {
  // State to manage the opening and closing of the command center
  const [isCommandCenterOpen, setIsCommandCenterOpen] = useState(false);
  const [isCommandKeyPressed, setIsCommandKeyPressed] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [theme, setTheme] = useState("dark");

  const html = document.querySelector("html");

  // Function to open the command center
  const openCMDCenter = () => {
    setIsCommandCenterOpen(true);
    html.classList.add("no-scroll");
  };

  // Function to close the command center
  const closeCMDCenter = () => {
    setIsCommandCenterOpen(false);
    html.classList.remove("no-scroll");
  };

  // Function to play the background music
  const controlMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  // Function to check for saved theme in cookie
  const checkSavedTheme = () => {
    const savedTheme = Cookies.get("theme");
    if (savedTheme) {
      const html = document.querySelector("html");
      html.dataset.theme = savedTheme;
      setTheme(savedTheme);
    } else {
      Cookies.set("theme", "dark");
    }
  };

  // Function to toggle the theme
  const toggleTheme = () => {
    const html = document.querySelector("html");
    html.dataset.theme = html.dataset.theme === "dark" ? "light" : "dark";
    setTheme(html.dataset.theme);
    Cookies.set("theme", html.dataset.theme);
  };

  // Event listeners to handle the command center opening and closing
  useEffect(() => {
    checkSavedTheme();
    const handleKeyDown = (event) => {
      if (event.key === "G" || event.key === "g") {
        setIsCommandKeyPressed(true);
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === "G" || event.key === "g") {
        setIsCommandKeyPressed(false);
      }
    };

    const handleShortcutKeyPress = (event) => {
      const shortcut = commandShortcuts.find(
        (shortcut) => shortcut.shortcut === event.key.toUpperCase()
      );
      if (isCommandKeyPressed && shortcut) {
        shortcut.action(openCMDCenter, controlMusic, toggleTheme);
      }
    };

    // Adding event listeners
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("keypress", handleShortcutKeyPress);

    // Unsubscribing the event listeners
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("keypress", handleShortcutKeyPress);
    };
  }, [isCommandKeyPressed]);

  useEffect(() => {
    const audio = new Audio(music);
    // Set loop attribute to true
    audio.loop = true;
    audio.volume = 0.8;

    if (isMusicPlaying) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [isMusicPlaying, isCommandKeyPressed]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path={"/"}
            element={
              <BlogsPage
                openCMDCenter={openCMDCenter}
                controlMusic={controlMusic}
                isMusicPlaying={isMusicPlaying}
                theme={theme}
                toggleTheme={toggleTheme}
              />
            }
          />
          <Route
            path="/projects"
            element={
              <ProjectsPage
                openCMDCenter={openCMDCenter}
                controlMusic={controlMusic}
                isMusicPlaying={isMusicPlaying}
                theme={theme}
                toggleTheme={toggleTheme}
              />
            }
          />
          <Route
            path="/projects/:projectName"
            element={
              <IndividualProject
                openCMDCenter={openCMDCenter}
                controlMusic={controlMusic}
                isMusicPlaying={isMusicPlaying}
                theme={theme}
                toggleTheme={toggleTheme}
              />
            }
          />
          <Route
            path="/blogs/:journeyName"
            element={
              <JourneyPage
                openCMDCenter={openCMDCenter}
                controlMusic={controlMusic}
                isMusicPlaying={isMusicPlaying}
                theme={theme}
                toggleTheme={toggleTheme}
              />
            }
          />
          <Route
            path="/blogs/:journeyName/introduction-to-series-three-js-journey"
            element={
              <IntroThreeJS
                openCMDCenter={openCMDCenter}
                controlMusic={controlMusic}
                isMusicPlaying={isMusicPlaying}
                theme={theme}
                toggleTheme={toggleTheme}
              />
            }
          />
          <Route
            path="/blogs/:journeyName/into-the-3rd-dimension-build-your-first-3d-project"
            element={
              <First3DProject
                openCMDCenter={openCMDCenter}
                controlMusic={controlMusic}
                isMusicPlaying={isMusicPlaying}
                theme={theme}
                toggleTheme={toggleTheme}
              />
            }
          />
          <Route
            path="/blogs/:journeyName/let-me-answer-why-bit-manipulation"
            element={
              <BitManipulationIntro
                openCMDCenter={openCMDCenter}
                controlMusic={controlMusic}
                isMusicPlaying={isMusicPlaying}
                theme={theme}
                toggleTheme={toggleTheme}
              />
            }
          />
          <Route
            path="/blogs/:journeyName/getting-started-with-bit-manipulation-techniques-the-basics"
            element={
              <GettingStartedWithBitManipulation
                openCMDCenter={openCMDCenter}
                controlMusic={controlMusic}
                isMusicPlaying={isMusicPlaying}
                theme={theme}
                toggleTheme={toggleTheme}
              />
            }
          />
          <Route
            path="/blogs/:journeyName/exploring-binary-arithmetic-and-memory-representation"
            element={
              <ArithmaticsAndMemoryRepresentation
                openCMDCenter={openCMDCenter}
                controlMusic={controlMusic}
                isMusicPlaying={isMusicPlaying}
                theme={theme}
                toggleTheme={toggleTheme}
              />
            }
          />
          <Route
            path="/blogs/:journeyName/building-sci-fi-mystery-box-introduction-to-textures"
            element={
              <TexturesBlog
                openCMDCenter={openCMDCenter}
                controlMusic={controlMusic}
                isMusicPlaying={isMusicPlaying}
                theme={theme}
                toggleTheme={toggleTheme}
              />
            }
          />
          <Route
            path="/blogs/:journeyName/building-an-infinite-particle-background-intro-to-particle-system"
            element={
              <ParticlesBlog
                openCMDCenter={openCMDCenter}
                controlMusic={controlMusic}
                isMusicPlaying={isMusicPlaying}
                theme={theme}
                toggleTheme={toggleTheme}
              />
            }
          />
          <Route
            path="/blogs/:journeyName/achieving-photorealism-in-3d-a-guide-to-realistic-rendering-techniques"
            element={
              <RealisticRender
                openCMDCenter={openCMDCenter}
                controlMusic={controlMusic}
                isMusicPlaying={isMusicPlaying}
                theme={theme}
                toggleTheme={toggleTheme}
              />
            }
          />
          {/* <Route path="/publisher" element={<PublisherPage />} /> */}
          <Route
            path="/*"
            element={
              <NotFound
                openCMDCenter={openCMDCenter}
                controlMusic={controlMusic}
                isMusicPlaying={isMusicPlaying}
                theme={theme}
                toggleTheme={toggleTheme}
              />
            }
          />
        </Routes>
        {isCommandCenterOpen && (
          <CommandCenter closeCMDCenter={closeCMDCenter} />
        )}
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="dark"
        />
      </BrowserRouter>
    </>
  );
};

export default App;
