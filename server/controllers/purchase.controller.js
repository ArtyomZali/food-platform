const { purchaseService } = require('../services');
const BaseController = require('./base.controller');

class PurchaseController extends BaseController {
  getUserPurchases = async (req, res, next) => {
    try {
      const data = await purchaseService.getUserPurchases(req.userId);

      return res.json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  getUserOrders = async (req, res, next) => {
    try {
      const data = await purchaseService.getUserOrders(req.userId);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      await this.respondWithValidationErrors(req, next);

      const data = await purchaseService.create(req.userId, req.body);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  };

  updateStatus = async (req, res, next) => {
    try {
      await this.respondWithValidationErrors(req, next);

      const { body, params, userId } = req;
      await purchaseService.updateStatus(userId, params.id, body);
      return res.json({
        success: true,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const data = await purchaseService.getById(req.userId, req.params.id);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new PurchaseController();
