const ApiError = require("../error/ApiError");
const { SellerProfile, Address, SellerProfileAsset, SellerProfileCategory, ShopItem, ShopItemCategory, User } = require("../models");
const { Op } = require('sequelize');

class SellerProfileService {
    async all(query, userId) {
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
        }
        if (query.categories)
            whereParams.categoryId = {
                [Op.contains]: query.categories,
            };
        if (query.search)
            whereParams.name = {
                [Op.iLike]: `%${query.search}%`,
            };

        const sellerProfiles = await SellerProfile.findAll({
            where: {
                isPublished: true,
                ...whereParams
            },
            include: [
                {
                    model: SellerProfileCategory
                },
                {
                    model: Address
                }
            ]
        });
        if (query.sort === 'near' && userId) {
            const user = await User.findOne({ where: { id: userId }, include: [Address] });
            return sellerProfiles.sort((first, second) => {
                if (first.Address) {
                    if (!second.Address) {
                        return 1;
                    } else {
                        return this.getDistanceBetweenPoints(first.Address, user.Address) - this.getDistanceBetweenPoints(second.Address, user.Address);
                    }
                } else if (second.Address) {
                    return -1;
                } else {
                    return 0;
                }
            })
        }
        return sellerProfiles;
    }

    getDistanceBetweenPoints(first, second) {
        return (first.x - second.x) * (first.x - second.x) + (first.y - second.y) * (first.y - second.y)
    }

    async getCategories() {
        return await SellerProfileCategory.findAll();
    }

    async getExtendedCategories() {
        return await SellerProfileCategory.findAll({ include: [{ model: ShopItemCategory }] });
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
        if (body.x && body.y) {
            if (sellerProfile.addressId) {
                return await Address.update(body, { where: { id: sellerProfile.addressId } });
            } else {
                return await sellerProfile.createAddress(body);
            }
        } else {
            sellerProfile.setAddress(null);
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
