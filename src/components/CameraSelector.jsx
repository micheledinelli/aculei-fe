import { useState } from "react";

const CameraSelector = ({ spawnImageFun }) => {
  const [currentCam, setCurrentCam] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);
  const totalCams = 7;

  const handleButtonClick = () => {
    spawnImageFun(currentCam);
  };

  const handleArrowClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleCamSelection = (camNumber) => {
    setCurrentCam(camNumber);
    setShowDropdown(false);
  };

  return (
    <div className="relative flex justify-center items-center">
      <button onClick={handleButtonClick} className="mx-2">
        CAM{currentCam}
      </button>
      <button onClick={handleArrowClick} className="mx-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
          />
        </svg>
      </button>
      {showDropdown && (
        <div className="bg-white border border-gray-200 w-24 rounded-md shadow-lg text-black overflow-y-auto max-h-12 scroll-smooth snap-y">
          {[...Array(totalCams)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handleCamSelection(index + 1)}
              className="snap-ce"
            >
              CAM{index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CameraSelector;
