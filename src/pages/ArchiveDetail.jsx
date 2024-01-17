import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useScramble } from "use-scramble";
import ScrambleTest from "../components/ScrambleText";

export default function ArchiveDetail() {
  const { state } = useLocation();
  const [details, setDetails] = useState({});
  const image = state ? state.image : null;

  const { ref, replay } = useScramble({
    text: "ACULEI",
    speed: 0.6,
    tick: 1,
    step: 1,
    scramble: 4,
    seed: 0,
  });

  const fetchDetails = async (sha256) => {
    try {
      let apiUrl =
        import.meta.env.VITE_SERVER_URL + "api/v1/image-detail/" + sha256;

      const response = await fetch(apiUrl);

      if (response.ok) {
        const detailsData = await response.json();
        setDetails(detailsData);
      } else {
        console.error("Failed to fetch image details");
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  useEffect(() => {
    fetchDetails(image.sha256);
  }, []);

  return (
    <div className="bg-black h-screen w-full text-white font-noto overflow-y-scroll">
      <Link to={"/archive"}>
        <h1
          className="text-6xl fixed top-10 left-10 z-20"
          ref={ref}
          onMouseOver={replay}
          onMouseOut={replay}
        ></h1>
      </Link>
      <Link to={"/archive"}>
        <div className="text-6xl fixed top-10 right-10 z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            class="w-14 h-14"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
      </Link>

      <div className="fixed top-1/3 left-10 flex flex-col text-left justify-start items-start">
        {Object.entries(details).map(([key, value]) => (
          <p key={key} className="text-s font-mono">
            <span className="font-bold">{key}:</span>{" "}
            {<ScrambleTest text={String(value)} />}
          </p>
        ))}
      </div>

      <div className="flex items-center justify-center h-screen w-full">
        <div className="w-1/2 h-1/2">
          <img
            src={image.url}
            alt="Image Detail"
            className="rounded-md w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
