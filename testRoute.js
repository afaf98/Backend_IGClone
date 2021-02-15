const express = require("express");

const { Router } = express;

const router = new Router();

//Testing route
router.get("/test", (req, res) => {
  try {
    res.status(200).json("hello world!");
  } catch (error) {
    console.error("Error", error);
  }
});

module.exports = router;
