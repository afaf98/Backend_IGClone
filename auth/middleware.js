const db = require("../models");
const { verifyToken } = require("./utils");

async function middleware(req, res, next) {
  const requestToken = req.headers.authorization.split(" ");
  const verifiedToken = verifyToken(requestToken[1]);
  const user = await db.User.findByPk(verifiedToken.userId);

  req.user = user;

  next();
}

module.exports = middleware;
