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
  destination: (req, file, cb) => {
    // Ensure the videos directory exists
    const videoDir = path.join(__dirname, "videos");
    if (!fs.existsSync(videoDir)) {
      fs.mkdirSync(videoDir, { recursive: true }); // Create the directory if it doesn't exist
    }
    cb(null, videoDir); // Use the videos directory as the destination
  },
  filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`),
});

const upload = multer({ storage: videoStorage });

// API Endpoints

// POST /record - Save video
app.post("/record", upload.single("video"), (req, res) => {
  console.log("saving video");

  res.json({
    message: "Video saved successfully!",
    filename: req.file.filename,
  });
});

// GET /videos - List all videos
app.get("/videos", (req, res) => {
  console.log("sending video");

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

// Stream video with range support
app.get("/videos/:videoName", (req, res) => {
  console.log("videos/:videoName");

  const videoPath = path.join(__dirname, "videos", req.params.videoName);
  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  // If a Range header is present, handle partial content requests
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");

    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    if (start >= fileSize || end >= fileSize) {
      return res.status(416).send("Requested range not satisfiable");
    }

    const chunkSize = end - start + 1;
    const readStream = fs.createReadStream(videoPath, { start, end });

    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4",
    });

    readStream.pipe(res);
  } else {
    res.writeHead(200, {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    });
    fs.createReadStream(videoPath).pipe(res);
  }
});

// Serve video files
app.use("/videos", express.static(path.join(__dirname, "videos")));

// Start the server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
