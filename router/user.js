const express = require("express");
const { User } = require("../models");
const yup = require("yup");
const bcrypt = require("bcrypt");
const validate = require("../validation/validate");

const { Router } = express;

const router = new Router();

const saltRounds = 10;

//Testing route
router.post(
  "/user",
  validate(
    yup.object().shape({
      name: yup.string().required(),
      lastName: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().length(8).required(),
    }),
    "body"
  ),
  async (req, res) => {
    try {
      const password = await bcrypt.hash(
        req.validatedBody.password,
        saltRounds
      );
      const [user, isNewUser] = await User.findOrCreate({
        where: {
          email: req.validatedBody.email,
        },
        defaults: {
          name: req.validatedBody.name,
          lastName: req.validatedBody.lastName,
          email: req.validatedBody.email,
          password: password,
        },
      });
      if (isNewUser) {
        res.status(201).json("hello world!");
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
