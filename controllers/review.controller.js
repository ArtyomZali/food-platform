const { reviewService } = require("../services");
const BaseController = require("./base.controller");

class ReviewController extends BaseController {
  create = async (req, res, next) => {
    try {
      await this.respondWithValidationErrors(req, next);

      const data = await reviewService.create(req.userId, req.body);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      await reviewService.delete(req.userId, req.params.id);
      return res.json({
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  getByShopItemId = async (req, res, next) => {
    try {
      const data = await reviewService.getByShopItemId(req.params.id);
      return res.json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

module.exports = new ReviewController();
