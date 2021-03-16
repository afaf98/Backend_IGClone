const express = require("express");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const db = require("../models");
const configCloudinary = require("../config/cloudinary");
const authMiddleware = require("../auth/middleware");

const { Router } = express;

const router = new Router();

configCloudinary();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "some-folder-name",
    format: async (req, file) => file.mimetype.split("/")[1], // supports promises as well
    public_id: (req, file) => {
      console.log("File", file);
    },
  },
});

const parser = multer({ storage: storage });

router.post(
  "/images",
  authMiddleware,
  parser.single("image"),
  async (req, res) => {
    try {
      console.log("req", req.file.originalname);
      const image = await db.Image.create({
        name: req.file.originalname,
        url: req.file.path,
        userId: req.user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      res.status(201).json({ message: "Image uploaded", url: req.file.path });
      console.log("Image");
    } catch (error) {
      console.log("Error", error);
    }
  }
);

module.exports = router;
