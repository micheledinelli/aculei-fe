import aculeo from "../assets/aculeo.png";
export default function Mobile() {
  return (
    <div className="h-screen w-full">
      <div className="mix-blend-difference invert filter absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full">
        <div className="text-center text-2xl">
          VISIT US FROM DESKTOP FOR A BETTER EXPERIENCE
        </div>
      </div>
      <img src={aculeo} alt="aculeo" className="object-cover w-full h-full" />
    </div>
  );
}
