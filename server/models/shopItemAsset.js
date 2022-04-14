"use strict";

const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const ShopItem = require("./shopItem");

const ShopItemAsset = sequelize.define(
  "ShopItemAsset",
  {
    shopItemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ShopItem,
        key: "id",
      },
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "shopItemAssets",
  }
);

module.exports = ShopItemAsset;
