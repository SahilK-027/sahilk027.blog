import React, { useState } from "react";
import "./ImageSlider.scss";

const ImageSlider = ({ leftImage, rightImage, caption }) => {
  const [sliderValue, setSliderValue] = useState(50);

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
  };

  return (
    <>
      <div className="image-comparison">
        <div className="image-container">
          <img
            className="left-image"
            src={leftImage}
            alt="img"
            style={{ width: `${sliderValue}%` }}
          />
          <img className="right-image" src={rightImage} alt="img" />
          <div
            className="slider-line"
            style={{ left: `${sliderValue}%` }}
          ></div>
          <div
            className="slider-icon"
            style={{ left: `calc(${sliderValue}% - 18px)` }} // Adjust for centering the icon
          >
            <i className="fa-solid fa-angle-left"></i>
            <i className="fa-solid fa-angle-right"></i>
          </div>
        </div>
        <input
          type="range"
          className="slider"
          min={0}
          max={100}
          value={sliderValue}
          onChange={handleSliderChange}
        />
      </div>
      <div className="caption">
        <p>{caption}</p>
      </div>
    </>
  );
};

export default ImageSlider;
