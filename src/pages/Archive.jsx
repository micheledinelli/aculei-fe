import ArchiveCanvas from "../components/ArchiveCanvas";
import { NavLink } from "react-router-dom";

export default function Archive() {
  const home = "HOME";

  return (
    <div className="bg-black text-white h-screen">
      <div className="absolute top-0 left-0 m-4 px-4 py-2 text-3xl hover:underline hover:underline-offset-8 decoration-4 z-10">
        <NavLink to="/">{home}</NavLink>
      </div>
      <div>
        <ArchiveCanvas />
      </div>
    </div>
  );
}
