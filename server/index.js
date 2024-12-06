const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware for parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up storage for videos
const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "videos/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`),
});

const upload = multer({ storage: videoStorage });

// API Endpoints

// POST /record - Save video
app.post("/record", upload.single("video"), (req, res) => {
  res.json({
    message: "Video saved successfully!",
    filename: req.file.filename,
  });
});

// GET /videos - List all videos
app.get("/videos", (req, res) => {
  const videoDir = path.join(__dirname, "videos");
  fs.readdir(videoDir, (err, files) => {
    if (err) return res.status(500).send("Error reading videos directory.");
    const videoList = files.map((file) => ({
      name: file,
      path: `/videos/${file}`,
    }));
    res.json(videoList);
  });
});

// GET /video/:id - Stream video
app.get("/video/:id", (req, res) => {
  const videoPath = path.join(__dirname, "videos", req.params.id);
  if (!fs.existsSync(videoPath))
    return res.status(404).send("Video not found.");
  res.sendFile(videoPath);
});

// Serve video files
app.use("/videos", express.static(path.join(__dirname, "videos")));

// Start the server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
