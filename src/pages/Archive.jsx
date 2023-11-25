import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ImageZoom from "react-image-zooom";

export default function Archive() {
  const home = "HOME";

  const [image, setImage] = useState(null);
  const [zoomProps, setZoomProps] = useState({
    width: 400,
    height: 400,
    zoomWidth: 500,
    img: "",
    className: "object-cover w-full h-full",
  });

  useEffect(() => {
    fetchImage();
  }, []);

  const fetchImage = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/image"); // Replace with your server URL
      if (response.ok) {
        const imageUrl = URL.createObjectURL(await response.blob());
        setImage(imageUrl);
        setZoomProps({ ...zoomProps, img: imageUrl });
      } else {
        console.error("Failed to fetch image");
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  return (
    <div className="overflow-hidden bg-black text-white h-screen cursor-pointer">
      {image && (
        <ImageZoom
          src={image}
          alt="A image to apply the ImageZoom plugin"
          zoom="200"
          className="my-class"
        />
      )}
      <div className="absolute top-0 left-0 m-4 px-4 py-2 text-3xl hover:underline hover:underline-offset-8 decoration-4">
        <NavLink to="/">{home}</NavLink>
      </div>
      <div className="absolute top-0 right-0 m-4 px-4 py-2">
        <NavLink to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </NavLink>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center rounded-lg bg-black bg-opacity-50">
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
      </div>
    </div>
  );
}
