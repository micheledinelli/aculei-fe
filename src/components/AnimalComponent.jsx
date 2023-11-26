import { useState, useEffect } from "react";
import React from "react";

const AnimalComponent = () => {
  const [images, setImages] = useState([]);
  const [fullScreenIndex, setFullScreenIndex] = useState(null);
  const [isInGridMode, setIsInGridMode] = useState(false);
  const [initialPositions, setInitialPositions] = useState([]);

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

  // Function to fetch a new image from the server
  const fetchNewImage = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/image");
      if (response.ok) {
        const imageUrl = URL.createObjectURL(await response.blob());
        const newImage = {
          id: Date.now(),
          url: imageUrl,
          x: Math.random() * (window.innerWidth - 200),
          y: Math.random() * (window.innerHeight - 200),
          width: 200,
          height: 200,
          offsetX: 0,
          offsetY: 0,
          isDragging: false,
          isFullScreen: false,
        };
        setImages((prevImages) => [...prevImages, newImage]);
      } else {
        console.error("Failed to fetch image");
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const spawnRandomImage = () => {
    fetchNewImage();
    if (isInGridMode) {
      // If in grid mode, toggle grid to rearrange images after adding a new image
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
      const updatedImages = [...prevImages];
      updatedImages[index].isDragging = false;
      return updatedImages;
    });
  };

  const toggleGridMode = () => {
    setIsInGridMode((prevMode) => !prevMode);
    if (!isInGridMode) {
      setInitialPositions(
        images.map((image) => ({ id: image.id, x: image.x, y: image.y }))
      );
      // Rearrange images in a grid
      setImages((prevImages) => {
        const updatedImages = [...prevImages];
        const numCols = Math.ceil(Math.sqrt(updatedImages.length));
        const gridSpacing = 20; // Adjust spacing between images in the grid
        let currentRow = 0;
        let currentCol = 0;

        updatedImages.forEach((image, index) => {
          const gridX =
            window.innerWidth / 2 +
            (currentCol - numCols / 2) * (image.width + gridSpacing);
          const gridY =
            window.innerHeight / 2 +
            (currentRow - numCols / 2) * (image.height + gridSpacing);
          image.x = gridX;
          image.y = gridY;

          currentCol++;
          if (currentCol === numCols) {
            currentCol = 0;
            currentRow++;
          }
        });
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

  return (
    <div className="bg-black h-screen text-white">
      <button
        className="inline-block absolute w-full bottom-2 inset-x-0 text-white text-3xl text-center"
        onClick={spawnRandomImage}
      >
        NEW IMAGE
      </button>
      <div
        className="absolute top-0 right-0 m-4 px-4 py-2 z-10"
        onClick={toggleGridMode}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
          />
        </svg>
      </div>

      {isInGridMode ? (
        <div className="w-4/5 h-full m-auto grid grid-cols-auto minmax-200px gap-10 p-10">
          {images.map((image, index) => (
            <React.Fragment key={image.id}>
              {fullScreenIndex === index && image.isFullScreen ? (
                <img
                  src={image.url}
                  alt="Animal"
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    objectFit: "cover",
                    zIndex: 9999,
                  }}
                  onClick={() => toggleFullScreen(index)} // Toggle off when clicked
                />
              ) : (
                <img
                  src={image.url}
                  alt="Animal"
                  style={{
                    position: "absolute",
                    left: image.x,
                    top: image.y,
                    width: image.isFullScreen ? "0" : image.width,
                    height: image.isFullScreen ? "0" : image.height,
                    cursor: image.isDragging ? "grabbing" : "pointer",
                    zIndex: image.isFullScreen ? 0 : 1,
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
      ) : (
        images.map((image, index) => (
          <React.Fragment key={image.id}>
            {fullScreenIndex === index && image.isFullScreen ? (
              <img
                src={image.url}
                alt="Animal"
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  objectFit: "cover",
                  zIndex: 9999,
                }}
                onClick={() => toggleFullScreen(index)} // Toggle off when clicked
              />
            ) : (
              <img
                src={image.url}
                alt="Animal"
                style={{
                  position: "absolute",
                  left: image.x,
                  top: image.y,
                  width: image.isFullScreen ? "0" : image.width,
                  height: image.isFullScreen ? "0" : image.height,
                  cursor: image.isDragging ? "grabbing" : "pointer",
                  zIndex: image.isFullScreen ? 0 : 1,
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
        ))
      )}
    </div>
  );
};

export default AnimalComponent;
