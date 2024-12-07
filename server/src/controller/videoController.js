const fs = require("fs");
const path = require("path");

// List all videos
const getVideos = (req, res) => {
  //   console.log("sending videos");

  const videoDir = path.join(__dirname, "../../videos");
  fs.readdir(videoDir, (err, files) => {
    if (err) {
      return res.status(500).send("Error reading videos directory.");
    }
    const videoList = files.map((file) => ({
      name: file,
      path: `/videos/${file}`,
    }));
    res.json(videoList);
  });
};

// Stream video with range support
const streamVideo = (req, res) => {
  //   console.log("sending video by fileName");
  const videoName = req.params.videoName;
  const videoPath = path.join(__dirname, "../../videos", videoName);

  fs.stat(videoPath, (err, stat) => {
    if (err || !stat) {
      return res.status(404).send("Video not found");
    }

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
};

module.exports = { getVideos, streamVideo };
