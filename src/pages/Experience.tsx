import React, { useState } from "react";
import Footbar from "../components/Footbar";
import ImageInfo from "../components/ImageInfo";
import Navbar from "../components/Navbar";
import { useExperience } from "../contexts/ExperienceContext";

export default function Experience() {
  const { images, setImages } = useExperience();
  const [lastImageSha256, setLastImageSha256] = useState<string | null>(null);
  const [lastImageDatasetInfo, setLastImageDatasetInfo] =
    useState<DatasetInfo>();
  const [fullScreenIndex, setFullScreenIndex] = useState<number | null>(null);
  const [currentDraggingIndex, setCurrentDraggingIndex] = useState<
    number | null
  >(null);

  const fetchNewImage = () => {
    let newImage: Image | null = null;

    fetch(import.meta.env.VITE_SERVER_URL + "/api/v1/selecta/images/random")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const sha256 = response.headers.get("X-Sha256") || "";
        return Promise.all([response.blob(), sha256]);
      })
      .then(([blob, sha256]) => {
        const imageUrl = URL.createObjectURL(blob);
        newImage = {
          businessLogic: {
            id: Date.now(),
            sha256: sha256,
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
          },
          imageInfo: {},
        };
        return fetch(
          import.meta.env.VITE_SERVER_URL + "/api/v1/selecta/images/" + sha256
        );
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((jsonData: DatasetInfo) => {
        if (newImage) {
          newImage.imageInfo = jsonData;
          setImages((prevImages) => [...prevImages, newImage as Image]);
          setLastImageDatasetInfo(jsonData);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const toggleFullScreen = (index: number) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index].businessLogic.isFullScreen =
        !updatedImages[index].businessLogic.isFullScreen;
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
    e.stopPropagation();
    const { clientX, clientY } = e;
    e.persist();
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index].businessLogic.isDragging = true;
      updatedImages[index].businessLogic.dragStartX =
        clientX - updatedImages[index].businessLogic.x;
      updatedImages[index].businessLogic.dragStartY =
        clientY - updatedImages[index].businessLogic.y;
      return updatedImages;
    });
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    if (images[index]?.businessLogic.isDragging) {
      const { clientX, clientY } = e;
      setImages((prevImages) => {
        const updatedImages = [...prevImages];
        updatedImages[index].businessLogic.x =
          clientX - updatedImages[index].businessLogic.dragStartX;
        updatedImages[index].businessLogic.y =
          clientY - updatedImages[index].businessLogic.dragStartY;
        return updatedImages;
      });
    }
  };

  const handleMouseUp = (
    e: React.MouseEvent<HTMLImageElement>,
    index: number
  ) => {
    e.preventDefault();
    setImages((prevImages) => {
      const updatedImages = prevImages.map((image, i) => {
        if (i === index) {
          return {
            ...image,
            businessLogic: {
              ...image.businessLogic,
              isDragging: false,
              zIndex: 1,
            },
          };
        }
        return {
          ...image,
          businessLogic: {
            ...image.businessLogic,
            zIndex: 0,
          },
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
            <React.Fragment key={image.businessLogic.id}>
              {fullScreenIndex === index && image.businessLogic.isFullScreen ? (
                <img
                  src={image.businessLogic.url}
                  className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen h-4/5 object-scale-down z-[9999]"
                  onClick={() => toggleFullScreen(index)}
                />
              ) : (
                <img
                  key={image.businessLogic.id}
                  src={image.businessLogic.url}
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
                      ? 9999
                      : image.businessLogic.zIndex,
                    objectFit: "cover",
                    transform: image.businessLogic.isFullScreen
                      ? "none"
                      : `translate(-50%, -50%)`,
                  }}
                  onMouseDown={(e) => handleMouseDown(e, index)}
                  onMouseUp={(e) => handleMouseUp(e, index)}
                  onClick={() => {
                    setLastImageSha256(image.businessLogic.sha256);
                    setLastImageDatasetInfo(image.imageInfo);
                  }}
                  onDoubleClick={() => toggleFullScreen(index)}
                  className={`${
                    lastImageSha256 === image.businessLogic.sha256
                      ? "border-4 border-green-600"
                      : ""
                  } cursor-move`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      {lastImageDatasetInfo && (
        <ImageInfo key={lastImageSha256} datasetInfo={lastImageDatasetInfo} />
      )}
      <Footbar />
    </div>
  );
}
