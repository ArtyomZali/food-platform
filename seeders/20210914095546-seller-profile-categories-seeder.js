"use strict";

const categories = require("../data/categories.json");

module.exports = {
  up: async (queryInterface) => {



    const existedCategories = (
      await queryInterface.sequelize.query("select * from \"sellerProfileCategories\";")
    )[0];

    if (!existedCategories.length) {
      for (let index = 0; index < categories.length; index++) {
        await queryInterface.bulkInsert(
          "sellerProfileCategories",
          [{
            name: categories[index].name,
            id: categories[index].id,
            createdAt: new Date(),
            updatedAt: new Date()
          }]
        );
        const subCategories = categories[index].shopItemCategories.map((subCategory, subIndex) => {
          return {
            id: index * 10 + subIndex + 1,
            name: subCategory.name,
            sellerProfileCategoryId: categories[index].id,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        });
        queryInterface.bulkInsert(
          "shopItemCategories",
          subCategories
        );
      }
    }
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("sellerProfileCategories", null, {});
    await queryInterface.bulkDelete("shopItemCategories", null, {});
  },
};
