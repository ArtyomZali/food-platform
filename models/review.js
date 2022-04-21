"use strict";

const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const ShopItem = require("./shopItem");
const User = require("./user");

const Review = sequelize.define(
  "Review",
  {
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    shopItemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ShopItem,
        key: "id",
      },
    },
    text: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    grade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    tableName: "reviews",
  }
);

module.exports = Review;
