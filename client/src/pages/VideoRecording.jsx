import { useRef, useState } from "react";
import { uploadVideo } from "../api/api";

function VideoRecording() {
  const videoRef = useRef(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [chunks, setChunks] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [videoName, setVideoName] = useState("");
  const [isNameFormVisible, setIsNameFormVisible] = useState(false);
  const [existingVideoNames, setExistingVideoNames] = useState([
    "Sample Video 1",
    "Sample Video 2", // Example names
  ]);
  const [isNameUnique, setIsNameUnique] = useState(true);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;

      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      recorder.ondataavailable = (event) =>
        setChunks((prev) => [...prev, event.data]);

      recorder.start();
      setIsRecording(true);
      setUploadStatus(null); // Reset upload status
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopRecording = async () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
      setIsNameFormVisible(true); // Show video name input form after stopping the recording
      setMediaRecorder(null); // Reset the media recorder state
    }
  };

  const handleNameChange = (e) => {
    setVideoName(e.target.value);
    setIsNameUnique(!existingVideoNames.includes(e.target.value)); // Check for uniqueness
  };

  const handleSubmit = async () => {
    if (!videoName || !isNameUnique) {
      return;
    }

    const blob = new Blob(chunks, { type: "video/mp4" });

    try {
      setUploadStatus("Uploading...");
      const response = await uploadVideo(blob, videoName);
      console.log(response);
      // If video uploaded successfully
      setUploadStatus("Video uploaded successfully!");
      console.log("Video uploaded successfully:", response);
      setIsNameFormVisible(false); // Hide the form after submission
    } catch (error) {
      // If there's an error uploading, check for a specific error message
      if (error.message === "File name already exists.") {
        setUploadStatus(
          "File name already exists. Please choose another name."
        );
        setIsNameFormVisible(true);
        setIsNameUnique(false); // Set the flag to false to disable the submit button
      } else {
        setUploadStatus("Error uploading video.");
      }
      console.error("Error uploading video:", error);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-b from-blue-100 to-gray-100 min-h-screen flex flex-col items-center">
      {/* Header */}
      <h1 className="text-3xl font-extrabold text-blue-700 mb-6">
        🎥 Video Recorder
      </h1>
      <p className="text-gray-600 mb-4 text-center">
        Record videos directly from your browser and upload them with ease.
      </p>

      {/* Video Preview */}
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md border border-gray-300 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          className="w-full h-64 bg-gray-200 rounded-t-lg"
        ></video>
        <div
          className={`flex justify-center items-center p-2 ${
            isRecording ? "bg-red-500 text-white" : "bg-gray-100 text-gray-500"
          }`}
        >
          {isRecording ? "Recording in progress..." : "Not Recording"}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex space-x-4">
        <button
          onClick={startRecording}
          className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={isRecording}
        >
          Start Recording
        </button>
        <button
          onClick={stopRecording}
          className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg shadow-lg hover:bg-red-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={!isRecording}
        >
          Stop Recording
        </button>
      </div>

      {isNameFormVisible && (
        <div className="mt-6 w-full max-w-lg bg-white p-6 rounded-lg shadow-md border border-gray-300">
          <h2 className="text-2xl font-semibold mb-4">Enter Video Name</h2>
          <input
            type="text"
            value={videoName}
            onChange={handleNameChange}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
            placeholder="Video Name"
          />
          {!isNameUnique && (
            <p className="text-red-600 text-sm mb-4">
              This name is already taken. Please choose a different name.
            </p>
          )}
          <div className="flex justify-end space-x-4">
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-gray-400"
              disabled={!isNameUnique || !videoName}
            >
              Submit
            </button>
            <button
              onClick={() => setIsNameFormVisible(false)}
              className="px-6 py-3 bg-gray-600 text-white font-bold rounded-lg shadow-lg hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Upload Status */}
      {uploadStatus && (
        <div
          className={`mt-4 px-4 py-2 rounded-lg shadow-md ${
            uploadStatus.includes("successfully")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {uploadStatus}
        </div>
      )}

      {/* Instructions */}
      <p className="mt-6 text-gray-500 text-sm text-center max-w-md">
        Make sure to allow camera access to start recording. After recording,
        your video will be uploaded automatically.
      </p>
    </div>
  );
}

export default VideoRecording;
