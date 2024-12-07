const express = require("express");
const { uploadVideo } = require("../controller/uploadController");
const { getVideos, streamVideo } = require("../controller/videoController");
const { checkUnique } = require("../middlewares/checkUnique");

const router = express.Router();

// GET /videos - List all videos
router.get("/videos", getVideos);

// Stream video with range support
router.get("/videos/:videoName", streamVideo);

// POST /record - Save video after checking uniqueness
router.post("/record", checkUnique, uploadVideo, (req, res) => {
//   console.log("uploading");

  res.json({
    message: "Video saved successfully!",
    filename: req.file.filename, // Return the filename of the saved video
  });
});

module.exports = router;
