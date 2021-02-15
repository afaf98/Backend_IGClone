const express = require("express");
const app = express();
const cors = require("cors");

const testRoute = require("./testRoute.js");

app.use(express.json());
app.use(cors());

app.use(testRoute);

module.exports = app;
