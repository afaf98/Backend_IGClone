"use strict";
const { Model } = require("sequelize");

const bcrypt = require("bcrypt");
const saltRound = 10;

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    async comparePassword(passwordInput) {
      return await bcrypt.compare(passwordInput, this.password);
    }

    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        async beforeCreate(instance, options) {
          const hash = await bcrypt.hash(
            instance.dataValues.password,
            saltRound
          );
          instance.password = hash;
        },
      },
    }
  );
  return User;
};
