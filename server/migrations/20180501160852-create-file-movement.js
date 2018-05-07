'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('FileMovements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      DateMoved: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      movedFromDepartmentId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      movedToDepartmentId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      movedBy: {
        type: Sequelize.INTEGER
      },
      movedTo: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('FileMovements');
  }
};