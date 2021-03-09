const db = require("../models");
const { verifyToken } = require("./utils");

async function middleware(req, res, next) {
  try {
    if (!req.headers.authorization) {
      // console.log(res.status(401));
      return res.status(401).json({
        message: "Not Authorized",
        errors: ["No authorization header present on this request"],
      });
    }
    const requestToken = req.headers.authorization.split(" ");
    const verifiedToken = verifyToken(requestToken[1]);
    const user = await db.User.findByPk(verifiedToken.userId);

    req.user = user;
    next();
  } catch (error) {}
}

module.exports = middleware;
