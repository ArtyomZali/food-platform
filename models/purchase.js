"use strict";

const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const SellerProfile = require("./sellerProfile");
const User = require('./user');

const Purchase = sequelize.define(
  "Purchase",
  {
    sellerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: SellerProfile,
        key: "id",
      },
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: "id",
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    tableName: "purchases",
  }
);

module.exports = Purchase;
