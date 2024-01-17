import React, { useState, useRef } from "react";

const ZoomableImage = ({ imageUrl, altText }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

  const handleZoomToggle = () => {
    setIsZoomed((prevZoom) => !prevZoom);
  };

  const handleMouseDown = (e) => {
    if (isZoomed) {
      setStartPosition({
        x: e.clientX - imageRef.current.offsetLeft,
        y: e.clientY - imageRef.current.offsetTop,
      });
    }
  };

  return (
    <div className="overflow-hidden">
      <img
        src={imageUrl}
        alt={altText}
        onClick={handleZoomToggle}
        onMouseDown={handleMouseDown}
        className={`w-full h-auto transition-transform duration-300 ease-in-out cursor-pointer ${
          isZoomed ? "scale-150" : ""
        }`}
        ref={imageRef}
      />
    </div>
  );
};

export default ZoomableImage;
