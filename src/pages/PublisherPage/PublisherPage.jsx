import React, { useState } from "react";
import "./PublisherPage.scss";
import { toast } from "react-toastify";
import Environment from "../../data/Environment";

const PublisherPage = () => {
  const TIMEPASS = "purple@2427";
  let SERVER_LINK = "";
  const env = Environment;
  if (env === "development") {
    SERVER_LINK = "http://localhost:2710";
  } else if (env === "production") {
    SERVER_LINK = "https://api-sk-blog-server.vercel.app";
  }
  const [isMakingNWCall, setIsMakingNWCall] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target.elements.FUNNYWORD.value === TIMEPASS) {
      try {
        setIsMakingNWCall(true);
        const response = await fetch(`${SERVER_LINK}/publishblog`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            journeyName: e.target.elements.journeyName.value,
            blogName: e.target.elements.blogName.value,
            blogDescription: e.target.elements.blogDescription.value,
            blogURL: e.target.elements.blogURL.value,
            apiKey: e.target.elements.apiKey.value,
          }),
        });
        if (response.ok) {
          const res = await response.json();
          toast.success(res.message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          e.target.reset();
        } else {
          const error = await response.json();
          toast.error(error.message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      } catch (error) {
        console.error("Error posting blog:", error);
        toast.error("An error occurred while posting blog.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } finally {
        setIsMakingNWCall(false);
      }
    } else {
      toast.error("Invalid PublisherID! It seems that you are not Sahil 👀", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div className="page publisher-page">
      <div className="publisher-console">
        <h1>Publisher Console</h1>
        <form className="blog-publication-form" onSubmit={handleSubmit}>
          <label>Journey Name</label>
          <input
            type="text"
            name="journeyName"
            placeholder="Enter Series / Journey Title"
            required
          />

          <label>Blog Name</label>
          <input
            type="text"
            name="blogName"
            placeholder="Enter The Latest New Blog Post Name"
            required
          />

          <label>Blog Description</label>
          <input
            type="text"
            name="blogDescription"
            placeholder="Enter Blog Description"
            required
          />

          <label>Blog URL</label>
          <input
            type="text"
            name="blogURL"
            placeholder="Enter Blog URL"
            required
          />

          <label>Publisher ID</label>
          <input
            type="password"
            name="FUNNYWORD"
            placeholder="Enter Publisher ID to validate your identity as sahilk027"
            required
          />

          <label>API Key</label>
          <input
            type="password"
            name="apiKey"
            placeholder="Enter API Key"
            required
          />

          <button
            className="btn"
            type="submit"
            disabled={isMakingNWCall}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isMakingNWCall ? (
              <div className="spinner-loader"></div>
            ) : (
              <span>Publish Blog</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PublisherPage;
