import { Link } from "react-router-dom";
import aculeo from "../assets/aculeo.png";

export default function Navbar({ showHome }: NavbarProps) {
  return (
    <div
      className="flex fixed top-0 left-0 z-10 w-screen justify-between text-5xl font-texgyreheros_regular"
      style={{ backgroundImage: `url(${aculeo})` }}
    >
      <div className="flex gap-40">
        {showHome && (
          <div className="filter invert mix-blend-difference cursor-pointer">
            <Link to="/">HOME</Link>
          </div>
        )}
        <div className="filter invert mix-blend-difference cursor-pointer">
          <Link to="/experience">EXPERIENCE</Link>
        </div>
        <div className="filter invert mix-blend-difference cursor-pointer">
          <Link to="/archive">ARCHIVE</Link>
        </div>
      </div>
      <div className="filter invert mix-blend-difference cursor-pointer">
        <Link to="/about">ABOUT</Link>
      </div>
    </div>
  );
}
