const express = require("express");
const { Image } = require("../models");
const authMiddleware = require("../auth/middleware");

const { Router } = express;

const router = new Router();

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const images = await Image.findAll({ where: { userId: req.user.id } });
    return res.status(200).json({
      images: images,
      user: { name: req.user.firstName, lastName: req.user.lastName },
    });
  } catch (error) {
    console.log("Error", error);
  }
});

module.exports = router;
