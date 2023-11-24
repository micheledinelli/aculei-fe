import MainImage from "../assets/main.jpeg";

import { NavLink } from "react-router-dom";

export default function Landing() {
  const title = "ACULEI";
  const about = "ABOUT";
  const archive = "ARCHIVE";

  const aboutPath = "/about";
  const archivePath = "/archive";

  return (
    <div className="h-screen w-full overflow-x-hidden">
      <img className="object-cover w-full h-full" src={MainImage}></img>
      <div className="absolute top-0 left-0 w-full h-2/5 flex flex-row items-center justify-center">
        <div className="text-center w-full text-xxl text-white">{title}</div>
      </div>
      <div className="inline-block absolute w-full bottom-2 inset-x-0 text-white text-3xl text-center">
        <div className="flex flex-row justify-evenly">
          <NavLink to={aboutPath}>{about}</NavLink>
          <NavLink to={archivePath}>{archive}</NavLink>
        </div>
      </div>
    </div>
  );
}
