import { NavLink } from "react-router-dom";

import { useEffect, useState } from "react";

import Video from "../assets/video.mp4";

export default function Landing() {
  const [isMobile, setIsMobile] = useState(false);
  const [isSafari, setIsSafari] = useState(false);
  const [videoURL, setVideoURL] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const title = "ACULEI";
  const about = "ABOUT";
  const archive = "ARCHIVE";

  const aboutPath = "/about";
  const archivePath = "/archive";

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsSafari(
      /constructor/i.test(window.HTMLElement) ||
        (function (p) {
          return p.toString() === "[object SafariRemoteNotification]";
        })(
          !window["safari"] ||
            (typeof safari !== "undefined" && safari.pushNotification)
        )
    );
  }, []);

  useEffect(() => {
    let apiUrl = import.meta.env.VITE_SERVER_URL + "api/v1/video";

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setVideoURL(url);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("There was a problem fetching the video:", error);
      });
  }, []);

  if (isMobile) {
    return (
      <div className="h-screen flex items-center justify-center text-center">
        <p>Please visit us from a desktop for the best experience.</p>
      </div>
    );
  }

  if (isSafari) {
    return (
      <div className="h-screen flex items-center justify-center text-center">
        <p>Please visit us from another browser for the best experience.</p>
      </div>
    );
  }

  return (
    // Showing the fetched video, if an error occurs than we fallback to the existing one
    <div className="h-screen w-full overflow-x-hidden select-none">
      {isLoading && ( // Show spinner while video is loading
        <div className="h-screen flex items-center justify-center">
          <p>Loading</p>
        </div>
      )}
      {!isLoading && !videoURL && (
        <video className=" w-full h-full object-cover" autoPlay loop muted>
          <source src={Video} type="video/mp4" />
        </video>
      )}
      {!isLoading && videoURL && (
        <video className="w-full h-full object-cover" autoPlay loop>
          <source src={videoURL} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      )}
      <div className="absolute top-0 left-0 w-screen h-2/5 flex flex-row items-center justify-center">
        <div className="text-center w-full overflow-x-hidden text-[8rem] sm:text-[12rem] md:text-[18rem] lg:text-[18rem] xl:text-[26rem] text-white">
          {title}
        </div>
      </div>
      <div className="inline-block absolute w-full bottom-2 inset-x-0 text-white text-3xl text-cente">
        <div className="flex flex-row justify-center items-center">
          <div className="p-3 m-3 rounded-md mix-blend-difference hover:bg-black hover:text-white hover:mix-blend-normal">
            <NavLink to={aboutPath}>{about}</NavLink>
          </div>
          <div className="p-3 m-3 rounded-md mix-blend-difference hover:bg-black hover:text-white hover:mix-blend-normal">
            <NavLink to={archivePath}>{archive}</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
