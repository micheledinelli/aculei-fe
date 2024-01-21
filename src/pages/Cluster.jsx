import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BarChart from "../components/BarChart";
import { useScramble } from "use-scramble";
import CloseSvg from "../components/CloseSvg";

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
        <CloseSvg />
      </div>

      <BarChart clusterData={details} clusterId={id} />
    </div>
  );
}
