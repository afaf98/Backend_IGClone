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

router.post("/followers/:id", authMiddleware, async (req, res) => {
  try {
    const followerId = req.params.id;
    const user = await db.User.findByPk(followerId);
    if (!user) {
      return res.status(404).json({ message: "This user does not exist" });
    }
    await req.user.addFollowers(user);

    const followers = await req.user.getFollowers({
      attributes: ["firstName", "lastName", "id"],
    });

    res.status(200).json({ message: `You now follow ${user.firstName}` });
  } catch (error) {
    console.log("ERROR POST /followers", error);
    res.status(500).json({ message: "Internal error", errors: [error] });
  }
});
module.exports = router;
