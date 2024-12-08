import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllVideos } from "../api";

function VideoPlayer() {
  const location = useLocation();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [selectedVideo, setSelectedVideo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(1);

  const [availableVideos, setAvailableVideos] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await getAllVideos();
        // console.log("data", data);
        setAvailableVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  // Extract video query parameter from the URL
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(location.search);
    const video = params.get("video");
    if (video) {
      setSelectedVideo(video);
    }
    setLoading(false);
    // console.log("new song");
  }, [location.search]);

  //   useEffect(() => {
  //     if (videoRef.current) {
  //       videoRef.current.load();
  //       videoRef.current.play();
  //       setIsPlaying(true);
  //     }
  //   }, [selectedVideo]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Autoplay failed. Waiting for user interaction:", err);
          setIsPlaying(false);
        });
    }
  }, [selectedVideo]);

  // Toggle Play/Pause
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Seek forward
  const handleSeekForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
    }
  };

  // Seek backward
  const handleSeekBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10;
    }
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setVolume(newVolume);
  };

  // Handle video change from dropdown
  const handleVideoSelect = (e) => {
    const selected = e.target.value;
    if (selected) {
      setSelectedVideo(selected);
    }
    // console.log(selected, selectedVideo);
    navigate(`/play?video=${encodeURIComponent(selected)}`);
    // const params = new URLSearchParams(location.search);
    // const video = params.get("video");
    // if (video) {
    //   setSelectedVideo(video);
    // }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 bg-gradient-to-r from-slate-400 to-slate-200">
      <h1 className="text-3xl font-extrabold text-black mb-6">Video Player</h1>

      {/* Show loading or error message */}
      {loading && (
        <p className="text-gray-500 text-lg animate-pulse">
          Loading video, please wait...
        </p>
      )}
      {error && <p className="text-red-500 text-lg">{error}</p>}

      {/* Dropdown to select a video */}
      <div className="mb-4">
        <label
          htmlFor="video-select"
          className="text-lg font-medium text-gray-700"
        >
          Select Video:
        </label>
        <select
          id="video-select"
          value={selectedVideo}
          onChange={handleVideoSelect}
          className="mt-2 px-4 py-2 bg-white border border-gray-300 rounded-md"
        >
          <option value="">Choose a video</option>
          {availableVideos.map((video) => (
            <option key={video.name} value={video.name}>
              {video.name}
            </option>
          ))}
        </select>
      </div>

      {/* Display video player only if a video is selected */}
      {selectedVideo && (
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-4 border border-gray-200">
          <video
            ref={videoRef}
            controls
            // autoPlay // Video will autoplay as soon as it is loaded
            className="w-full rounded-lg shadow-lg border border-gray-300 mb-4"
            preload="metadata"
            poster="/placeholder-image.jpg"
          >
            <source
              src={`/api/videos/${encodeURIComponent(selectedVideo)}`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

          {/* Playback Controls */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              onClick={handleSeekBackward}
              className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300"
            >
              -10s
            </button>
            <button
              onClick={handlePlayPause}
              className={`px-6 py-2 text-white font-bold rounded-lg shadow-lg transition duration-300 ${
                isPlaying
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
            <button
              onClick={handleSeekForward}
              className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300"
            >
              +10s
            </button>
          </div>

          {/* Volume Control */}
          <div className="mt-4 flex items-center justify-center gap-4">
            <label htmlFor="volume" className="text-gray-700 font-medium">
              Volume:
            </label>
            <input
              id="volume"
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-1/2"
            />
          </div>

          <p className="mt-4 text-lg font-semibold text-gray-700">
            Now playing: <span className="text-blue-600">{selectedVideo}</span>
          </p>
        </div>
      )}

      {/* Fallback if no video is selected */}
      {!selectedVideo && !loading && (
        <p className="text-gray-500 text-lg mt-6">
          No video selected. Please return to the dashboard to choose a video.
        </p>
      )}

      {/* Back to dashboard button */}
      <div className="mt-6">
        <a
          href="/dashboard"
          className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          Back to Dashboard
        </a>
      </div>
    </div>
  );
}

export default VideoPlayer;
