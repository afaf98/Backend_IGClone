const express = require("express");
const { User } = require("../models");
const yup = require("yup");
var jwt = require("jsonwebtoken");
const validate = require("../validation/validate");

const { Router } = express;

const router = new Router();

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
  var token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
    expiresIn: "4h",
  });
  return token;
}
router.post(
  "/login",
  validate(
    yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().min(8).required(),
    }),
    "body"
  ),
  async (req, res) => {
    try {
      const findUser = await authenticateUser(
        req.validatedBody.email,
        req.validatedBody.password
      );
      if (!findUser) {
        return res
          .status(401)
          .json({ message: "Email or password is incorrect" });
      }
      res.status(200).json({
        message: "You are now logged in",
        token: createToken(findUser.id),
      });
    } catch (error) {
      console.log("Error", error);
      res.status(500).json({ message: "Internal error" });
    }
  }
);

module.exports = router;
