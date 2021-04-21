const express = require("express");
const { User } = require("../models");
const yup = require("yup");
const validate = require("../validation/validate");
const { createToken, authenticateUser } = require("../auth/utils");
const db = require("../models");

const { Router } = express;

const router = new Router();

//Testing route
router.post(
  "/user",
  validate(
    yup.object().shape({
      firstName: yup.string().required(),
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
      const findUser = await authenticateUser(
        req.validatedBody.email,
        req.validatedBody.password
      );
      if (isNewUser) {
        res
          .status(201)
          .json({ message: "User created", token: createToken(findUser.id) });
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

router.get("/users", async (req, res) => {
  try {
    const users = await db.User.findAll({
      attributes: ["firstName", "lastName", "id"],
      include: [
        {
          model: db.Image,
          limit: 1,
          order: [["createdAt", "DESC"]],
        },
      ],
    });
    res.status(200).json({
      message: "Ok",
      users: users.map((user) => {
        return {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          latestImage: user.Images[0] ? user.Images[0].url : null,
        };
      }),
    });
  } catch (error) {
    console.log("Error GET /users", error);
    res.status(500).json({ message: "Internal server error", errors: [error] });
  }
});

module.exports = router;
