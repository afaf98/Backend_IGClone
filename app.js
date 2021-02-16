const express = require("express");
const app = express();
const cors = require("cors");

const user = require("./router/user.js");

app.use(express.json());
app.use(cors());

app.use(user);

module.exports = app;
