"use strict";

const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const ShopItemUnit = sequelize.define(
    "SellerProfileCategory",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isInteger: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        tableName: "shopItemUnits",
    }
);

module.exports = ShopItemUnit;
