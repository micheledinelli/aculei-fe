import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import ScrambleText from "../components/ScrambleText";
import AculeiTitle from "../components/AculeiTitle";
import ZoomableImage from "../components/ZoomableImage";
import CloseSvg from "../components/CloseSvg";
import LoadingGif from "../components/LoadingGif";

export default function ArchiveDetail() {
  const { id } = useParams();
  const [image, setImage] = useState();
  const [loadingImage, setLoadingImage] = useState(true);
  const [details, setDetails] = useState({});

  const [images, setImages] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    setImages([]);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleImageClick = (image) => {
    setImages([]);
    navigate(`/archive/${image.sha256}`);
  };

  const handleClusterClick = (cluster) => {
    setImages([]);
    navigate(`/clusters/${cluster}`);
  };

  const handleHover = (index) => {
    setHoveredIndex(index);
  };

  const handleLeave = () => {
    setHoveredIndex(null);
  };

  const fetchDetails = async (sha256) => {
    try {
      let apiUrl =
        import.meta.env.VITE_SERVER_URL + "api/v1/image/" + sha256 + "/details";

      const response = await fetch(apiUrl);

      if (response.ok) {
        const detailsData = await response.json();
        setDetails(detailsData);

        for (let i = 0; i < 3; i++) {
          fetchCluster(detailsData.cluster);
        }
      } else {
        console.error("Failed to fetch image details");
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const fetchCluster = async (cluster) => {
    try {
      let apiUrl =
        import.meta.env.VITE_SERVER_URL +
        "api/v1/clusters/" +
        cluster +
        "/image";

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

  const fetchImage = async (id) => {
    setLoadingImage(true);
    try {
      let apiUrl = import.meta.env.VITE_SERVER_URL + "api/v1/image/" + id;

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
        setImage(newImage);
        setLoadingImage(false);
      } else {
        console.error("Failed to fetch image");
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  useEffect(() => {
    fetchImage(id);
    fetchDetails(id);
  }, [id]);

  if (loadingImage) {
    return <LoadingGif />;
  }
  return (
    <div className="bg-black w-full h-full text-white font-noto overflow-x-hidden overflow-y no-scroll">
      <AculeiTitle />
      <Link to={"/archive"}>
        <CloseSvg />
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-5 place-items-center h-screen w-full gap-4 mx-10">
        <div
          className="z-20 md:col-span-1 order-2 md:order-1"
          style={{ transition: "opacity 0.5s" }}
        >
          {Object.entries(details).map(([key, value]) => (
            <p key={key} className="text-s font-mono">
              <span className="font-bold">
                {<ScrambleText text={String(key)} />}:
              </span>{" "}
              {<ScrambleText text={String(value)} />}
            </p>
          ))}
        </div>
        <div className="md:col-span-3 order-1 md:order-2">
          {image && (
            <ZoomableImage
              imageUrl={image.url}
              altText={"Image"}
              className="rounded-md w-full h-full object-contain"
            />
          )}
        </div>
      </div>

      {details && (
        <p className="font-mono text-2xl text-center">
          In the same{" "}
          <span
            className="underline underline-offset-4 cursor-pointer"
            onClick={() => handleClusterClick(details.cluster)}
          >
            <ScrambleText text={"cluster"} />
          </span>
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center mx-10 my-10 md:my-64">
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
    </div>
  );
}
