const ApiError = require('../error/ApiError');
const { Review } = require('../models');

class ReviewService {

  async create(userId, reviewData) {
    const otherReview = await Review.findOne({ where: { authorId: userId } });
    if (otherReview) throw ApiError.conflict("Невозможно создать более одного отзыва на товар");

    return await Review.create(reviewData);
  }

  async delete(userId, id) {
    const review = await Review.findOne({ where: { authorId: userId } });
    if (review.authorId !== userId) throw ApiError.forbidden("Невозможно удалить отзыв, не созданный данным пользователем");

    const isDeleted = await Review.destroy({
      where: {
        id: id,
      },
    });

    if (!isDeleted) {
      throw ApiError.badRequest('Задан неверный параметр ID');
    }
  }

  async getByShopItemId(id) {
    return await Review.findAll({ where: { shopItemId: id } });
  }
}

module.exports = new ReviewService();
