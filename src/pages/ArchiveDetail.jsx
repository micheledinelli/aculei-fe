import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useScramble } from "use-scramble";
import { useNavigate, useParams } from "react-router-dom";
import ScrambleText from "../components/ScrambleText";
import AculeiTitle from "../components/AculeiTitle";

export default function ArchiveDetail() {
  const { state } = useLocation();
  const { id } = useParams();
  const [image, setImage] = useState();

  const [details, setDetails] = useState({});

  const [images, setImages] = useState([]);

  const navigate = useNavigate();

  const { ref, replay } = useScramble({
    text: "ACULEI",
    speed: 0.6,
    tick: 1,
    step: 1,
    scramble: 4,
    seed: 0,
  });

  const handleImageClick = (image) => {
    setImages([]);
    navigate(`/archive/${image.sha256}`, { state: { image } });
  };

  const handleClusterClick = (cluster) => {
    setImages([]);
    navigate(`/clusters/${cluster}`, { state: { cluster } });
  };

  const fetchDetails = async (sha256) => {
    try {
      let apiUrl =
        import.meta.env.VITE_SERVER_URL + "api/v1/image-detail/" + sha256;

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

  return (
    <div
      className="bg-black w-full text-white font-noto overflow-y-scroll"
      id="prova"
    >
      <AculeiTitle />
      <Link to={"/archive"}>
        <div className="text-6xl fixed top-10 right-10 z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-14 h-14"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
      </Link>

      <div className="fixed top-1/3 left-10 z-20">
        {Object.entries(details).map(([key, value]) => (
          <p key={key} className="text-s font-mono">
            <span className="font-bold">{key}:</span>{" "}
            {<ScrambleText text={String(value)} />}
          </p>
        ))}
      </div>

      <div className="flex items-center justify-center h-screen w-full">
        <div className="w-1/2 h-1/2">
          {image && (
            <img
              src={image.url}
              alt="Image Detail"
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center mx-10 my-64">
        {images.map((image, index) => (
          <div key={index}>
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
