import { useRef, useState } from "react";
import { uploadVideo } from "../api/api";

function VideoRecording() {
  const videoRef = useRef(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [chunks, setChunks] = useState([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
    const recorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);

    recorder.ondataavailable = (event) =>
      setChunks((prev) => [...prev, event.data]);

    recorder.start();
  };

  const stopRecording = async () => {
    mediaRecorder.stop();
    mediaRecorder.stream.getTracks().forEach((track) => track.stop());

    const blob = new Blob(chunks, { type: "video/mp4" });

    try {
      const response = await uploadVideo(blob);
      console.log("Video uploaded successfully:", response);
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Video Recording</h1>
      <video ref={videoRef} autoPlay muted className="w-full"></video>
      <div className="mt-4">
        <button onClick={startRecording} className="btn">
          Start Recording
        </button>
        <button onClick={stopRecording} className="btn ml-2">
          Stop Recording
        </button>
      </div>
    </div>
  );
}

export default VideoRecording;
