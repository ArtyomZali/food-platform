const { shopItemService } = require('../services');
const BaseController = require('./base.controller');

class ShopItemController extends BaseController {
  all = async (req, res, next) => {
    try {
      const data = await shopItemService.all();

      return res.json(data);
    } catch (error) {
      next(error);
    }
  };

  getCategories = async (req, res, next) => {
    try {
      const data = await shopItemService.getCategories();

      return res.json(data);
    } catch (error) {
      next(error);
    }
  };

  createUnit = async (req, res, next) => {
    try {
      await this.respondWithValidationErrors(req, next);

      const data = await shopItemService.createUnit(req.userId, req.params.id, req.body);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      await this.respondWithValidationErrors(req, next);

      const data = await shopItemService.create(req.userId, req.body);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      await this.respondWithValidationErrors(req, next);

      await shopItemService.update(req.userId, req.params.id, req.body);
      return res.json({
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  updateUnit = async (req, res, next) => {
    try {
      await this.respondWithValidationErrors(req, next);

      const data = await shopItemService.updateUnit(req.userId, req.params.id, req.body);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      await shopItemService.delete(req.userId, req.params.id);
      return res.json({
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const data = await shopItemService.getById(req.params.id);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  };

  getByOwnerId = async (req, res, next) => {
    try {
      const data = await shopItemService.getByOwnerId(req.params.id);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new ShopItemController();
