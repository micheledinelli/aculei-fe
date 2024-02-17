import { useState } from "react";

export default function SingleFullScreenImage({
  image,
  index,
  toggleFullScreen,
}: {
  image: Image;
  index: number;
  toggleFullScreen: (index: number) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div
      className="absolute flex justify-center items-center w-screen h-screen z-20 bg-black bg-opacity-90"
      onClick={() => toggleFullScreen(index)}
    >
      <div
        className={`relative w-[70%] h-[70%] ${
          isHovered ? "text-gray-200" : "text-gray-600"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isLoaded && (
          <div
            className="absolute top-0 right-0 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              toggleFullScreen(index);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25"
              />
            </svg>
          </div>
        )}

        <img
          src={image.businessLogic.url}
          className="w-full h-full object-cover"
          onClick={() => toggleFullScreen(index)}
          onLoad={() => {
            setIsLoaded(true);
          }}
        />
      </div>
    </div>
  );
}
