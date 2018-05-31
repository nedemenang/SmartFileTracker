'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var FileMovement = sequelize.define('FileMovement', {
    DateMoved: {
      type: DataTypes.DATE,
      allowNull: false
    },
    movedFromDepartment: {
      type: DataTypes.STRING,
      allowNull: false
    },
    movedToDepartment: {
      type: DataTypes.STRING,
      allowNull: false
    },
    movedBy: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  FileMovement.associate = function (models) {
    // associations can be defined here
    FileMovement.belongsTo(models.Folder, {
      foreignKey: 'folderId'
    });
  };
  return FileMovement;
};