'use strict';
export default function (sequelize, DataTypes) {
  const FileMovement = sequelize.define('FileMovement', {
    DateMoved: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    movedFromDepartmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    movedToDepartmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    movedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    movedTo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  FileMovement.associate = (models) => {
    // associations can be defined here
    FileMovement.belongsTo(models.Folder, {
      foreignKey: 'fileId',
      onDelete: 'CASCADE',
    });
  };
  return FileMovement;
}