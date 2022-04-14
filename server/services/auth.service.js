const { User } = require("../models");
const ApiError = require("../error/ApiError");
const tokenService = require("./token.service");
const env = (process.env.NODE_ENV || "development").trim();
const config = require("../config/config.json")[env];
const md5 = require("md5");
const bcrypt = require('bcrypt');

class AuthService {
  /**
   * Register user
   *
   * @param {object} userData
   * @returns {object}
   */
  async register(userData) {
    const user = await User.findOne({ where: { email: userData.email } });

    // Throws error if the user doesn't exist
    if (user)
      throw ApiError.badRequest("Пользователь с таким Email адресом уже зарегистрирован");

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const { password, ...createdUser} = await User.create({
      ...userData,
      password: hashedPassword,
    });

    return createdUser;
  }

  /**
   *
   * @param {object} credentials
   * @returns {object}
   */
  async login({ email, password }) {
    const user = await User.findOne({ where: { email } });

    // Throws error if the user doesn't exist
    if (!user)
      throw ApiError.badRequest("Пользователь с таким Email адресом не найден");

    const isPasswordCorrect = user && (await bcrypt.compare(password, user.password));

    if (!isPasswordCorrect) {
      throw ApiError.badRequest('Неверный логин или пароль');
    }
    
    const tokens = tokenService.generateTokens({ id: user.id, email });

    return tokens;
  }

  /**
   * Refresh user token
   *
   * @param {string} refreshToken
   */
  async refreshToken(refreshToken) {
    // If refresh token isn't included in Authorization header
    if (!refreshToken) {
      throw ApiError.unauthorized();
    }

    // Verify refresh token validity
    const userData = tokenService.verifyRefreshToken(refreshToken);

    if (!userData) throw ApiError.unauthorized();

    const user = await User.findByPk(userData.id);

    return tokenService.generateTokens({
      id: user.id,
      email: user.email,
    });
  }

  /**
   * Check if hash is correct
   *
   * @param {string} hash
   * @returns
   */
  validateHash = async (hash) => {
    if (!hash || md5(config.loginSecret) !== hash)
      throw ApiError.unauthorized();

    return true;
  };

  /**
   * Check if the given accessToken is valid
   *
   * @param {string} accessToken
   */
  checkAuth = async (accessToken) => {
    const userData = tokenService.verifyAccessToken(accessToken);

    if (!userData) throw ApiError.forbidden("Неверные учетные данные");

    return true;
  };
}

module.exports = new AuthService();
