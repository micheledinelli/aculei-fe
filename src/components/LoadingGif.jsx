import React from "react";
import ScrambleText from "./ScrambleText";
import wildboar from "../assets/wild-boar.gif";
import porcuspine from "../assets/porcuspine.gif";

function LoadingGif() {
  // Array of gif paths
  const gifPaths = [wildboar, porcuspine];

  // Randomly select a gif path
  const randomGif = gifPaths[Math.floor(Math.random() * gifPaths.length)];

  // const shouldInvert = Math.random() < 0.5;
  // const invertClass = shouldInvert ? "invert" : "";

  return (
    <div
      className={`fixed top-0 left-0 h-full w-full overflow-hidden flex items-center justify-center z-50`}
    >
      <img
        src={randomGif}
        className="w-full h-full object-cover absolute"
        alt="Loading"
      />
      <div className="font-noto text-8xl absolute z-50 text-white">
        <ScrambleText text="Loading" keepmovin={true} />
      </div>
    </div>
  );
}

export default LoadingGif;
