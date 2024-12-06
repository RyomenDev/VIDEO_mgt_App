import { useState, useEffect } from "react";
import { getAllVideos } from "../api/api";

function VideoPlayer() {
  const [videos, setVideos] = useState([]); // Store list of videos
  const [selectedVideo, setSelectedVideo] = useState(""); // Store selected video
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track any errors

  // Fetch all videos when the component mounts
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await getAllVideos();
        setVideos(data); // Store the video list
        setLoading(false); // Stop loading when data is fetched
      } catch (error) {
        console.error("Error fetching videos:", error);
        setError("Failed to load videos. Please try again later.");
        setLoading(false); // Stop loading even if error occurs
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Video Player</h1>

      {/* Show loading or error message */}
      {loading && <p className="text-gray-500">Loading videos...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Dropdown to select a video */}
      <select
        onChange={(e) => setSelectedVideo(e.target.value)}
        className="w-full p-2 mb-4 bg-gray-100 border border-gray-300 rounded-md"
        disabled={loading} // Disable dropdown while loading
      >
        <option value="">Select a video</option>
        {videos.map((video, index) => (
          <option key={index} value={video.path}>
            {video.name}
          </option>
        ))}
      </select>

      {/* Display video player only if a video is selected */}
      {selectedVideo && (
        <div className="relative">
          <video
            controls
            className="w-full rounded-lg shadow-lg"
            preload="metadata"
            poster="your-poster-image.jpg" // Optional: Add a poster image for the video
          >
            <source src={`/api/${selectedVideo}`} type="video/mp4" />
            {/* Fallback text for browsers that don't support the video tag */}
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
}

export default VideoPlayer;
