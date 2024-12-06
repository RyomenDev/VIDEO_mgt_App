const BASE_URL = "/api";

export const uploadVideo = async (videoBlob) => {
  //   console.log("uploading video");

  const formData = new FormData();
  formData.append("video", videoBlob, "recording.mp4");

  const response = await fetch(`${BASE_URL}/record`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload video");
  }

  return response.json();
};

export const getAllVideos = async () => {
  console.log("fetching all video");
  const response = await fetch(`${BASE_URL}/videos`);
  //   console.log(response);

  if (!response.ok) {
    throw new Error("Failed to fetch videos");
  }

  return response.json();
};
