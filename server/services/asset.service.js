const ApiError = require('../error/ApiError');
const { SellerProfile, SellerProfileAsset, ShopItem, ShopItemAsset, User, } = require('../models');

class AssetService {
    async getAssetsBySellerProfileId(id) {
        return await SellerProfileAsset.findAll({ where: { sellerProfileId: id } });
    }

    async getSellerProfileAsset(id) {
        const asset = await SellerProfileAsset.findByPk(id);
        if (!asset) throw ApiError.notFound("Материала с таким идентификатором не найдено");

        return asset;
    }

    async createSellerProfileAsset(userId, assetData) {
        const sellerProfile = await SellerProfile.findOne({ where: { userId } });
        if (!sellerProfile) throw ApiError.badRequest("У данного пользователя нет аккаунта продавца");

        await SellerProfileAsset.create({
            sellerProfileId: sellerProfile.id,
            type: assetData.type,
            link: `/uploads/images/${assetData.filename}`
        })
    }

    async deleteSellerProfileAsset(userId, assetId) {
        const sellerProfile = await SellerProfile.findOne({ where: { userId } });
        if (!sellerProfile) throw ApiError.badRequest("У данного пользователя нет аккаунта продавца");
        const asset = await SellerProfileAsset.findByPk(assetId);
        if (!asset) throw ApiError.badRequest("Указан неверный параметр ID");
        if (asset.sellerProfileId !== sellerProfile.id) throw ApiError.forbidden("У данного пользователя нет доступа к удалению материала");

        await SellerProfileAsset.destroy({ where: { id: assetId } });
    }

    async getAssetsByShopItemId(id) {
        return await ShopItemAsset.findAll({ where: { shopItemId: id } });
    }

    async getShopItemAsset(id) {
        const asset = await ShopItemAsset.findByPk(id);
        if (!asset) throw ApiError.notFound("Материала с таким идентификатором не найдено");

        return asset;
    }

    async createShopItemAsset(userId, assetData) {
        const sellerProfile = await SellerProfile.findOne({ where: { userId } });
        if (!sellerProfile) throw ApiError.badRequest("У данного пользователя нет аккаунта продавца");
        const shopItem = await ShopItem.findOne({ where: { ownerId: sellerProfile.id } });
        if (!shopItem) throw ApiError.badRequest("Товар не найден");

        await ShopItemAsset.create({
            ShopItemId: ShopItem.id,
            type: assetData.type,
            link: `/uploads/images/${assetData.filename}`
        })
    }

    async deleteShopItemAsset(userId, assetId) {
        const sellerProfile = await SellerProfile.findOne({ where: { userId } });
        if (!sellerProfile) throw ApiError.badRequest("У данного пользователя нет аккаунта продавца");
        const asset = await ShopItemAsset.findByPk(assetId);
        if (!asset) throw ApiError.badRequest("Указан неверный параметр ID");
        const shopItem = await ShopItem.findByPk(asset.shopItemId);
        if (!shopItem) throw ApiError.badRequest("Товар не найден");
        if (ShopItem.ownerId !== sellerProfile.id) throw ApiError.forbidden("У данного пользователя нет доступа к удалению материала");

        await ShopItemAsset.destroy({ where: { id: assetId } });
    }

    async setUserAvatar(userId, filename) {
        await User.update({ avatar: filename ? `/uploads/images/${filename}` : null }, { where: { id: userId } });
    }

    async setSellerProfileAvatar(userId, filename) {
        const sellerProfile = await SellerProfile.findOne({ where: { userId } });
        if (!sellerProfile) throw ApiError.badRequest("У данного пользователя нет аккаунта продавца");

        await SellerProfile.update({ avatar: `/uploads/images/${filename}` }, { where: { userId } });
    }

    async setShopItemAvatar(userId, id, filename) {
        const sellerProfile = await SellerProfile.findOne({ where: { userId } });
        if (!sellerProfile) throw ApiError.badRequest("У данного пользователя нет аккаунта продавца");
        const shopItem = ShopItem.findByPk(id);
        if (!shopItem) throw ApiError.badRequest("Указан неверный параметр ID");
        if (shopItem.ownerId !== sellerProfile.id) throw ApiError.forbidden("У данного пользователя нет доступа к изменению товара");

        await ShopItem.update({ avatar: `/uploads/images/${filename}` }, { where: { id } });
    }
}

module.exports = new AssetService();
