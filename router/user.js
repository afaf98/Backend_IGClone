const express = require("express");
const { User } = require("../models");
const yup = require("yup");
const validate = require("../validation/validate");

const { Router } = express;

const router = new Router();

//Testing route
router.post(
  "/user",
  validate(
    yup.object().shape({
      name: yup.string().required(),
      lastName: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().min(8).required(),
    }),
    "body"
  ),
  async (req, res) => {
    try {
      const [user, isNewUser] = await User.findOrCreate({
        where: {
          email: req.validatedBody.email,
        },
        defaults: {
          ...req.validatedBody,
        },
      });
      if (isNewUser) {
        res.status(201).json({ message: "User created" });
      } else {
        res
          .status(409)
          .json({ message: "User with this email already exist." });
      }
    } catch (error) {
      console.log("Error", error);
      res.status(500).json("Internal server error");
    }
  }
);

module.exports = router;
