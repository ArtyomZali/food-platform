const ApiError = require("../error/ApiError");
const { SellerProfile } = require("../models");
const SellerProfileAsset = require("../models/sellerProfileAsset");
const SellerProfileCategory = require("../models/sellerProfileCategory");
const ShopItem = require("../models/shopItem");

class SellerProfileService {
    async all() {
        return await SellerProfile.findAll({
            where: {
                isPublished: true
            },
            include: [
                {
                    model: SellerProfileCategory
                }
            ]
        });
    }

    async getCategories() {
        return await SellerProfileCategory.findAll();
    }

    async create(userId, sellerProfileData) {
        const { categories, ...rest } = sellerProfileData
        const dbCategories = await SellerProfileCategory.findAll({
            where: {
                name: categories
            }
        })
        const sellerProfile = await SellerProfile.create({ userId, ...rest });
        for (let index = 0; index < dbCategories.length; index++) {
            await sellerProfile.addSellerProfileCategory(dbCategories[index]);
        }
        return sellerProfile;
    }

    async update(userId, sellerProfileData) {
        let sellerProfile = await SellerProfile.findOne({
            where: { userId },
        });

        if (!sellerProfile) throw ApiError.badRequest("Задан неверный параметр ID");
        const { categories, ...rest } = sellerProfileData
        const dbCategories = await SellerProfileCategory.findAll({
            where: {
                name: categories
            }
        });
        await sellerProfile.setSellerProfileCategorys([]);
        for (let index = 0; index < dbCategories.length; index++) {
            await sellerProfile.addSellerProfileCategory(dbCategories[index]);
        }

        sellerProfile = await SellerProfile.update(rest, { where: { userId } });
        return sellerProfile;
    }

    async delete(userId) {
        const sellerProfile = await SellerProfile.findOne({ where: { userId } });

        if (!sellerProfile) throw ApiError.badRequest("Задан неверный параметр ID");

        await SellerProfile.destroy({
            where: {
                userId,
            },
        });
    }

    async getById(id) {
        const sellerProfile = await SellerProfile.findByPk(id, {
            include: [
                {
                    model: SellerProfileAsset
                },
                {
                    model: ShopItem
                }
            ]
        });

        return sellerProfile;
    }
}

module.exports = new SellerProfileService();
