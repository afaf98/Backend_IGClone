const express = require("express");

const { Router } = express;

const router = new Router();

//Testing route
router.get("/test", (req, res) => {
  res.send("hello World");
});


module.exports = router;
