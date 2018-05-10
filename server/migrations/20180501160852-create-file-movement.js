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
        type: Sequelize.STRING
      },
      folderId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Folders',
          key: 'id',
          as: 'folderId',
        },
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('FileMovements');
  }
};