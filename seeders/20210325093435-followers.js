"use strict";

const db = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // const users = await db.User.findAll();
    //  await db.F.create('People', [{
    //    name: 'John Doe',
    //    isBetaMember: false
    //   }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
