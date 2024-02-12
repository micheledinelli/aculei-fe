import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footbar from "../components/Footbar";

export default function Landing() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [datasetInfo, setDatasetInfo] = useState<DatasetInfo | null>(null);

  useEffect(() => {
    const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;
    const videoPath = `${VITE_SERVER_URL}/api/v1/video`;
    fetch(videoPath)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.blob();
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
      })
      .catch((e) => {
        console.error("An error occurred while fetching the video:", e);
      });
  }, []);

  useEffect(() => {
    fetch(import.meta.env.VITE_SERVER_URL + "/api/v1/dataset")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((jsonData: DatasetInfo) => {
        setDatasetInfo(jsonData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <Navbar leftPath="/experience" leftText="EXPERIENCE" />
      <div className="absolute z-10 md:text-[16rem] lg:text-[20rem] xl:text-[24rem] bottom-0 filter w-full invert mix-blend-difference overflow-hidden">
        <div className="flex w-full justify-center">ACULEI</div>
      </div>
      <div>
        {videoUrl && (
          <video
            className="fixed w-full h-full object-cover"
            src={videoUrl}
            autoPlay
            loop
          />
        )}
      </div>
      <Footbar datasetInfo={datasetInfo} />
    </div>
  );
}
