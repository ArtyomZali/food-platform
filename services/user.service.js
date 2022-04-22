const User = require("../models/user");
const tokenService = require("./token.service");
const ApiError = require("../error/ApiError");
const { Address } = require("../models");

class UserService {

  getById = async (id) => {
    const user = await User.findOne({
      where: {
        id,
      },
      attributes: { exclude: ['password'] },
    });

    if (!user) throw ApiError.badRequest("Задан неверный параметр ID");

    return user;
  };

  getCurrentUserInfo = async (userId) => {
    const user = await User.findOne({
      where: {
        id: userId,
      },
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Address
        },
      ]
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

  updateAddress = async (id, body) => {
    const user = await User.findOne({
      where: {
        id,
      },
    });
    if (!user) throw ApiError.badRequest("Задан неверный параметр ID");
    if (body.x && body.y) {
      if (user.addressId) {
        return await Address.update(body, { where: { id: user.addressId } });
      } else {
        return await user.createAddress(body);
      }
    } else {
      console.log(1);
      return user.setAddress(null);
    }
  };
}

module.exports = new UserService();
