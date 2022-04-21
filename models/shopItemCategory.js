"use strict";

const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const SellerProfileCategory = require("./sellerProfileCategory");

const ShopItemCategory = sequelize.define(
  "ShopItemCategory",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sellerProfileCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: SellerProfileCategory,
        key: "id",
      }
    }
  },
  {
    tableName: "shopItemCategories",
  }
);

module.exports = ShopItemCategory;
