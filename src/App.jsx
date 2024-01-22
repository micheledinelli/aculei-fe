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
import Cluster from "./pages/Cluster";
import { Provider } from "react-redux";
import store from "./redux/store";

const router = createBrowserRouter([{ path: "*", Component: Root }]);

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />;
    </Provider>
  );
}

function Root() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />
      <Route path="/archive" element={<Archive />} />
      <Route path="/archive/:id" element={<ArchiveDetail />} />
      <Route path="/clusters/:id" element={<Cluster />} />
    </Routes>
  );
}
