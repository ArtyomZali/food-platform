"use strict";

module.exports = {
  up: function (queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addColumn(
      'shopItems',
      'price',
      Sequelize.INTEGER
    );

  },

  down: function (queryInterface, Sequelize) {
    // logic for reverting the changes
    return queryInterface.removeColumn(
      'shopItems',
      'price',
    );
  }
}
