const express = require("express");

const { Router } = express;

const router = new Router();

router.get("/images", (request, response) =>
  response.send([
    { id: 1, url: "https://unsplash.com/ksjdvksdfg" },
    { id: 2, url: "https://unsplash.com/ksjdvksdfg" },
    { id: 3, url: "https://unsplash.com/ksjdvksdfg" },
    { id: 4, url: "https://unsplash.com/ksjdvksdfg" },
  ])
);

module.exports = router;
