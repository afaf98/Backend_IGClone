"use strict";

const db = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await db.User.create({
      firstName: "a",
      lastName: "a",
      email: "a@a.com",
      password: "123456789",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
