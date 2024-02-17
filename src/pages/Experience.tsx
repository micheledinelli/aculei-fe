import React, { useEffect, useState } from "react";
import Footbar from "../components/Footbar";
import ImageInfo from "../components/ImageInfo";
import Navbar from "../components/Navbar";
import Single300x300Image from "../components/Single300x300Image";
import SingleFullScreenImage from "../components/SingleFullScreenImage";
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
        const squareSize = 322;
        const imageSize = 300;

        let newX, newY;

        newX = Math.random() * (window.innerWidth - imageSize) + 150;
        newY = Math.random() * (window.innerHeight - imageSize) + 150;

        while (
          newX < window.innerWidth / 2 + squareSize / 2 &&
          newX + imageSize > window.innerWidth / 2 - squareSize / 2 &&
          newY < window.innerHeight / 2 + squareSize / 2 &&
          newY + imageSize > window.innerHeight / 2 - squareSize / 2
        ) {
          newX = Math.random() * (window.innerWidth - imageSize) + 150;
          newY = Math.random() * (window.innerHeight - imageSize) + 150;
        }

        newImage = {
          businessLogic: {
            id: Date.now(),
            sha256: sha256,
            url: imageUrl,
            x: newX || 0,
            y: newY || 0,
            width: imageSize,
            height: imageSize,
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
  useEffect(() => {
    console.log(window.innerWidth, window.innerHeight);
  }, []);
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
          className="p-10 md:p-20 lg:p-30 xl:p-28 custom-cursor camera-border z-10"
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
                <SingleFullScreenImage
                  index={index}
                  image={image}
                  toggleFullScreen={toggleFullScreen}
                />
              ) : (
                <Single300x300Image
                  index={index}
                  image={image}
                  handleMouseDown={(e: React.MouseEvent<HTMLImageElement>) =>
                    handleMouseDown(e, index)
                  }
                  handleMouseUp={(e: React.MouseEvent<HTMLImageElement>) =>
                    handleMouseUp(e, index)
                  }
                  setLastImageSha256={setLastImageSha256}
                  lastImageSha256={lastImageSha256!}
                  setLastImageDatasetInfo={setLastImageDatasetInfo}
                  toggleFullScreen={() => toggleFullScreen(index)}
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
