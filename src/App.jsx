// Importing necessary libraries and tools
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

// Importing necessary components and pages
import BlogsPage from "./pages/BlogsPage/BlogsPage";
import ProjectsPage from "./pages/ProjectsPage/ProjectsPage";
import NotFound from "./pages/404/NotFound";
import CommandCenter from "./components/CommandCenter/CommandCenter";

// Importing necessary data
import { commandShortcuts } from "./data/CommandShortCuts";

/**
 * `App` component is the root component of the application.
 * @returns {JSX.Element} - App component
 */
const App = () => {
  // State to manage the opening and closing of the command center
  const [isCommandCenterOpen, setIsCommandCenterOpen] = useState(false);
  const [isCommandKeyPressed, setIsCommandKeyPressed] = useState(false);

  const body = document.querySelector("body");

  // Function to open the command center
  const openCMDCenter = () => {
    setIsCommandCenterOpen(true);
    body.classList.add("no-scroll");
  };

  // Function to close the command center
  const closeCMDCenter = () => {
    setIsCommandCenterOpen(false);
    body.classList.remove("no-scroll");
  };

  // Event listeners to handle the command center opening and closing
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Control") {
        setIsCommandKeyPressed(true);
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === "Control") {
        setIsCommandKeyPressed(false);
      }
    };

    const handleShortcutKeyPress = (event) => {
      const shortcut = commandShortcuts.find(
        (shortcut) => shortcut.shortcut === event.key.toUpperCase()
      );
      if (isCommandKeyPressed && shortcut) {
        shortcut.action(openCMDCenter);
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
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path={"/"}
            element={<BlogsPage openCMDCenter={openCMDCenter} />}
          />
          <Route
            path="/projects"
            element={<ProjectsPage openCMDCenter={openCMDCenter} />}
          />
          <Route
            path="/*"
            element={<NotFound openCMDCenter={openCMDCenter} />}
          />
        </Routes>
      </BrowserRouter>
      {isCommandCenterOpen && <CommandCenter closeCMDCenter={closeCMDCenter} />}
    </>
  );
};

export default App;
