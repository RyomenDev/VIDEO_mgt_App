const express = require("express");
const path = require("path");
const videoRoutes = require("./src/routes/video");
const cors = require("cors");

const app = express();
const PORT = 5000;

// CORS Middleware
app.use(cors());

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static video files (adjust the path if necessary)
app.use("/videos", express.static(path.join(__dirname, "videos")));

// Use video-related routes under /api
app.use("/api", videoRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// const express = require("express");
// const multer = require("multer");
// const fs = require("fs");
// const path = require("path");

// const app = express();
// const PORT = 5000;

// // Middleware for parsing JSON
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Set up storage for videos
// const videoStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const videoDir = path.join(__dirname, "videos");
//     if (!fs.existsSync(videoDir)) {
//       fs.mkdirSync(videoDir, { recursive: true }); // Create the directory if it doesn't exist
//     }
//     cb(null, videoDir); // Use the videos directory as the destination
//   },
//   filename: (req, file, cb) => {
//     const videoName = req.body.videoName || file.originalname; // Get the videoName from the body or use original filename
//     cb(null, `${videoName}.mp4`); // Save the file with videoName.mp4
//   },
// });

// const upload = multer({ storage: videoStorage });

// // Middleware to check if the video name already exists
// const checkUnique = (req, res, next) => {
//   console.log("checking", req.body, req.params, req.query);

//   const videoName =
//     req.body.videoName || req.query.videoName || req.params.videoName; // Get the videoName from frontend

//   if (!videoName) {
//     return res.status(400).json({ message: "Video name not provided" });
//   }

//   const videoPath = path.join(__dirname, "videos", `${videoName}.mp4`);

//   // Check if the file already exists in the videos directory
//   if (fs.existsSync(videoPath)) {
//     return res.status(400).json({ message: "File name already exists." });
//   }

//   // Continue if the file doesn't exist
//   next();
// };

// // POST /record - Save video after checking uniqueness
// app.post("/record", checkUnique, upload.single("video"), (req, res) => {
//   res.json({
//     message: "Video saved successfully!",
//     filename: req.file.filename, // Return the filename of the saved video
//   });
// });

// // GET /videos - List all videos
// app.get("/videos", (req, res) => {
//   const videoDir = path.join(__dirname, "videos");
//   fs.readdir(videoDir, (err, files) => {
//     if (err) {
//       return res.status(500).send("Error reading videos directory.");
//     }
//     const videoList = files.map((file) => ({
//       name: file,
//       path: `/videos/${file}`,
//     }));
//     res.json(videoList);
//   });
// });

// // Stream video with range support
// app.get("/videos/:videoName", (req, res) => {
//   const videoName = req.params.videoName;
//   const videoPath = path.join(__dirname, "videos", videoName);

//   fs.stat(videoPath, (err, stat) => {
//     if (err || !stat) {
//       return res.status(404).send("Video not found");
//     }

//     const fileSize = stat.size;
//     const range = req.headers.range;

//     // If a Range header is present, handle partial content requests
//     if (range) {
//       const parts = range.replace(/bytes=/, "").split("-");
//       const start = parseInt(parts[0], 10);
//       const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

//       if (start >= fileSize || end >= fileSize) {
//         return res.status(416).send("Requested range not satisfiable");
//       }

//       const chunkSize = end - start + 1;
//       const readStream = fs.createReadStream(videoPath, { start, end });

//       res.writeHead(206, {
//         "Content-Range": `bytes ${start}-${end}/${fileSize}`,
//         "Accept-Ranges": "bytes",
//         "Content-Length": chunkSize,
//         "Content-Type": "video/mp4",
//       });

//       readStream.pipe(res);
//     } else {
//       res.writeHead(200, {
//         "Content-Length": fileSize,
//         "Content-Type": "video/mp4",
//       });
//       fs.createReadStream(videoPath).pipe(res);
//     }
//   });
// });

// // Serve video files
// app.use("/videos", express.static(path.join(__dirname, "videos")));

// // Start the server
// app.listen(PORT, () =>
//   console.log(`Server running on http://localhost:${PORT}`)
// );
