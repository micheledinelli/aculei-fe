import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./pages/Landing";
import Experience from "./pages/Experience";
import Error from "./pages/Error";
import { ExperienceProvider } from "./contexts/ExperienceContext";

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
    <RouterProvider router={router} />
  </ExperienceProvider>
);
