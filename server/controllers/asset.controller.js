const { assetService } = require('../services');
const BaseController = require('./base.controller');

class AssetController extends BaseController {
  getAssetsBySellerProfileId = async (req, res, next) => {
    try {
      const data = await assetService.getAssetsBySellerProfileId(req.params.id);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  };

  getSellerProfileAsset = async (req, res, next) => {
    try {
      const data = await assetService.getSellerProfileAsset(req.params.id);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  };

  createSellerProfileAsset = async (req, res, next) => {
    try {
      await this.respondWithValidationErrors(req, next);

      const data = await assetService.createSellerProfileAsset(req.userId, { ...req.body, filename: req.file.filename });

      return res.json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  deleteSellerProfileAsset = async (req, res, next) => {
    try {
      await this.respondWithValidationErrors(req, next);

      await assetService.deleteSellerProfileAsset(req.userId, req.params.id);

      return res.json({
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  getAssetsByShopItemId = async (req, res, next) => {
    try {
      const data = await assetService.getAssetsByShopItemId(req.params.id);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  };

  getShopItemAsset = async (req, res, next) => {
    try {
      const data = await assetService.getShopItemAsset(req.params.id);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  };

  createShopItemAsset = async (req, res, next) => {
    try {
      await this.respondWithValidationErrors(req, next);

      const data = await assetService.createShopItemAsset(req.userId, req.params.id, { ...req.body, filename: req.file.filename });

      return res.json(data);
    } catch (error) {
      next(error);
    }
  };

  deleteShopItemAsset = async (req, res, next) => {
    try {
      await this.respondWithValidationErrors(req, next);

      await assetService.deleteShopItemAsset(req.userId, req.params.id);

      return res.json({
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  setUserAvatar = async (req, res, next) => {
    try {
      await this.respondWithValidationErrors(req, next);

      await assetService.setUserAvatar(req.userId, req.file ? req.file.filename : null);

      return res.json({
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  setSellerProfileAvatar = async (req, res, next) => {
    try {
      await this.respondWithValidationErrors(req, next);

      await assetService.setSellerProfileAvatar(req.userId, req.file ? req.file.filename : null);

      return res.json({
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  setShopItemAvatar = async (req, res, next) => {
    try {
      await this.respondWithValidationErrors(req, next);

      await assetService.setSellerProfileAvatar(req.userId, req.params.id, req.file ? req.file.filename : null);

      return res.json({
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new AssetController();
