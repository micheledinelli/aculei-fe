import { Link, useRouteError } from "react-router-dom";
import wildboar from "../assets/wild-boar.gif";

export default function Error() {
  const error = useRouteError() as any;
  console.error(error);

  return (
    <div className="h-screen w-full font-texgyreheros_regular">
      <div className="mix-blend-difference invert filter absolute left-1/2 top-1/4 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full">
        <div className="flex w-full justify-center m-0 p-0 text-4xl">
          SEEMS LIKE YOU'RE LOST
        </div>
        <div className="text-black flex w-full justify-center text-2xl underline underline-offset-4">
          <Link to="/">GO BACK HOME</Link>
        </div>
      </div>

      <img
        src={wildboar}
        className="w-full h-full object-cover"
        alt="wild boar"
      ></img>
    </div>
  );
}
