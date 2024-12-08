const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const videoRoutes = require("./src/routes");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Middleware
const allowedOrigins = [
  process.env.ALLOWED_ORIGIN1,
  process.env.ALLOWED_ORIGIN2,
];

app.use(
  cors({
    origin: ["http://localhost:5173", "https://video-mgt-app-5nja.vercel.app"],
    credentials: true,
  })
);
// app.use(cors("*"));
// app.use(cors());

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
