import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/videos")
      .then((res) => res.json())
      .then((data) => setVideos(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>
      <Link to="/record" className="btn">
        Record a New Video
      </Link>
      <h2 className="mt-6">Recorded Videos:</h2>
      <ul>
        {videos.map((video, index) => (
          <li key={index}>
            <Link to={`/play?video=${video.name}`}>{video.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
