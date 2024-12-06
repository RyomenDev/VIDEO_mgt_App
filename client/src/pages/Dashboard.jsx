import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllVideos } from "../api/api";

function Dashboard() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await getAllVideos();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-blue-600 mb-6">Dashboard</h1>
      <div className="mb-8">
        <Link
          to="/record"
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Record a New Video
        </Link>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Recorded Videos:
      </h2>
      <ul className="space-y-4">
        {videos.map((video, index) => (
          <li
            key={index}
            className="p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
          >
            <Link
              to={`/play?video=${video.name}`}
              className="text-lg font-medium text-blue-600 hover:text-blue-800"
            >
              {video.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
