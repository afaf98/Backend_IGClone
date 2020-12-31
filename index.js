const express = require("express");
const PORT = require("./constant");
const app = express();

const images = require("./routes/images");

app.use(images);

app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});
