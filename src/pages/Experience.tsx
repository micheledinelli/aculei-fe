import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footbar from "../components/Footbar";
import { useExperience } from "../contexts/ExperienceContext";

export default function Experience() {
  const { images, setImages } = useExperience();
  const [lastImageSha256, setLastImageSha256] = useState<string | null>(null);
  const [fullScreenIndex, setFullScreenIndex] = useState<number | null>(null);
  const [currentDraggingIndex, setCurrentDraggingIndex] = useState<
    number | null
  >(null);

  useEffect(() => {
    if (images.length > 0) {
      setLastImageSha256(images[images.length - 1].sha256);
    }
  }, [images]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape" && fullScreenIndex !== null) {
        toggleFullScreen(fullScreenIndex);
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [fullScreenIndex]);

  const fetchNewImage = async () => {
    try {
      const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;
      const imagePath = `${VITE_SERVER_URL}/api/v1/selecta/images/random`;

      const response = await fetch(imagePath);

      if (response.ok) {
        const imageUrl = URL.createObjectURL(await response.blob());
        const newImage: Image = {
          id: Date.now(),
          sha256: response.headers.get("X-Sha256") || "",
          url: imageUrl,
          x: Math.random() * (window.innerWidth - 200),
          y: Math.random() * (window.innerHeight - 200),
          width: 300,
          height: 300,
          offsetX: 0,
          offsetY: 0,
          isDragging: false,
          isFullScreen: false,
          zIndex: 0,
          dragStartX: 0,
          dragStartY: 0,
        };
        setImages((prevImages) => [...prevImages, newImage]);
      } else {
        console.error("Failed to fetch image");
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const toggleFullScreen = (index: number) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index].isFullScreen = !updatedImages[index].isFullScreen;
      return updatedImages;
    });

    setFullScreenIndex((prevIndex) => {
      if (prevIndex === index) {
        return null;
      }
      return index;
    });
  };

  const handleMouseDown = (
    e: React.MouseEvent<HTMLImageElement>,
    index: number
  ) => {
    setCurrentDraggingIndex(index);
    e.preventDefault();
    const { clientX, clientY } = e;
    e.persist();
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index].isDragging = true;
      updatedImages[index].dragStartX = clientX - updatedImages[index].x;
      updatedImages[index].dragStartY = clientY - updatedImages[index].y;
      return updatedImages;
    });
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    if (images[index]?.isDragging) {
      const { clientX, clientY } = e;
      setImages((prevImages) => {
        const updatedImages = [...prevImages];
        updatedImages[index].x = clientX - updatedImages[index].dragStartX;
        updatedImages[index].y = clientY - updatedImages[index].dragStartY;
        return updatedImages;
      });
    }
  };

  const handleMouseUp = (index: number) => {
    setImages((prevImages) => {
      const updatedImages = prevImages.map((image, i) => {
        if (i === index) {
          return {
            ...image,
            isDragging: false,
            zIndex: 1,
          };
        }
        return {
          ...image,
          zIndex: 0,
        };
      });
      return updatedImages;
    });
  };

  return (
    <div className="font-texgyreheros_regular">
      <Navbar showHome={true} />
      <div className="bg-black h-screen text-white overflow-hidden flex justify-center items-center">
        <div
          className="md:p-40 custom-cursor camera-border z-10"
          onClick={fetchNewImage}
        ></div>
        <div
          className="absolute top-0 left-0 w-screen h-screen overflow-ellipsis overflow-hidden"
          onMouseMove={(e: React.MouseEvent<HTMLDivElement>) =>
            currentDraggingIndex !== null &&
            handleMouseMove(e, currentDraggingIndex)
          }
        >
          {images.map((image, index) => (
            <React.Fragment key={image.id}>
              {fullScreenIndex === index && image.isFullScreen ? (
                <img
                  src={image.url}
                  className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen h-3/4 object-scale-down z-[9999]"
                  onClick={() => toggleFullScreen(index)}
                />
              ) : (
                <img
                  key={image.id}
                  src={image.url}
                  style={{
                    position: "absolute",
                    left: image.x,
                    top: image.y,
                    width: image.isFullScreen ? "0" : `${image.width}px`,
                    height: image.isFullScreen ? "0" : `${image.height}px`,
                    zIndex: image.isDragging ? 9999 : image.zIndex,
                    objectFit: "cover",
                    transform: image.isFullScreen
                      ? "none"
                      : `translate(-50%, -50%)`,
                  }}
                  onMouseDown={(e) => handleMouseDown(e, index)}
                  onMouseUp={() => handleMouseUp(index)}
                  onDoubleClick={() => toggleFullScreen(index)}
                  className={`${
                    lastImageSha256 === image.sha256
                      ? "border-4 border-green-600"
                      : ""
                  } cursor-move`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      {lastImageSha256 && (
        <Footbar
          key={lastImageSha256}
          path={`selecta/images/${lastImageSha256}`}
        />
      )}
    </div>
  );
}
