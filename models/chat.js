'use strict';
const User = require('./user.js');
const SellerProfile = require('./sellerProfile');

const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Chat = sequelize.define(
  'Chat',
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
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    tableName: 'chats',
  }
);

module.exports = Chat;
