"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Follower extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Follower.belongsTo(models.User, { foreignKey: "followerId" });
      Follower.belongsTo(models.User, { foreignKey: "followingId" });
    }
  }
  Follower.init(
    {
      followerId: DataTypes.INTEGER,
      followingId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Follower",
    }
  );
  return Follower;
};
