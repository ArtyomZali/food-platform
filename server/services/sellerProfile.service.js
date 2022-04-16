const ApiError = require("../error/ApiError");
const { SellerProfile, Address, SellerProfileAsset, SellerProfileCategory, ShopItem } = require("../models");

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
        let sellerProfile = await SellerProfile.findOne({
            where: { userId },
        });

        if (sellerProfile) throw ApiError.badRequest("Аккаунт продавца уже существует!");

        const { categories, ...rest } = sellerProfileData
        const dbCategories = await SellerProfileCategory.findAll({
            where: {
                name: categories.map(category => { return category.name })
            }
        })
        sellerProfile = await SellerProfile.create({ userId, ...rest });
        sellerProfile = await sellerProfile.setSellerProfileCategories(dbCategories);

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
                name: categories.map(category => { return category.name })
            }
        });
        await sellerProfile.setSellerProfileCategories([]);
        for (let index = 0; index < dbCategories.length; index++) {
            await sellerProfile.addSellerProfileCategory(dbCategories[index]);
        }

        sellerProfile = await SellerProfile.update(rest, { where: { userId } });
        return sellerProfile;
    }

    async updateAddress(userId, body) {
        let sellerProfile = await SellerProfile.findOne({
            where: { userId },
        });
        if (!sellerProfile) throw ApiError.badRequest("Задан неверный параметр ID");

        if (sellerProfile.addressId) {
            return await Address.update(body, { where: { id: sellerProfile.addressId } });
        } else {
            return await sellerProfile.createAddress(body);
        }
    };

    async delete(userId) {
        const sellerProfile = await SellerProfile.findOne({ where: { userId } });

        if (!sellerProfile) throw ApiError.badRequest("Задан неверный параметр ID");

        await SellerProfile.destroy({
            where: {
                userId,
            },
        });
    }

    async getUserSellerProfile(userId) {
        return await SellerProfile.findOne({
            where: {
                userId
            },
            include: [
                {
                    model: SellerProfileAsset
                },
                {
                    model: SellerProfileCategory
                },
                {
                    model: Address
                }
            ]
        });
    }

    async getById(id) {
        const sellerProfile = await SellerProfile.findByPk(id, {
            include: [
                {
                    model: SellerProfileAsset
                },
                {
                    model: SellerProfileCategory
                },
                {
                    model: Address
                }
            ]
        });

        if (!sellerProfile) throw ApiError.badRequest("Задан неверный параметр ID");

        return sellerProfile;
    }
}

module.exports = new SellerProfileService();
