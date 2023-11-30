import { NavLink } from "react-router-dom";

import { useEffect, useState } from "react";

import Video from "../assets/video.mp4";

export default function Landing() {
  const [isMobile, setIsMobile] = useState(false);

  const title = "ACULEI";
  const about = "ABOUT";
  const archive = "ARCHIVE";

  const aboutPath = "/about";
  const archivePath = "/archive";

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // Initial check on component mount
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return (
      <div className="h-screen flex items-center justify-center text-center">
        <p>Please visit us from a desktop for the best experience.</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-full overflow-x-hidden select-none">
      {/* <img className="object-cover w-full h-full" src={MainImage}></img> */}

      <video className=" w-full h-full object-cover" autoPlay loop muted>
        <source src={Video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className=" absolute top-0 left-0 w-screen h-2/5 flex flex-row items-center justify-center">
        <div className="text-center w-full overflow-x-hidden text-[8rem] sm:text-[12rem] md:text-[18rem] lg:text-[18rem] xl:text-[26rem] text-white">
          {title}
        </div>
      </div>
      <div className="inline-block absolute w-full bottom-2 inset-x-0 text-white text-3xl text-cente">
        <div className="flex flex-row justify-center items-center">
          <div className="p-3 m-3 hover:underline hover:underline-offset-8 decoration-4 mix-blend-difference">
            <NavLink to={aboutPath}>{about}</NavLink>
          </div>
          <div className="p-3 m-3 hover:underline hover:underline-offset-8 decoration-4 mix-blend-difference">
            <NavLink to={archivePath}>{archive}</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
