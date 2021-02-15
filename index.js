const express = require("express");
const PORT = require("./constant");
const app = express();
const cors = require("cors")

const testRoute = require("./testRoute.js");

app.use(express.json());
app.use(cors())

app.use(testRoute)

app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});
