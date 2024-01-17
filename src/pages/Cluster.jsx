import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BarChart from "../components/BarChart";
import { useScramble } from "use-scramble";

export default function Cluster() {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const navigate = useNavigate();

  const { ref, replay } = useScramble({
    text: "FEATURE IMPORTANCE",
    speed: 0.6,
    tick: 1,
    step: 1,
    scramble: 4,
    seed: 0,
  });

  const handleCrossClick = () => {
    navigate(-1);
  };

  const fetchClusterDetails = async (cluster) => {
    try {
      let apiUrl =
        import.meta.env.VITE_SERVER_URL + "api/v1/clusters/" + cluster;

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
    fetchClusterDetails(id);
  }, [id]);

  return (
    <div className="w-full h-screen font-noto bg-black text-white overflow-y-scroll">
      <h1
        className="text-6xl fixed top-10 left-10 z-20 font-mono"
        ref={ref}
        onMouseOver={replay}
        onMouseOut={replay}
      ></h1>
      <div
        className="text-6xl fixed top-10 right-10 z-10"
        onClick={() => handleCrossClick()}
      >
        <button className="btn relative inline-flex items-center justify-start overflow-hidden transition-all group">
          <span className="w-0 h-0 rounded bg-white absolute bottom-0 right-0 ease-out duration-300 transition-all group-hover:w-full group-hover:h-full -z-1"></span>
          <span className="w-full text-white transition-colors duration-300 ease-in-out group-hover:text-black z-10">
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
          </span>
        </button>
      </div>

      <BarChart clusterData={details} clusterId={id} />
    </div>
  );
}
