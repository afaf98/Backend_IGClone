const express = require("express");

const { Router } = express;

const router = new Router();

const images = [
  { id: 1, url: "https://unsplash.com/ksjdvksdfg" },
  { id: 2, url: "https://unsplash.com/ksjdvksdfg" },
  { id: 3, url: "https://unsplash.com/ksjdvksdfg" },
  { id: 4, url: "https://unsplash.com/ksjdvksdfg" },
];

router.get("/images", (request, response) => response.send(images));

module.exports = router;
