"use strict";

const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const SellerProfile = require('./sellerProfile');

const SellerProfileAsset = sequelize.define(
  "SellerProfileAsset",
  {
    sellerProfileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: SellerProfile,
        key: "id",
      },
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "sellerProfileAssets",
  }
);

module.exports = SellerProfileAsset;
