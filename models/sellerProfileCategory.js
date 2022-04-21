"use strict";

const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const SellerProfileCategory = sequelize.define(
  "SellerProfileCategory",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    tableName: "sellerProfileCategories",
  }
);

module.exports = SellerProfileCategory;
