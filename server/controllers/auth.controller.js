const ApiError = require('../error/ApiError');
const BaseController = require('./base.controller');
const { authService } = require('../services');

class AuthController extends BaseController {
  /**
   * Register user
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  register = async (req, res, next) => {
    try {
      await this.respondWithValidationErrors(req, next);

      const data = await authService.register(req.body);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      await this.respondWithValidationErrors(req, next);

      const user = await authService.login({
        email: req.body.email,
        password: req.body.password,
      });

      return res.json(user);
    } catch (e) {
      return next(e);
    }
  };

  /**
   * Refresh user token
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   *
   * INFO: Refresh token should be placed in request Authorization header
   */
  refreshToken = async (req, res, next) => {
    try {
      if (!req.headers.authorization) next(ApiError.unauthorized());

      const refreshToken = req.headers.authorization.split(' ')[1];
      const tokens = await authService.refreshToken(refreshToken);

      res.json(tokens);
    } catch (e) {
      next(e);
    }
  };

  /**
   * Check if the given accessToken is valid
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  checkAuth = async (req, res, next) => {
    try {
      const accessToken = req.headers.authorization.split(' ')[1];
      await authService.checkAuth(accessToken);

      res.json({
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new AuthController();
