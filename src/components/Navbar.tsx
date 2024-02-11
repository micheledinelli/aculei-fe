import silvered_theme from "../assets/silvered_theme.jpg";
export default function Navbar() {
  return (
    <div
      className="flex fixed top-0 left-0 z-10 w-screen justify-between text-5xl"
      style={{ backgroundImage: `url(${silvered_theme})` }}
    >
      <div className="flex gap-16">
        <div className="mix-blend-difference cursor-pointer">EXPERIENCE</div>
        <div className="mix-blend-difference cursor-pointer">ARCHIVE</div>
      </div>
      <div className="mix-blend-difference cursor-pointer">ABOUT</div>
    </div>
  );
}
