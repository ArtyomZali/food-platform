const User = require("../models/user");
const tokenService = require("./token.service");
const ApiError = require("../error/ApiError");

class UserService {

  getById = async (id) => {
    const user = await User.findOne({
      where: {
        id,
      },
    });

    if (!user) throw ApiError.badRequest("Задан неверный параметр ID");

    return user;
  };

  getCurrentUserInfo = async (accessToken) => {
    const userData = tokenService.verifyAccessToken(accessToken);

    if (!userData) throw ApiError.unauthorized();

    const user = await User.findOne({
      where: {
        id: userData.id,
      },
    });

    if (!user) throw ApiError.unauthorized();

    return user;
  };

  update = async (id, body) => {
    const user = await User.findOne({
      where: {
        id,
      },
    });

    if (!user) throw ApiError.badRequest("Задан неверный параметр ID");

    return User.update(body, { where: { id } });
  };
}

module.exports = new UserService();
