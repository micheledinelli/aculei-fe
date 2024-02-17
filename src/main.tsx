import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ExperienceProvider } from "./contexts/ExperienceContext";
import Landing from "./pages/Landing";
import Experience from "./pages/Experience";
import Archive from "./pages/Archive";
import Mobile from "./pages/Mobile";
import Error from "./pages/Error";
import "./index.css";

const isMobile = window.matchMedia("(max-width: 768px)").matches;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <Error />,
  },
  {
    path: "/experience",
    element: <Experience />,
  },
  {
    path: "/archive",
    element: <Archive />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ExperienceProvider>
    {isMobile ? <Mobile /> : <RouterProvider router={router} />}
  </ExperienceProvider>
);
