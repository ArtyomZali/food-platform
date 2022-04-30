const { Op } = require("sequelize");
const sequelize = require("../db");
const ApiError = require("../error/ApiError");
const { Chat, SellerProfile, ChatMessage, User } = require("../models");

class ChatService {
    async all(userId) {
        const sellerProfile = await SellerProfile.findOne({ where: { userId } });
        return await Chat.findAll({
            where: {
                [Op.or]:
                    sellerProfile ?
                        [{ sellerId: sellerProfile?.id },
                        { customerId: userId }]
                        : [{ customerId: userId }]

            },
            include: [
                {
                    model: SellerProfile
                },
                {
                    model: User,
                    attributes: ['id', 'name', 'avatar']
                },
                {
                    model: ChatMessage,
                    order: [['id', 'desc']],
                    limit: 1
                }
            ]
        });
    }

    async create(userId, chatData) {
        if (chatData.sellerId) {
            const chat = await Chat.findOne({ where: { customerId: userId, sellerId: chatData.sellerId } });
            if (chat) throw ApiError.conflict("Чат уже существует!");
            return await Chat.create({ ...chatData, customerId: userId });
        } else if (chatData.customerId) {
            const sellerProfile = await SellerProfile.findOne({ where: { userId } })
            const chat = await Chat.findOne({ where: { customerId: chatData.customerId, sellerId: sellerProfile.id } });
            if (chat) throw ApiError.conflict("Чат уже существует!");
            return await Chat.create({ ...chatData, sellerId: sellerProfile.id });
        }
    }

    async sendMessage(userId, chatId, chatData) {
        const chat = await Chat.findOne({ where: { id: chatId } });
        const sellerProfile = await SellerProfile.findOne({ where: { userId } });

        if (!chat) throw ApiError.badRequest("Задан неверный параметр ID");
        if (chat.sellerId !== sellerProfile?.id && chat.customerId !== userId) throw ApiError.unauthorized("Нет доступа к чату");

        return await ChatMessage.create({
            chatId,
            text: chatData.text,
            order: await ChatMessage.count({ where: { chatId } }),
            isSeen: false,
            author: chat.customerId === userId ? 'customer' : 'seller'
        });
    }

    async readMessages(userId, chatId) {
        const chat = await Chat.findOne({ where: { id: chatId } });
        const sellerProfile = await SellerProfile.findOne({ where: { userId } });

        if (!chat) throw ApiError.badRequest("Задан неверный параметр ID");
        if (chat.sellerId !== sellerProfile?.id && chat.customerId !== userId) throw ApiError.unauthorized("Нет доступа к чату");

        if (chat.sellerId === sellerProfile?.id) {
            return await ChatMessage.update({ isSeen: true }, { where: { chatId, author: 'customer', isSeen: false } });
        } else {
            return await ChatMessage.update({ isSeen: true }, { where: { chatId, author: 'seller', isSeen: false } });
        }
    }

    async delete(userId, id) {
        const chat = await Chat.findByPk(id);
        const sellerProfile = await SellerProfile.findOne({ where: { userId } });

        if (!chat) throw ApiError.badRequest("Задан неверный параметр ID");
        if (chat.sellerId !== sellerProfile.id && chat.customerId !== userId) throw ApiError.unauthorized("Нет доступа к чату")

        await Chat.destroy({
            where: {
                id: id,
            },
        });
    }

    async getById(userId, id) {
        const chat = await Chat.findByPk(id, {
            include: [{
                model: SellerProfile
            },
            {
                model: User,
                attributes: ['id', 'name', 'avatar']
            },
            {
                model: ChatMessage
            }]
        });
        const sellerProfile = await SellerProfile.findOne({ where: { userId } });

        if (!chat) throw ApiError.badRequest("Задан неверный параметр ID");
        if (chat.sellerId !== sellerProfile?.id && chat.customerId !== userId) throw ApiError.unauthorized("Нет доступа к чату");

        return chat;
    }

    async getBySellerAndCustomerIds(userId, sellerId, customerId) {
        const chat = await Chat.findOne({
            where: {
                sellerId, customerId
            }
        });
        const sellerProfile = await SellerProfile.findOne({ where: { userId } });

        if (!chat) throw ApiError.badRequest("Задан неверный параметр ID");
        if (chat.sellerId !== sellerProfile?.id && chat.customerId !== userId) throw ApiError.unauthorized("Нет доступа к чату");

        return chat;
    }
}

module.exports = new ChatService();
