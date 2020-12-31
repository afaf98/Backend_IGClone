const express = require("express");

const { Router } = express;

const router = new Router();

const images = [
  { id: "1", url: "https://unsplash.com/ksjdvksdfg", userId: "1" },
  { id: "2", url: "https://unsplash.com/ksjdvksdfg", userId: "2" },
  { id: "3", url: "https://unsplash.com/ksjdvksdfg", userId: "2" },
  { id: "4", url: "https://unsplash.com/ksjdvksdfg", userId: "1" },
];

router.get("/images", (request, response) => response.send(images));

module.exports = router;
