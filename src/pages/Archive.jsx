import AnimalComponent from "../components/AnimalComponent";
import { NavLink } from "react-router-dom";

export default function Archive() {
  const home = "HOME";

  return (
    <div className="bg-black text-white h-screen cursor-pointer">
      <div className="absolute top-0 left-0 m-4 px-4 py-2 text-3xl hover:underline hover:underline-offset-8 decoration-4 z-10">
        <NavLink to="/">{home}</NavLink>
      </div>
      <div>
        <AnimalComponent />
      </div>
      {/* <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center rounded-lg bg-black bg-opacity-50 z-10">
        <div className="flex space-x-4 rounded-md text-2xl p-1">
          <button className="px-4 py-2 rounded-lg hover:scale-110">
            ANIMAL
          </button>
          <button className="px-4 py-2 rounded-lg hover:scale-110">CAM</button>
          <button className="px-4 py-2 rounded-lg hover:scale-110">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
              />
            </svg>
          </button>
          <button className="px-4 py-2 rounded-lg hover:scale-110">
            C° or F°
          </button>
          <button className="px-4 py-2 rounded-lg hover:scale-110">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
              />
            </svg>
          </button>
        </div>
      </div> */}
    </div>
  );
  return <AnimalComponent />;
}
