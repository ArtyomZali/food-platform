const { chatService } = require('../services');
const BaseController = require('./base.controller');

class ChatController extends BaseController {
  all = async (req, res, next) => {
    try {
      const data = await chatService.all(req.userId);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      await this.respondWithValidationErrors(req, next);

      const data = await chatService.create(req.userId, req.body);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  };

  sendMessage = async (req, res, next) => {
    try {
      await this.respondWithValidationErrors(req, next);

      const data = await chatService.sendMessage(req.userId, req.params.id, req.body);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  };

  readMessages = async (req, res, next) => {
    try {
      await this.respondWithValidationErrors(req, next);

      await chatService.readMessages(req.userId, req.params.id);

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
      await chatService.delete(req.userId, req.params.id);
      return res.json({
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const data = await chatService.getById(req.userId, req.params.id);
      return res.json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  getBySellerAndCustomerIds = async (req, res, next) => {
    try {
      const data = await chatService.getBySellerAndCustomerIds(req.userId, +req.query.sellerId, +req.query.customerId);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ChatController();
