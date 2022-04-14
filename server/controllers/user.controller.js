const BaseController = require("./base.controller");
const { userService } = require("../services");

class UserController extends BaseController {

  getInfo = async (req, res, next) => {
    try {
      const accessToken = req.headers.authorization.split(" ")[1];
      const data = await userService.getCurrentUserInfo(accessToken);
      res.json(data);
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      await this.respondWithValidationErrors(req, next);

      await userService.update(req.userId, body);
      return res.json({
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const data = await userService.getById(req.params.id);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new UserController();
