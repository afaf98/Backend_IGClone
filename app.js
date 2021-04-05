const express = require("express");
const app = express();
const cors = require("cors");

const user = require("./router/user.js");
const login = require("./router/login");
const upload = require("./router/upload");
const homeProfile = require("./router/userProfile");
const checkToken = require("./router/checkToken");
const followers = require("./router/followers");

app.use(express.json());
app.use(cors());

app.use(user);
app.use(login);
app.use(homeProfile);
app.use(upload);
app.use(checkToken);
app.use(followers);

module.exports = app;
