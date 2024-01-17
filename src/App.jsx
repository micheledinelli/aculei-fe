import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";

import Landing from "./pages/Landing";
import About from "./pages/About";
import ArchiveDetail from "./pages/ArchiveDetail";
import Archive from "./pages/Archive";

const router = createBrowserRouter([{ path: "*", Component: Root }]);

export default function App() {
  return <RouterProvider router={router} />;
}

function Root() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />
      <Route path="/archive" element={<Archive />} />
      <Route path="/archive/:id" element={<ArchiveDetail />} />
    </Routes>
  );
}
