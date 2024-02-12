import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footbar from "../components/Footbar";

export default function Landing() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

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

  return (
    <div className="font-texgyreheros_regular">
      <Navbar showHome={false} />
      <div className="absolute z-10 bottom-8 filter w-full invert mix-blend-difference overflow-hidden m-0 p-0">
        <div className="flex w-full justify-center m-0 p-0" id="title">
          ACULEI
        </div>
      </div>
      <div>
        {videoUrl && (
          <video
            className="fixed w-full h-full object-cover"
            src={videoUrl}
            autoPlay
            muted
            loop
          />
        )}
      </div>
      <Footbar path={"dataset"} />
    </div>
  );
}
