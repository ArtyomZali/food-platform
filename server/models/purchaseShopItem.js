"use strict";

const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Purchase = require("./purchase");
const ShopItem = require("./shopItem");

const PurchaseShopItem = sequelize.define(
  "PurchaseShopItem",
  {
    shopItemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ShopItem,
        key: "id",
      },
    },
    purchaseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Purchase,
        key: "id",
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    tableName: "purchaseShopItems",
  }
);

module.exports = PurchaseShopItem;
