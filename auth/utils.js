const jwt = require("jsonwebtoken");
const { User } = require("../models");

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

async function authenticateUser(email, password) {
  const findUser = await User.findOne({
    where: {
      email: email,
    },
  });
  if (!findUser) {
    return null;
  }

  const match = await findUser.comparePassword(password);

  if (!match) {
    return null;
  }

  return findUser;
}

function createToken(userId) {
  return jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
    expiresIn: "4h",
  });
}

module.exports = { verifyToken, createToken, authenticateUser };
