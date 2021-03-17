const express = require("express");
const { Image } = require("../models");
const authMiddleware = require("../auth/middleware");

const { Router } = express;

const router = new Router();

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const images = await Image.findAll({ where: { userId: req.user.id } });
    console.log("images", images.length === 0);
    if (images.length === 0) {
      return res.status(404).json({ message: "No images are found" });
    } else {
      return res.status(200).json({ images: images });
    }
  } catch (error) {
    console.log("Error", error);
  }
});

module.exports = router;
