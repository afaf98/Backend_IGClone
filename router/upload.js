const express = require("express");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const configCloudinary = require("../config/cloudinary");

const { Router } = express;

const router = new Router();

configCloudinary();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "some-folder-name",
    format: async (req, file) => "png", // supports promises as well
    public_id: (req, file) => "computed-filename-using-request",
  },
});

const parser = multer({ storage: storage });

router.post("/upload", parser.single("image"), (req, res) => {
  try {
    console.log("request", req.file);
    res.status(200).json({ message: "Image uploaded" });
  } catch (error) {
    console.log("Error", error);
  }
});

module.exports = router;
