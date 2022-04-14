'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Address = sequelize.define(
    'Address',
    {
        x: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        y: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        tableName: 'addresses',
    }
);

module.exports = Address;
