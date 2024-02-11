import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footbar from "../components/Footbar";

export type DatasetInfo = {
  key: string;
  value: number;
};

export default function Landing() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [datasetInfo, setDatasetInfo] = useState<DatasetInfo[]>([]);

  //fetch random video from server
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
    fetch(import.meta.env.VITE_SERVER_URL + `/api/v1/dataset`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // converti la risposta in un oggetto JavaScript
      })
      .then((data) => {
        const dataArray = Object.entries(data).map(([key, value]) => ({
          key,
          value: Number(value),
        }));
        setDatasetInfo(dataArray);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="absolute z-10 md:text-[16rem] lg:text-[20rem] xl:text-[24rem] bottom-0 filter w-full invert mix-blend-difference overflow-hidden">
        <div className="flex w-full justify-start items-end">ACULEI</div>
      </div>
      <div>
        {videoUrl && (
          <video
            className="fixed w-full h-full object-cover"
            src={videoUrl}
            autoPlay
          />
        )}
      </div>
      <Footbar datasetInfo={datasetInfo} />
    </div>
  );
}
