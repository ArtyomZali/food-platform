const jwt = require('jsonwebtoken');
const env = (process.env.NODE_ENV || 'development').trim();
const config = require('../config/config.json')[env];

class TokenService {
  /**
   * Generate access and refresh tokens
   *
   * @param {object} payload
   * @returns {object}
   */
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, config.jwtAccessSecret, { expiresIn: '1h' });
    const refreshToken = jwt.sign(payload, config.jwtRefreshSecret, { expiresIn: '30d' });

    return {
      access: accessToken,
      refresh: refreshToken,
    };
  }

  /**
   * Verify access token validity
   *
   * @param {string} accessToken
   * @returns userData | null
   */
  verifyAccessToken(accessToken) {
    try {
      return jwt.verify(accessToken, config.jwtAccessSecret);
    } catch (e) {
      return null;
    }
  }

  /**
   * Verify refresh token validity
   *
   * @param {string} accessToken
   * @returns userData | null
   */
  verifyRefreshToken(refreshToken) {
    try {
      return jwt.verify(refreshToken, config.jwtRefreshSecret);
    } catch (e) {
      return null;
    }
  }
}

module.exports = new TokenService();
