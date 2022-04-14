'use strict';
const Chat = require('./chat.js');

const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const ChatMessage = sequelize.define(
    'ChatMessage',
    {
        chatId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Chat,
                key: "id",
            },
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        order: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isSeen: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        tableName: 'chatMessages',
    }
);

module.exports = ChatMessage;
