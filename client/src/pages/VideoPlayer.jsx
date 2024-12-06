import React, { useState, useEffect } from "react";

function VideoPlayer() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/videos")
      .then((res) => res.json())
      .then((data) => setVideos(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Video Player</h1>
      <select
        onChange={(e) => setSelectedVideo(e.target.value)}
        className="w-full p-2 mb-4"
      >
        <option value="">Select a video</option>
        {videos.map((video, index) => (
          <option key={index} value={video.path}>
            {video.name}
          </option>
        ))}
      </select>
      {selectedVideo && (
        <video controls className="w-full">
          <source
            src={`http://localhost:5000${selectedVideo}`}
            type="video/mp4"
          />
        </video>
      )}
    </div>
  );
}

export default VideoPlayer;
