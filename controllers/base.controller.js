const ApiError = require('../error/ApiError');
const { validationResult } = require('express-validator');

class BaseController {
  /**
   * Find any validation errors and return JSON response
   * with the object containing all errors
   *
   * @param {*} req
   * @param {*} next
   */
  respondWithValidationErrors(req, next) {
    return new Promise(resolve => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(ApiError.validationError(errors.array()));
      }

      resolve();
    });
  }
}

module.exports = BaseController;
