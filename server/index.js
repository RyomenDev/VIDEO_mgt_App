const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const videoRoutes = require("./src/routes");
const cors = require("cors");
require("dotenv");

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = process.env.ALLOWED_ORIGIN;
console.log(allowedOrigins.split(","));

// CORS Middleware
app.use(
  cors({
    origin: allowedOrigins.split(","),
    credentials: true,
  })
);

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static video files (adjust the path if necessary)
app.use("/videos", express.static(path.join(__dirname, "videos")));

// Use video-related routes under /api
app.use("/api", videoRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
