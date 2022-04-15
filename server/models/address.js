'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Address = sequelize.define(
    'Address',
    {
        x: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        y: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
    },
    {
        tableName: 'addresses',
    }
);

module.exports = Address;
