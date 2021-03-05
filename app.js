const express = require("express");
const app = express();
const cors = require("cors");

const user = require("./router/user.js");
const login = require("./router/login");
const upload = require("./router/upload");

app.use(express.json());
app.use(cors());

app.use(user);
app.use(login);
app.use(upload);

module.exports = app;
