"use strict";
const { Model } = require("sequelize");

const bcrypt = require("bcrypt");
const follower = require("./follower");
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
      User.hasMany(models.Image, { foreignKey: "userId" });
      User.belongsToMany(models.User, {
        through: "Follower",
        foreignKey: "followerId",
        otherKey: "followingId",
        as: "followers",
      });
      User.belongsToMany(models.User, {
        through: "Follower",
        foreignKey: "followingId",
        otherKey: "followerId",
        as: "following",
      });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
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
