const db = require("../models");
const { verifyToken } = require("./utils");

async function middleware(req, res, next) {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({
        message: "Not Authorized",
        errors: ["No authorization header present on this request"],
      });
    }
    const requestToken = req.headers.authorization.split(" ");
    if (requestToken[0] !== "Bearer") {
      return res.status(400).json({
        message: "Bad Request",
        errors: [
          `Authorization header must contain Bearer not ${requestToken[0]}`,
        ],
      });
    }
    const verifiedToken = verifyToken(requestToken[1]);
    if (!verifiedToken.userId) {
      return res.status(401);
    }
    const user = await db.User.findByPk(verifiedToken.userId);
    if (!user) {
      return res.status(401).json({
        message: "Not authorized",
        errors: ["This user no longer exists"],
      });
    }
    req.user = user;
    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      res.status(401).json({ message: error.name, errors: [error.message] });
    } else {
      console.log("Error", error);
      res.status(500).json({ message: "Something went wrong", errors: [] });
    }
  }
}

module.exports = middleware;
