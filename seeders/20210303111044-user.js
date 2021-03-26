"use strict";

const db = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await db.User.bulkCreate(
      [
        {
          firstName: "a",
          lastName: "a",
          email: "a@a.com",
          password: "123456789",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "b",
          lastName: "b",
          email: "b@b.com",
          password: "123456789",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "c",
          lastName: "c",
          email: "c@c.com",
          password: "123456789",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { individualHooks: true }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
