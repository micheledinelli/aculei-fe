import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";

import Landing from "./pages/Landing";
import About from "./pages/About";
import Archive from "./pages/Archive";

const router = createBrowserRouter([{ path: "*", Component: Root }]);

export default function App() {
  return <RouterProvider router={router} />;
}

function Root() {
  // const images = [
  //   "https://images.unsplash.com/photo-1627300008477-8b7b8b5b8b0f?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNnx8fGVufDB8fHx8&ixlib=rb-1.2.1&w=1000&q=80",
  //   "https://images.unsplash.com/photo-1627300008477-8b7b8b5b8b0f?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNnx8fGVufDB8fHx8&ixlib=rb-1.2.1&w=1000&q=80",
  //   "https://images.unsplash.com/photo-1627300008477-8b7b8b5b8b0f?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNnx8fGVufDB8fHx8&ixlib=rb-1.2.1&w=1000&q=80",
  //   "https://images.unsplash.com/photo-1627300008477-8b7b8b5b8b0f?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNnx8fGVufDB8fHx8&ixlib=rb-1.2.1&w=1000&q=80",
  //   "https://images.unsplash.com/photo-1627300008477-8b7b8b5b8b0f?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNnx8fGVufDB8fHx8&ixlib=rb-1.2.1&w=1000&q=80",
  // ];

  // const imgElement = new HTMLImageElement();
  // const randomImage = images[Math.floor(Math.random() * images.length)];
  // imgElement.src = randomImage;

  // imgElement.style.position = "fixed";
  // const randomPositionInScreenX = Math.floor(Math.random() * 100);
  // const randomPositionInScreenY = Math.floor(Math.random() * 100);
  // imgElement.style.top = `${randomPositionInScreenX}%`;
  // imgElement.style.left = `${randomPositionInScreenY}%`;

  // document.body.appendChild(imgElement);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />
      <Route path="/archive" element={<Archive />} />
    </Routes>
  );
}
