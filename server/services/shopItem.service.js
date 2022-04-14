const ApiError = require("../error/ApiError");
const { ShopItem, SellerProfile } = require("../models");
const Review = require("../models/review");
const ShopItemAsset = require("../models/shopItemAsset");
const ShopItemUnit = require("../models/shopItemUnit");

class ShopItemService {
  async all() {
    return await ShopItem.findAll({ where: { isPublish: true } });
  }

  async create(userId, shopItemData) {
    const sellerProfile = await SellerProfile.findOne({ where: { userId } });

    if (!sellerProfile) throw ApiError.badRequest("Задан неверный параметр ID");
    
    return await ShopItem.create({ ...shopItemData, ownerId: sellerProfile.id });
  }

  async createUnit(userId, shopItemId, unitData) {
    const shopItem = await ShopItem.findByPk(shopItemId);
    const sellerProfile = await SellerProfile.findOne({ where: { userId } });

    if (!sellerProfile) throw ApiError.badRequest("Задан неверный параметр ID");
    if (!shopItem) throw ApiError.badRequest("Задан неверный параметр ID");
    if (shopItem.ownerId !== sellerProfile.id) throw ApiError.badRequest("У пользователя нет доступа к изменению товара");

    return await shopItem.createShopItemUnit(unitData);
  }

  async update(userId, id, shopItemData) {
    const shopItem = await ShopItem.findByPk(id);
    const sellerProfile = await SellerProfile.findOne({ where: { userId } });

    if (!sellerProfile) throw ApiError.badRequest("Задан неверный параметр ID");
    if (!shopItem) throw ApiError.badRequest("Задан неверный параметр ID");
    if (shopItem.ownerId !== sellerProfile.id) throw ApiError.badRequest("У пользователя нет доступа к изменению товара");

    return await ShopItem.update(shopItemData, { where: { id: sellerProfile.id } });
  }

  async updateUnit(userId, shopItemId, unitData) {
    const shopItem = await ShopItem.findByPk(shopItemId);
    const sellerProfile = await SellerProfile.findOne({ where: { userId } });

    if (!sellerProfile) throw ApiError.badRequest("Задан неверный параметр ID");
    if (!shopItem) throw ApiError.badRequest("Задан неверный параметр ID");
    if (shopItem.ownerId !== sellerProfile.id) throw ApiError.badRequest("У пользователя нет доступа к изменению товара");

    return await ShopItemUnit.update(unitData, {where: {id: shopItem.unitId}});
  }

  async delete(userId, id) {
    const shopItem = await ShopItem.findByPk(id);
    const sellerProfile = await SellerProfile.findOne({ where: { userId } });

    if (!sellerProfile) throw ApiError.badRequest("Задан неверный параметр ID");
    if (!shopItem) throw ApiError.badRequest("Задан неверный параметр ID");
    if (shopItem.ownerId !== sellerProfile.id) throw ApiError.badRequest("У пользователя нет доступа к изменению товара");

    await ShopItem.destroy({
      where: {
        id: id,
      },
    });
  }

  async getById(id) {
    const shopItem = await ShopItem.findByPk(id, {
      include: [
        {
          model: ShopItemAsset
        },
        {
          model: Review
        },
        {
          model: SellerProfile
        },
        {
          model: ShopItemUnit
        }
      ]
    });

    if (!shopItem) throw ApiError.badRequest("Задан неверный параметр ID");

    return shopItem;
  }

  async getByOwnerId(ownerId) {
    const shopItems = await ShopItem.findAll({
      where: {
        ownerId
      }
    })

    if (!ShopItems.length) throw ApiError.badRequest("Задан неверный параметр ID");

    return shopItems;
  }
}

module.exports = new ShopItemService();
