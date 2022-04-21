const env = (process.env.NODE_ENV || 'development').trim();

class ApiError extends Error {
  constructor(status, message, errors = [], options = {}) {
    super();

    this.status = status;
    this.message = message;
    this.errors = errors;
    this.options = options;
  }

  static unauthorized(options = {}) {
    return new ApiError(401, 'Учетные данные не были предоставлены', [], options);
  }

  static badRequest(message, options = {}) {
    return new ApiError(400, message, [], options);
  }

  static conflict(message) {
    return new ApiError(409, message);
  }

  static notFound(message) {
    return new ApiError(404, message);
  }

  static internal(error = null) {
    const errorObj = {
      message: 'Произошла неизвестная ошибка на сервере',
      status: 500,
    };

    if (env === 'production') {
      // Send an error to the Sentry
    }

    return new ApiError(errorObj.status, errorObj.message);
  }

  static forbidden(message) {
    return new ApiError(403, message);
  }

  static validationError(errors = []) {
    return new ApiError(422, 'Ошибка валидации данных', errors);
  }
}

module.exports = ApiError;
