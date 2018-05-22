'use strict';
export default function (sequelize, DataTypes) {
  const FileMovement = sequelize.define('FileMovement', {
    DateMoved: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    movedFromDepartment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    movedToDepartment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    movedBy: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
  FileMovement.associate = (models) => {
    // associations can be defined here
    FileMovement.belongsTo(models.Folder, {
      foreignKey: 'folderId'
    });
  };
  return FileMovement;
}