const express = require("express");
const yup = require("yup");
const db = require("../models");
const authMiddleware = require("../auth/middleware");

const { Router } = express;

const router = new Router();

router.get("/followers", authMiddleware, async (req, res) => {
  const users = await db.User.findByPk(req.user.id);
  const followers = await users.getFollowers();
  const followerData = followers.map((follower) => {
    return { firstName: follower.firstName, lastName: follower.lastName };
  });

  res.status(200).json({ message: "Success", followers: followerData });
});

module.exports = router;
