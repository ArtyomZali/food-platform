// Determine the environment (dev or prod)
const env = (process.env.NODE_ENV || 'development').trim();
const config = require('../config/config.json')[env];
const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError');

function auth(req, res, next) {
  const authHeader = req.header('Authorization');

  // Check for token
  if (!authHeader) {
    return next(ApiError.unauthorized());
  }

  // Get rid of Bearer prefix in the token
  const token = authHeader.split(' ')[1];

  try {
    // Verify token and get the payload
    const userData = jwt.verify(token, config.jwtAccessSecret);
    // Add user from payload
    if (userData) {
      req.userId = userData.id;
    }

    next();
  } catch (e) {
    // Including type of error in order to frontend
    // can parse and refresh the JWT
    next(
      ApiError.unauthorized({
        type: 'INVALID_TOKEN',
      })
    );
  }
}

module.exports = auth;
