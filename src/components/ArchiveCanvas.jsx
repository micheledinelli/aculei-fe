import { useState, useEffect } from "react";
import React from "react";
import CameraSelector from "./CameraSelector";
// import ImageFullScreen from "./ImageFullScreen";
import.meta.env.SERVER_URL;

const ArchiveCanvas = () => {
  const [images, setImages] = useState([]);
  const [fullScreenIndex, setFullScreenIndex] = useState(null);
  const [isInGridMode, setIsInGridMode] = useState(false);
  const [initialPositions, setInitialPositions] = useState([]);
  const [currentDraggingIndex, setCurrentDraggingIndex] = useState(null);
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

  const fetchNewImage = async (cam) => {
    setIsLoading(true);
    try {
      let apiUrl = import.meta.env.VITE_SERVER_URL + "/api/v1/image";
      if (cam !== null && cam !== undefined) {
        apiUrl += `?cam=${cam}`;
      }

      const response = await fetch(apiUrl);

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

  const spawnImage = (cam) => {
    fetchNewImage(cam);
    if (isInGridMode) {
      toggleGridMode();
    }
  };

  const toggleFullScreen = (index) => {
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
    setCurrentDraggingIndex(index);
    e.preventDefault();
    const { clientX, clientY } = e;
    console.log("clientX", clientX);
    console.log("clientY", clientY);
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
    <div
      className="absolute top-0 left-0 w-screen h-screen overflow-ellipsis overflow-hidden"
      onMouseMove={(e) => handleMouseMove(e, currentDraggingIndex)}
    >
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
              // onMouseMove={(e) => handleMouseMove(e, index)}
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
      {/* className="w-4/5 h-full m-auto grid grid-cols-3 gap-6 p-10 overflow-y-scroll" */}
      {/* <div className="absolute top-0 left-0 w-screen h-screen overflow-ellipsis overflow-hidden"></div> */}
      {isInGridMode ? gridLayout : regularLayout}
      {/* <div
        style={{
          position: isInGridMode ? "" : "absolute",
          width: isInGridMode ? "80%" : "100vw",
          height: isInGridMode ? "100%" : "100vh",
          top: isInGridMode ? "" : "0",
          left: isInGridMode ? "" : "0",
          overflow: "hidden",
          display: isInGridMode ? "grid" : "",
          gridTemplateColumns: isInGridMode ? "repeat(3, minmax(0, 1fr))" : "",
          gap: isInGridMode ? "1.5rem" : "",
          padding: isInGridMode ? "2.5rem" : "",
        }}
      >
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
                onClick={() => toggleFullScreen(index)}
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
      </div> */}
      {!isInGridMode ? (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center rounded-lg flex text-2xl p-3 z-10">
          <button className="mx-2 hover:scale-110" onClick={() => spawnImage()}>
            ANIMAL
          </button>
          <button className="mx-2 hover:scale-110" onClick={() => spawnImage()}>
            MOON
          </button>
          <button className="mx-2 hover:scale-110" onClick={() => spawnImage()}>
            C°
          </button>
          <div className="mx-2 hover:scale-110">
            <CameraSelector spawnImageFun={spawnImage} />
          </div>
        </div>
      ) : (
        <></>
      )}
      <div
        className="absolute top-0 right-2 m-4 px-4 py-2 z-10 cursor-pointer"
        onClick={toggleGridMode}
      >
        {isInGridMode ? (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M2.48 0a1.55 1.55 0 100 3.1 1.55 1.55 0 000-3.1zm19.04 0a1.55 1.55 0 100 3.101 1.55 1.55 0 000-3.101zM12 2.295a1.55 1.55 0 100 3.1 1.55 1.55 0 000-3.1zM2.48 5.272a2.48 2.48 0 100 4.96 2.48 2.48 0 000-4.96zm19.04 0a2.48 2.48 0 100 4.96 2.48 2.48 0 000-4.96zM12 8.496a1.55 1.55 0 100 3.1 1.55 1.55 0 000-3.1zm-9.52 3.907a1.55 1.55 0 100 3.1 1.55 1.55 0 000-3.1zm19.04 0a1.55 1.55 0 100 3.102 1.55 1.55 0 000-3.102zM12 13.767a2.48 2.48 0 100 4.962 2.48 2.48 0 000-4.962zm-9.52 3.907a2.48 2.48 0 10.001 4.962 2.48 2.48 0 000-4.962zm19.04.93a1.55 1.55 0 100 3.102 1.55 1.55 0 000-3.101zM12 20.9a1.55 1.55 0 100 3.1 1.55 1.55 0 000-3.1z" />
          </svg>
        ) : (
          <svg fill="currentColor" viewBox="0 0 16 16" className="w-8 h-8">
            <path d="M6 1H1v14h5V1zm9 0h-5v5h5V1zm0 9v5h-5v-5h5zM0 1a1 1 0 011-1h5a1 1 0 011 1v14a1 1 0 01-1 1H1a1 1 0 01-1-1V1zm9 0a1 1 0 011-1h5a1 1 0 011 1v5a1 1 0 01-1 1h-5a1 1 0 01-1-1V1zm1 8a1 1 0 00-1 1v5a1 1 0 001 1h5a1 1 0 001-1v-5a1 1 0 00-1-1h-5z" />
          </svg>
        )}
      </div>
    </div>
  );
};

export default ArchiveCanvas;
