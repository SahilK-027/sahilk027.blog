import React from "react";
import "./VideoGrid.scss";

const VideoGrid = ({ videos }) => {
  const toggleVideo = (videoId) => {
    const video = document.getElementById(videoId);
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <div className="video-grid">
      {Object.entries(videos).map(([videoId, video]) => (
        <div key={videoId} className="video-container">
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => toggleVideo(`${videoId}-video`)}
            onMouseLeave={() => toggleVideo(`${videoId}-video`)}
          >
            <video
              id={`${videoId}-video`}
              src={video.video}
              poster={video.thumbnail}
              loop
              muted
              playsInline
              className="video"
            ></video>
          </a>
        </div>
      ))}
    </div>
  );
};

export default VideoGrid;
