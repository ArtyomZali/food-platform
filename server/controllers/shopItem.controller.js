const { shopItemService } = require('../services');
const BaseController = require('./base.controller');

class ShopItemController extends BaseController {
  all = async (req, res, next) => {
    try {
      const categories = req.query.categories;
      const sort = req.query.sort;
      const search = req.query.search;

      const data = await shopItemService.all({
        categories: categories ? categories.split(',') : null,
        sort,
        search
      });

      return res.json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  getUserShopItems = async (req, res, next) => {
    try {
      const data = await shopItemService.getUserShopItems(req.userId);

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
      console.log(error);
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
      console.log(error);
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
      console.log(error)
      next(error);
    }
  };

  getByOwnerId = async (req, res, next) => {
    try {
      const data = await shopItemService.getByOwnerId(req.params.id);
      return res.json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

module.exports = new ShopItemController();
