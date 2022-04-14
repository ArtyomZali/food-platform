const ApiError = require('../error/ApiError');
const { Purchase, PurchaseShopItem, SellerProfile, ShopItem } = require('../models');
const User = require('../models/user');

class PurchaseService {
  async getUserPurchases(userId) {
    const purchases = await Purchase.findAll({
      where: { customerId: userId },
      include: [
        {
          model: ShopItem
        },
        {
          model: SellerProfile
        }
      ]
    });
    return purchases;
  }

  async getUserOrders(userId) {
    const sellerProfile = await SellerProfile.findOne({
      where: { userId },
    });
    if (!sellerProfile) throw ApiError.notFound("Не существует аккаунта продавца");

    const orders = await Purchase.findAll({
      where: { sellerId: sellerProfile.id },
      include: [
        {
          model: ShopItem
        },
        {
          model: User,
          attributes: ['name', 'avatar', 'id']
        }
      ]
    });
    return orders;
  }

  async create(purchaseData) {
    const purchase = await Purchase.create(purchaseData.purchase);
    for (let index = 0; index < purchase.shopItems.length; index++) {
      await purchase.createShopItem(purchase.shopItems[index]);
    }
  }

  async updateStatus(userId, id, purchaseData) {
    const purchase = await Purchase.findByPk(id);
    const sellerProfile = await SellerProfile.findOne({ where: { userId } });

    if (!purchase) throw ApiError.badRequest('Задан неверный параметр ID');
    if (['canceled', 'done'].includes(purchase.status)) throw ApiError.forbidden("Нет возможности изменить статуса заказа");
    if (purchase.customerId !== userId && purchase.sellerId !== sellerProfile?.id) throw ApiError.unauthorized("Нет доступа к заказу");
    if (purchase.customerId === userId && purchaseData.status !== 'canceled') throw ApiError.forbidden("Неправильное значение статуса заказа");

    return await Purchase.update(purchaseData);
  }

  async getById(userId, id) {
    const sellerProfile = await SellerProfile.findOne({ where: { userId } });
    const purchase = await Purchase.findOne({
      where: {
        id: +id
      },
      include: [
        {
          model: ShopItem
        },
        {
          model: purchase.customerId === userId ? SellerProfile : User,
          attributes: ['name', 'avatar', 'id']
        }
      ]
    });

    if (!purchase) throw ApiError.badRequest('Задан неверный параметр ID');
    if (purchase.customerId !== userId && purchase.sellerId !== sellerProfile?.id) throw ApiError.unauthorized("Нет доступа к заказу");

    return purchase;
  }
}

module.exports = new PurchaseService();
