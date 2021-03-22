const express = require("express");
const authMiddleware = require("../auth/middleware");

const { Router } = express;

const router = new Router();

router.get("/checktoken", authMiddleware, async (req, res) => {
  if (req.user) {
    res.status(200).json({ message: "Valid token" });
  }
});

module.exports = router;
