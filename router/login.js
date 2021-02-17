const express = require("express");
const { User } = require("../models");
const yup = require("yup");
const bcrypt = require("bcrypt");
const validate = require("../validation/validate");

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
      const findUser = await User.findOne({
        where: {
          email: req.validatedBody.email,
        },
      });
      if (findUser) {
        const match = await bcrypt.compare(
          req.validatedBody.password,
          findUser.password
        );
        if (match) {
          res
            .status(200)
            .json({ message: "You are now logged in", token: "maketokenhere" });
        } else {
          res.status(401).json({ message: "Email or password is incorrect" });
        }
      } else {
        res.status(401).json({ message: "Email or password is incorrect" });
      }
    } catch (error) {
      console.log("Error", error);
      res.status(500).json({ message: "Internal error" });
    }
  }
);

module.exports = router;
