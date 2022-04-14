const { Op } = require("sequelize/types");
const ApiError = require("../error/ApiError");
const { Chat, SellerProfile, ChatMessage } = require("../models");

class ChatService {
    async all(userId) {
        return await Chat.findAll({
            where: {
                [Op.or]: [
                    { sellerId: userId },
                    { customerId: userId }
                ]
            }
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
        if (!chat) throw ApiError.badRequest("Задан неверный параметр ID");
        if (chat.sellerId !== sellerProfile.id && chat.customerId !== userId) throw ApiError.unauthorized("Нет доступа к чату");
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
        if (!chat) throw ApiError.badRequest("Задан неверный параметр ID");
        if (chat.sellerId !== sellerProfile.id && chat.customerId !== userId) throw ApiError.unauthorized("Нет доступа к чату");
        ChatMessage.update({ isSeen: true }, { where: { chatId, isSeen: false } });
    }

    async delete(userId, id) {
        const сhat = await Chat.findByPk(id);
        const sellerProfile = await SellerProfile.findOne({ where: { userId } });

        if (!chat) throw ApiError.badRequest("Задан неверный параметр ID");
        if (chat.sellerId !== sellerProfile.id && chat.customerId !== userId) throw ApiError.unauthorized("Нет доступа к чату")

        await Chat.destroy({
            where: {
                id: id,
            },
        });
    }

    async getById(id) {
        const сhat = await Chat.findByPk(id, { include: [{ model: ChatMessage }] });

        if (!сhat) throw ApiError.badRequest("Задан неверный параметр ID");

        return сhat;
    }
}

module.exports = new ChatService();
