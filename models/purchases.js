"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Purchases extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Purchases belong to a User
      Purchases.belongsTo(models.Users, {
        foreignKey: "userId",
        as: "user",
      });

      // Purchases belong to a Product
      Purchases.belongsTo(models.Products, {
        foreignKey: "productId",
        as: "product",
      });
    }
  }
  Purchases.init(
    {
      userId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Purchases",
    }
  );
  return Purchases;
};
