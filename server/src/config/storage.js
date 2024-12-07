const multer = require("multer");
const path = require("path");
const fs = require("fs");

const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log("multer");

    const videoDir = path.join(__dirname, "../../videos");
    if (!fs.existsSync(videoDir)) {
      fs.mkdirSync(videoDir, { recursive: true }); // Create the directory if it doesn't exist
    }
    cb(null, videoDir); // Use the videos directory as the destination
  },
  filename: (req, file, cb) => {
    const videoName = req.body.videoName || file.originalname; // Get the videoName from the body or use original filename
    cb(null, `${videoName}.mp4`); // Save the file with videoName.mp4
  },
});

module.exports = { videoStorage };
