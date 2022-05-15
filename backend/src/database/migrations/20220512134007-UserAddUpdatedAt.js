'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('User', 'ssss', {
      type: Sequelize.STRING(50),
      allowNull: false,
      defaultValue: ''
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('User', 'ssss')
  }
};
