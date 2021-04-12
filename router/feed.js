const express = require("express");
const authMiddleware = require("../auth/middleware");
const db = require("../models");

const { Router } = express;

const router = new Router();

router.get("/feed", authMiddleware, async (req, res) => {
  try {
    const usersFeed = await req.user.getFollowers({
      attributes: ["firstName", "lastName", "id"],
    });
    const images = await db.Image.findAll({
      attributes: [
        "url",
        "createdAt",
        "name",
        [db.sequelize.col("User.firstName"), "userFirstName"],
        [db.sequelize.col("User.lastName"), "userLastName"],
      ],
      where: { userId: usersFeed.map((user) => user.id) },
      order: [["createdAt", "DESC"]],
      include: [{ model: db.User, attributes: [] }],
    });
    console.log("image", images);
    res.status(200).json({
      message: "Ok",
      images: images,
    });
  } catch (error) {
    console.log("Error GET /feed", error);
    res.status(500).json({ message: "Internal server error", errors: [error] });
  }
});

module.exports = router;
