import React from "react";
import { Link } from "react-router-dom";

function VideoCard({ video }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300 ease-in-out">
      <h3 className="text-lg font-semibold text-gray-800 mb-3 truncate">
        {video.name}
      </h3>

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">File: {video.fileSize} MB</p>
        <Link
          to={`/play?video=${encodeURIComponent(video.name)}`}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          Play
        </Link>
      </div>
    </div>
  );
}

export default VideoCard;
