const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const videoRoutes = require("./src/routes");
const cors = require("cors");
require("dotenv");

const app = express();
const PORT = process.env.PORT || 5000;

// const allowedOrigins1 = process.env.ALLOWED_ORIGIN1;
// const allowedOrigins2 = process.env.ALLOWED_ORIGIN2;
// // console.log(allowedOrigins.split(","));
// console.log(allowedOrigins1, allowedOrigins2);

// CORS Middleware
// app.use(cors("*"));
const allowedOrigins = [
  //   process.env.ALLOWED_ORIGIN1,
  //   process.env.ALLOWED_ORIGIN2,
  "http://localhost:5173",
  // Add other allowed origins here
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("CORS policy: Access denied"), false);
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"], // specify allowed methods
  credentials: true, // if you need to send cookies or authorization headers
};

// Apply CORS middleware
app.use(cors(corsOptions));

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
