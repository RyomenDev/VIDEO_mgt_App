import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "../Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "..//pages/Signup";
// import Logout from "..//pages/Logout";
import Dashboard from "../pages/Dashboard";
import VideoRecording from "../pages/VideoRecording";
import VideoPlayer from "../pages/VideoPlayer";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        {/* <Route path="logout" element={<Logout/>} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/record" element={<VideoRecording />} />
        <Route path="/play" element={<VideoPlayer />} />
      </Route>
    </Route>
  )
);

export { router };
