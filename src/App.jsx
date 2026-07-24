// Importing necessary libraries and tools
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

// Importing necessary components and pages
import BlogsPage from "./pages/BlogsPage/BlogsPage";
import NotFound from "./pages/404/NotFound";
import CommandCenter from "./components/CommandCenter/CommandCenter";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import AppLoader from "./components/AppLoader/AppLoader";

// Importing necessary data
import { commandShortcuts } from "./data/CommandShortCuts";
import { mdxBlogs } from "./data/blogRegistry";
import BlogLayout from "./blog/BlogLayout";
import { useApp } from "./context/AppContext";
import { useLenis } from "./hooks/useLenis";

/**
 * `App` is the root component. Theme/music/command-center state lives in
 * AppContext (see main.jsx). Every blog is an MDX file auto-registered from its
 * frontmatter — adding a blog needs no changes here.
 */
const App = () => {
  const {
    theme,
    toggleTheme,
    isMusicPlaying,
    controlMusic,
    isCommandCenterOpen,
    openCMDCenter,
    closeCMDCenter,
  } = useApp();

  const [isCommandKeyPressed, setIsCommandKeyPressed] = useState(false);

  useLenis();

  // Props still expected by the (non-blog) pages.
  const commonProps = {
    openCMDCenter,
    controlMusic,
    isMusicPlaying,
    theme,
    toggleTheme,
  };

  // Command-center keyboard shortcuts (hold "G" then press a shortcut key).
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "G" || event.key === "g") setIsCommandKeyPressed(true);
      // ⌘K / Ctrl+K opens the command center
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openCMDCenter();
      }
    };
    const handleKeyUp = (event) => {
      if (event.key === "G" || event.key === "g") setIsCommandKeyPressed(false);
    };
    const handleShortcutKeyPress = (event) => {
      const shortcut = commandShortcuts.find(
        (s) => s.shortcut === event.key.toUpperCase()
      );
      if (isCommandKeyPressed && shortcut) {
        shortcut.action(openCMDCenter, controlMusic, toggleTheme);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("keypress", handleShortcutKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("keypress", handleShortcutKeyPress);
    };
  }, [isCommandKeyPressed]);

  return (
    <>
      <AppLoader />
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <ScrollToTop />
        <Routes>
          <Route path={"/"} element={<BlogsPage {...commonProps} />} />

          {/* Every blog — auto-registered from its MDX frontmatter. */}
          {mdxBlogs.map(({ Component, meta, poster }) => (
            <Route
              key={meta.url}
              path={meta.url}
              element={
                <BlogLayout meta={meta} poster={poster}>
                  <Component />
                </BlogLayout>
              }
            />
          ))}

          <Route path="/*" element={<NotFound {...commonProps} />} />
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
