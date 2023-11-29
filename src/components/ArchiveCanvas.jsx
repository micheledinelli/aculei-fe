import { useState, useEffect } from "react";
import React from "react";
// import ImageFullScreen from "./ImageFullScreen";
import.meta.env.SERVER_URL;

const ArchiveCanvas = () => {
  const [images, setImages] = useState([]);
  const [fullScreenIndex, setFullScreenIndex] = useState(null);
  const [isInGridMode, setIsInGridMode] = useState(false);
  const [initialPositions, setInitialPositions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e) => {
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
    setIsLoading(true);
    try {
      const response = await fetch(
        import.meta.env.VITE_SERVER_URL + "/api/v1/image"
      );
      if (response.ok) {
        const imageUrl = URL.createObjectURL(await response.blob());
        const newImage = {
          id: Date.now(),
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
        };
        setImages((prevImages) => [...prevImages, newImage]);
      } else {
        console.error("Failed to fetch image");
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const spawnRandomImage = () => {
    fetchNewImage();
    if (isInGridMode) {
      toggleGridMode();
    }
  };

  const toggleFullScreen = (index) => {
    console.log("index", index);
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

  const handleMouseDown = (e, index) => {
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

  const handleMouseMove = (e, index) => {
    if (images[index].isDragging) {
      const { clientX, clientY } = e;
      setImages((prevImages) => {
        const updatedImages = [...prevImages];
        updatedImages[index].x = clientX - updatedImages[index].dragStartX;
        updatedImages[index].y = clientY - updatedImages[index].dragStartY;
        return updatedImages;
      });
    }
  };

  const handleMouseUp = (index) => {
    setImages((prevImages) => {
      const updatedImages = prevImages.map((image, i) => {
        if (i === index) {
          return {
            ...image,
            isDragging: false,
            zIndex: 1, // Set zIndex of the latest dragged image to 1
          };
        }
        return {
          ...image,
          zIndex: 0, // Set zIndex of other images to 0
        };
      });
      return updatedImages;
    });
  };

  const toggleGridMode = () => {
    setIsInGridMode((prevMode) => !prevMode);
    if (!isInGridMode) {
      setInitialPositions(
        images.map((image) => ({ id: image.id, x: image.x, y: image.y }))
      );
      setImages((prevImages) => {
        const updatedImages = [...prevImages];
        return updatedImages;
      });
    } else {
      // Reset images to their original positions
      setImages((prevImages) => {
        const updatedImages = [...prevImages];
        initialPositions.forEach(({ id, x, y }) => {
          const imageIndex = updatedImages.findIndex((img) => img.id === id);
          if (imageIndex !== -1) {
            updatedImages[imageIndex].x = x;
            updatedImages[imageIndex].y = y;
          }
        });
        return updatedImages;
      });
    }
  };

  const gridLayout = (
    <div className="w-4/5 h-full m-auto grid grid-cols-3 gap-6 p-10 overflow-y-scroll">
      {images.map((image, index) => (
        <div key={image.id}>
          {fullScreenIndex === index && image.isFullScreen ? (
            <img
              src={image.url}
              alt=""
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                objectFit: "contain",
                zIndex: 9999,
              }}
              onClick={() => toggleFullScreen(index)} // Toggle off when clicked
            ></img>
          ) : (
            <div
              key={image.id}
              className="relative"
              onDoubleClick={() => toggleFullScreen(index)}
            >
              <img src={image.url} className="w-full h-auto cursor-pointer" />
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const regularLayout = (
    <div className="absolute top-0 left-0 w-screen h-screen">
      {images.map((image, index) => (
        <React.Fragment key={image.id}>
          {fullScreenIndex === index && image.isFullScreen ? (
            <img
              src={image.url}
              className="absolute top-0 left-0 w-screen h-screen object-scale-down z-[9999]"
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
                cursor: image.isDragging ? "grabbing" : "pointer",
                zIndex: image.isDragging ? 9999 : image.zIndex,
                objectFit: "cover",
                transform: image.isFullScreen
                  ? "none"
                  : `translate(-50%, -50%)`,
              }}
              onMouseDown={(e) => handleMouseDown(e, index)}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseUp={() => handleMouseUp(index)}
              onDoubleClick={() => toggleFullScreen(index)}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="bg-black h-screen text-white">
      {isInGridMode ? gridLayout : regularLayout}

      {!isInGridMode && !isLoading ? (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center rounded-lg bg-gray-500 bg-opacity-50 flex text-2xl p-3 z-10">
          <button
            className="mx-2 hover:scale-110"
            onClick={() => spawnRandomImage()}
          >
            ANIMAL
          </button>
          <button
            className="mx-2 hover:scale-110"
            onClick={() => spawnRandomImage()}
          >
            MOON
          </button>
          <button
            className="mx-2 hover:scale-110"
            onClick={() => spawnRandomImage()}
          >
            C° or F°
          </button>
          <button
            className="mx-2 hover:scale-110"
            onClick={() => spawnRandomImage()}
          >
            CAM
          </button>
        </div>
      ) : (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 p-3 z-10 text-white">
          <svg
            viewBox="0 0 1024 1024"
            fill="currentcolor"
            stroke="currentcolor"
            className="w-10 h-10 animate-spin"
          >
            <path d="M512 1024c-69.1 0-136.2-13.5-199.3-40.2C251.7 958 197 921 150 874c-47-47-84-101.7-109.8-162.7C13.5 648.2 0 581.1 0 512c0-19.9 16.1-36 36-36s36 16.1 36 36c0 59.4 11.6 117 34.6 171.3 22.2 52.4 53.9 99.5 94.3 139.9 40.4 40.4 87.5 72.2 139.9 94.3C395 940.4 452.6 952 512 952c59.4 0 117-11.6 171.3-34.6 52.4-22.2 99.5-53.9 139.9-94.3 40.4-40.4 72.2-87.5 94.3-139.9C940.4 629 952 571.4 952 512c0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.2C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3s-13.5 136.2-40.2 199.3C958 772.3 921 827 874 874c-47 47-101.8 83.9-162.7 109.7-63.1 26.8-130.2 40.3-199.3 40.3z" />
          </svg>
        </div>
      )}

      <div
        className="absolute top-0 right-2 m-4 px-4 py-2 z-10 cursor-pointer"
        onClick={toggleGridMode}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
          />
        </svg>
      </div>
    </div>
  );
};

export default ArchiveCanvas;
