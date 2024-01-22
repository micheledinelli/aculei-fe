import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useScramble } from "use-scramble";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingGif from "../components/LoadingGif";
import AculeiLoader from "../components/AculeiLoader";
import porcuspine from "../assets/porcuspine.gif";
import.meta.env.SERVER_URL;

export default function Archive() {
  const [images, setImages] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [loadingImages, setLoadingImages] = useState(true);
  const navigate = useNavigate();

  const { ref, replay } = useScramble({
    text: "ACULEI",
    speed: 0.6,
    tick: 1,
    step: 1,
    scramble: 4,
    seed: 0,
  });

  const handleHover = (index) => {
    setHoveredIndex(index);
  };

  const handleLeave = () => {
    setHoveredIndex(null);
  };

  const handleImageClick = (image) => {
    navigate(`/archive/${image.sha256}`);
  };

  const fetchNewImage = async () => {
    try {
      let apiUrl = import.meta.env.VITE_SERVER_URL + "api/v1/image";

      const response = await fetch(apiUrl);

      if (response.ok) {
        const imageUrl = URL.createObjectURL(await response.blob());
        const sha256Value = response.headers.get("x-sha256");

        const newImage = {
          id: Date.now(),
          url: imageUrl,
          zIndex: 0,
          sha256: sha256Value,
        };
        setImages((prevImages) => [...prevImages, newImage]);
      } else {
        console.error("Failed to fetch image");
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const fetchMultipleImages = async () => {
    setLoadingImages(true);
    try {
      const totalImagesToFetch = 21;
      for (let i = 0; i < totalImagesToFetch; i++) {
        await fetchNewImage(null);
      }
    } catch (error) {
      console.error("Error fetching multiple images:", error);
    }
  };

  useEffect(() => {
    fetchMultipleImages().then(() => {
      setLoadingImages(false);
    });
  }, []);

  const fetchMore = async () => {
    setTimeout(async () => {
      try {
        const totalImagesToFetch = 21;
        for (let i = 0; i < totalImagesToFetch; i++) {
          await fetchNewImage(null);
        }
      } catch (error) {
        console.error("Error fetching multiple images:", error);
      }
    }, 3000);
  };

  if (loadingImages) {
    return <LoadingGif preference={porcuspine} />;
  }

  return (
    <div className="bg-black h-screen w-full text-white font-noto">
      <Link to={"/"}>
        <h1
          className="text-6xl fixed top-10 left-10 z-20"
          ref={ref}
          onMouseOver={replay}
          onMouseOut={replay}
        ></h1>
      </Link>
      <InfiniteScroll
        dataLength={images.length}
        next={fetchMore}
        hasMore={true}
        loader={<AculeiLoader />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center mx-5">
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative transition-transform transform ${
                hoveredIndex === index ? "scale-110" : "scale-100"
              } ${hoveredIndex === index ? "z-10" : "z-0"}`}
              onMouseEnter={() => handleHover(index)}
              onMouseLeave={handleLeave}
            >
              <img
                src={image.url}
                alt={`Image ${index}`}
                className="w-full object-cover rounded-md cursor-pointer"
                onClick={() => handleImageClick(image)}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
