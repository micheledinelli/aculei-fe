import { useState } from "react";

export default function SingleExperienceImage({
  image,
  index,
  handleMouseDown,
  handleMouseUp,
  setLastImageSha256,
  lastImageSha256,
  setLastImageDatasetInfo,
  toggleFullScreen,
}: {
  image: Image;
  index: number;
  handleMouseDown: (
    e: React.MouseEvent<HTMLImageElement>,
    index: number
  ) => void;
  handleMouseUp: (e: React.MouseEvent<HTMLImageElement>, index: number) => void;
  lastImageSha256: string;
  setLastImageSha256: (sha256: string) => void;
  setLastImageDatasetInfo: (jsonData: DatasetInfo) => void;
  toggleFullScreen: (index: number) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      style={{
        position: "absolute",
        left: image.businessLogic.x,
        top: image.businessLogic.y,
        width: image.businessLogic.isFullScreen
          ? "0"
          : `${image.businessLogic.width}px`,
        height: image.businessLogic.isFullScreen
          ? "0"
          : `${image.businessLogic.height}px`,
        zIndex: image.businessLogic.isDragging
          ? 50
          : image.businessLogic.zIndex,
        objectFit: "cover",
        transform: image.businessLogic.isFullScreen
          ? "none"
          : `translate(-50%, -50%)`,
      }}
      className={`${
        lastImageSha256 === image.businessLogic.sha256
          ? "border-4 border-green-600"
          : ""
      } cursor-move`}
      key={image.businessLogic.id}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        onClick={() => toggleFullScreen(index)}
        className={`absolute right-0 p-1 cursor-pointer ${
          isHovered ? "text-gray-200" : "text-gray-600"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke={"currentColor"}
          className="w-6 h-6 z[9999]"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
          />
        </svg>
      </div>
      <img
        src={image.businessLogic.url}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        className="z-[9998]"
        onMouseDown={(e) => handleMouseDown(e, index)}
        onMouseUp={(e) => handleMouseUp(e, index)}
        onClick={() => {
          setLastImageSha256(image.businessLogic.sha256);
          setLastImageDatasetInfo(image.imageInfo);
        }}
      />
    </div>
  );
}
