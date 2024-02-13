import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./pages/Landing";
import Experience from "./pages/Experience";
import Error from "./pages/Error";
import { ExperienceProvider } from "./contexts/ExperienceContext";
import Mobile from "./pages/Mobile";

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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ExperienceProvider>
    {isMobile ? <Mobile /> : <RouterProvider router={router} />}
  </ExperienceProvider>
);
