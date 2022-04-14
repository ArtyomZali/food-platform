"use strict";

const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./user");
const Address = require("./address");

const SellerProfile = sequelize.define(
  "SellerProfile",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    address: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Address,
        key: "id",
      },
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    tableName: "sellerProfiles",
  }
);

module.exports = SellerProfile;
