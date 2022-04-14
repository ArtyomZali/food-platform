"use strict";

const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const SellerProfile = require("./sellerProfile");
const SellerProfileCategory = require("./sellerProfileCategory");

const SellerProfileCategoryBind = sequelize.define(
  "SellerProfileCategory",
  {
    sellerProfileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: SellerProfile,
        key: "id",
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: SellerProfileCategory,
        key: "id",
      },
    },
  },
  {
    tableName: "sellerProfileCategoryBinds",
  }
);

module.exports = SellerProfileCategoryBind;
