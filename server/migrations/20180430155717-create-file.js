'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Files', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      FileNo: {
        type: Sequelize.STRING
      },
      FileHash: {
        type: Sequelize.UUID
      },
      CurrentDepartment: {
        type: Sequelize.STRING
      },
      Createdby: {
        allowNull: false,
        type: Sequelize.STRING
      },
      CreateOn: {
        allowNull: false,
        type: Sequelize.DATE
      },
      FileDescription: {
        type: Sequelize.STRING
      },
      isActive: {
        type: Sequelize.BOOLEAN
      },
      SecurityLevel: {
        type: Sequelize.ENUM,
        values: ['low', 'meduim', 'high']
      },
      FileLink: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Files');
  }
};