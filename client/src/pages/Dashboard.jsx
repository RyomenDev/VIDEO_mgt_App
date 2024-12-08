import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllVideos } from "../api";
import VideoCard from "../components/VideoCard";

function Dashboard() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await getAllVideos();
        // console.log("data", data);
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="p-8 bg-gradient-to-b from-slate-100 to-gray-200 min-h-screen">
      {/* Header Section */}
      <header className="mb-10 text-center">
        <h1 className="text-5xl font-extrabold text-slate-700 drop-shadow-md">
          Dashboard
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Manage your recorded videos and access them anytime.
        </p>
      </header>

      {/* Record Button */}
      <div className="flex justify-center mb-12">
        <Link
          to="/record"
          className="bg-blue-500 hover:bg-blue-700 text-white py-3 px-8 rounded-full shadow-lg transition-all transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          🎥 Record a New Video
        </Link>
      </div>

      {/* Recorded Videos Section */}
      <section>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          🎬 Recorded Videos
        </h2>

        {/* Video Cards */}
        {videos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <VideoCard key={index} video={video} />
            ))}
          </div>
        ) : (
          <div className="text-center mt-12">
            <p className="text-xl text-gray-500">
              No videos recorded yet. Start by recording your first video!
            </p>
            <Link
              to="/record"
              className="mt-4 inline-block bg-blue-600 text-white py-2 px-6 rounded-full shadow-md hover:bg-blue-700 transition transform hover:scale-105"
            >
              Record Now
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
