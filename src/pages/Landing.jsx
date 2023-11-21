import MainImage from "../assets/main.jpeg";

import { NavLink } from "react-router-dom";

export default function Landing() {
  const title = "ACULEI";
  const about = "ABOUT";

  const aboutPath = "/about";

  return (
    <div className="h-screen w-full overflow-hidden">
      <img className="object-cover w-full h-full" src={MainImage}></img>
      <div className="absolute top-0 left-0 w-full h-2/5 flex flex-row items-center justify-center">
        <div className="text-center w-full text-xxl text-white">{title}</div>
      </div>
      <div className="inline-block absolute w-full bottom-2 inset-x-0 text-white text-3xl text-center">
        <NavLink to={aboutPath}>{about}</NavLink>
      </div>
    </div>
  );
}
