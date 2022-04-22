"use strict";

const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const SellerProfile = require('./sellerProfile');
const ShopItemCategory = require("./shopItemCategory");

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
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    count: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    unitName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isUnitInteger: {
      type: DataTypes.BOOLEAN,
      allowNull: false
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
