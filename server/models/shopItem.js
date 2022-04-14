"use strict";

const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const SellerProfile = require('./sellerProfile');
const ShopItemCategory = require("./shopItemCategory");
const ShopItemUnit = require("./shopItemUnit");

const ShopItem = sequelize.define(
  "ShopItem",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: SellerProfile,
        key: "id",
      },
    },
    unit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ShopItemUnit,
        key: "id",
      },
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    count: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: ShopItemCategory,
        key: "id",
      },
    }
  },
  {
    tableName: "shopItems",
  }
);

module.exports = ShopItem;
