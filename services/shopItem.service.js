const ApiError = require("../error/ApiError");
const { Op } = require("sequelize");
const { ShopItem, SellerProfile, ShopItemCategory, ShopItemAsset } = require("../models");
const Review = require("../models/review");

class ShopItemService {
  async all(query) {
    const whereParams = {};

    const order = [];
    switch (query.sort) {
      case 'createdAtDesc':
        order.push(['createdAt', 'DESC']);
        break;

      case 'createdAtAsc':
        order.push(['createdAt', 'ASC']);
        break;

      case 'updatedAtDesc':
        order.push(['updatedAt', 'DESC']);
        break;

      case 'updatedAtAsc':
        order.push(['updatedAt', 'ASC']);
        break;

      case 'priceDesc':
        order.push(['price', 'DESC']);
        break;

      case 'priceAsc':
        order.push(['price', 'ASC']);
        break;
    }
    if (query.categories)
      whereParams.categoryId = {
        [Op.in]: query.categories,
      };
    if (query.search)
      whereParams.name = {
        [Op.iLike]: `%${query.search}%`,
      };

    const shopItems = await ShopItem.findAll({
      where: {
        isPublished: true,
        ...whereParams
      },

      order,

      include: [
        {
          model: Review
        },
        {
          model: ShopItemCategory
        }
      ]
    });
    return shopItems;
  }

  async getCategories() {
    return await ShopItemCategory.findAll();
  }

  async getUserShopItems(userId) {
    const sellerProfile = await SellerProfile.findOne({ where: { userId } });

    if (!sellerProfile) throw ApiError.badRequest("Задан неверный параметр ID");

    return await ShopItem.findAll({
      where: { ownerId: sellerProfile.id },
      include: [{
        model: ShopItemCategory
      }]
    });
  }

  async create(userId, shopItemData) {
    const sellerProfile = await SellerProfile.findOne({ where: { userId } });

    if (!sellerProfile) throw ApiError.badRequest("Задан неверный параметр ID");
    const { category, ...rest } = shopItemData;
    let shopItem = await ShopItem.create({ ...rest, ownerId: sellerProfile.id });
    await shopItem.setShopItemCategory(await ShopItemCategory.findByPk(category.id));
    return shopItem;
  }

  async update(userId, id, shopItemData) {
    let shopItem = await ShopItem.findByPk(id);
    const sellerProfile = await SellerProfile.findOne({ where: { userId } });

    if (!sellerProfile) throw ApiError.badRequest("Задан неверный параметр ID");
    if (!shopItem) throw ApiError.badRequest("Задан неверный параметр ID");
    if (shopItem.ownerId !== sellerProfile.id) throw ApiError.badRequest("У пользователя нет доступа к изменению товара");

    const { category, ...rest } = shopItemData;
    shopItem = await ShopItem.update({ ...rest, categoryId: category ? category.id : null }, { where: { id: sellerProfile.id } });

    return shopItem;
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
          model: ShopItemCategory
        }
      ]
    });

    if (!shopItem) throw ApiError.badRequest("Задан неверный параметр ID");

    return shopItem;
  }

  async getByOwnerId(ownerId) {
    const shopItems = await ShopItem.findAll({
      where: {
        ownerId,
        isPublished: true
      },
      include: [
        {
          model: Review
        }
      ]
    });

    return shopItems;
  }
}

module.exports = new ShopItemService();
