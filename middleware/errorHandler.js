const ApiError = require('../error/ApiError');
const env = (process.env.NODE_ENV || 'development').trim();

module.exports = function (error, req, res, next) {
  if (error instanceof ApiError) {
    const { status, message, errors, options } = error;

    return res.status(status).json({
      message,
      errors,
      options,
    });
  }

  if (env === 'production') {
    // Send an error to the Sentry
  }

  return res.status(500).json({
    message: 'Произошла неизвестная ошибка на сервере',
    trace: error,
  });
};
