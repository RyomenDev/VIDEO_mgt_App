import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import VideoRecording from "../pages/VideoRecording";
import VideoPlayer from "../pages/VideoPlayer";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Dashboard />} />
      <Route path="/record" element={<VideoRecording />} />
      <Route path="/play" element={<VideoPlayer />} />
    </Route>
  )
);

export { router };
