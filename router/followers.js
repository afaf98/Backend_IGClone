const express = require("express");
const yup = require("yup");
const db = require("../models");
const authMiddleware = require("../auth/middleware");

const { Router } = express;

const router = new Router();

router.get("/followers", authMiddleware, async (req, res) => {
  const users = await db.User.findByPk(req.user.id);
  const followers = await users.getFollowers({
    attributes: ["firstName", "lastName", "id"],
  });

  res.status(200).json({ message: "Success", followers: followers });
});

module.exports = router;
