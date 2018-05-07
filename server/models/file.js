'use strict';
export default function (sequelize, DataTypes) {
  const Folder = sequelize.define('File', {
    FileNo: {
      type: DataTypes.STRING,
    },
    FileHash: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    Createdby: {
      type: DataTypes.STRING,
      allowNull: false
    },
    CreateOn: {
      type: DataTypes.DATE,
      allowNull: false
    },
    CurrentDepartment: {
      type: DataTypes.INTEGER
    },
    FileDescription: {
      type: DataTypes.STRING
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    SecurityLevel: {
      type: DataTypes.ENUM,
      values: ['low', 'medium', 'high']
    },
    FileLink: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });
  Folder.associate = function (models) {
    // associations can be defined here
    Folder.hasMany(models.FileMovement, {
      foreignKey: 'fileId',
      as: 'fileMovements',
    });
    Folder.hasMany(models.FileNote, {
      foreignKey: 'fileId',
      as: 'fileNotes',
    });
  };
  return Folder;
}