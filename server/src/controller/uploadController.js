const { videoStorage } = require("../config/storage");
const multer = require("multer");
const upload = multer({ storage: videoStorage });

const uploadVideo = upload.single("video");

module.exports = { uploadVideo };
