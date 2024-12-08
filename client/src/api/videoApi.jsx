import conf from "../conf/conf.js";
import axios from "axios";

// Set up base URL for the API
// const BASE_URL = "http://localhost:5000/api";
const BASE_URL = conf.server_url;

export const getAllVideos = async () => {
  //   console.log("Fetching all videos");

  try {
    const response = await axios.get(
      `https://video-mgt-app.vercel.app/api/videos`
    );
    // console.log("response", response);

    return response.data; // Return the list of videos
  } catch (error) {
    console.error(
      "Error fetching videos:",
      error.response?.data || error.message
    );
    throw new Error("Failed to fetch videos");
  }
};

export const uploadVideo = async (videoBlob, videoName) => {
  const formData = new FormData();
  formData.append("video", videoBlob, videoName); // Append video Blob
  formData.append("videoName", videoName); // Append the videoName

  console.log("Sending formData:", formData);

  try {
    const response = await axios.post(`${BASE_URL}/record`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Ensure the proper content type for FormData
      },
      params: {
        videoName,
      },
    });

    console.log("Video uploaded successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error uploading video:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Failed to upload video");
  }
};
