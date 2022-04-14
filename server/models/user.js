'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Address = require("./address");

const User = sequelize.define(
  'User',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
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
    }
  },
  {
    tableName: 'users',
  }
);

module.exports = User;
