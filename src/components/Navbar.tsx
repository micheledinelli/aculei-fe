import { Link } from "react-router-dom";
import aculeo from "../assets/aculeo.png";

const Navbar: React.FC<NavbarProps> = ({
  leftPath: linkPath,
  leftText: linkText,
}) => {
  return (
    <div
      className="flex fixed top-0 left-0 z-10 w-screen justify-between text-5xl"
      style={{ backgroundImage: `url(${aculeo})` }}
    >
      <div className="flex gap-40">
        <div className="filter invert mix-blend-difference cursor-pointer">
          <Link to={linkPath}>{linkText}</Link>
        </div>
        <div className="filter invert mix-blend-difference cursor-pointer">
          ARCHIVE
        </div>
      </div>
      <div className="filter invert mix-blend-difference cursor-pointer">
        ABOUT
      </div>
    </div>
  );
};

export default Navbar;
