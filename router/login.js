const express = require("express");
const yup = require("yup");
const validate = require("../validation/validate");
const { createToken, authenticateUser } = require("../auth/utils");

const { Router } = express;

const router = new Router();

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
