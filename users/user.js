const express = require("express");
const { v4 } = require("uuid");

const { Router } = express;

const router = new Router();

const users = [
  {
    id: "1",
    name: "Harry",
    lastName: "Potter",
    image: "1",
  },
  {
    id: "2",
    name: "Ron",
    lastName: "Wisley",
    image: ["2", "1", "3"],
  },
];

//To check all users
router.get("/users", (req, res) => {
  res.send(users);
});

//Route to get the id of an image of a precise user
router.get("/user/:userid/image", (req, res) => {
  const imageUser = users.map((user) => {
    // console.log(
    // "ID",
    // req.params.userid,
    // user.id,
    // req.params.userid === user.id
    // );
    if (req.params.userid === user.id) {
      // console.log("MAybe", user.image);
      return user.image;
    }
  });
  res.send(imageUser);
});

//Signup route
router.post("/user", (req, res) => {
  const user = req.body; //get post request content
  users.push({ id: v4(), ...user }); //add an id
  res.send(users); //display updated users
});

//Post route to add Picture in an user account
//### NEED SOE WORK THIS POST REQUEST

// router.post("/user/:userid/image", (req, res) => {
//   const userAddImage = users.map((user) => {
//     if (req.params.userid === user.id) {
//       const imageToAdd = req.body;
//       imageToAdd.push({ ...user, imageToAdd });
//     }
//   });
//   res.status(200).send(userAddImage);
// });

module.exports = router;
