"use strict";

const db = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await db.User.findAll();

    await users[0].addFollowers(users[1]);
    await users[1].addFollowers(users[0]);
    await users[2].addFollowers(users[0]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Followers", null, {});
  },
};
