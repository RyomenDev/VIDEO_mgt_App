const fs = require("fs");
const path = require("path");

const checkUnique = (req, res, next) => {
  //   console.log("Checking", req.body, req.params, req.query);

  const videoName =
    req.body.videoName || req.query.videoName || req.params.videoName; // Get the videoName from frontend

  if (!videoName) {
    return res.status(400).json({ message: "Video name not provided" });
  }

  const videoPath = path.join(__dirname, "../../videos", `${videoName}.mp4`);

  // Check if the file already exists in the videos directory
  if (fs.existsSync(videoPath)) {
    return res.status(400).json({ message: "File name already exists." });
  }

  // Continue if the file doesn't exist
  next();
};

module.exports = { checkUnique };
