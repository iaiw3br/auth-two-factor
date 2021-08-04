'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      secretKey: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user');
  }
};
