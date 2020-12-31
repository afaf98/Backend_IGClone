const express = require("express");
const PORT = require("./constant");
const app = express();

const images = require("./imagesRoute/images");
const user = require("./users/user");

app.use(express.json());

app.use(images);

app.use(user);

app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});
