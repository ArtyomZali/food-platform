// Determine the environment (dev or prod)
const env = (process.env.NODE_ENV || 'development').trim();
const config = require('../config/config.json')[env];
const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError');

function auth(req, res, next) {
  const authHeader = req.header('Authorization');
  if (authHeader) {
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
      next();
      console.log('No auth token')
    }
  } else {
    next();
  }

}

module.exports = auth;
