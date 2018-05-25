'use strict';
export default function (sequelize, DataTypes) {
  const Folder = sequelize.define('Folder', {
    FileNo: {
      type: DataTypes.STRING,
    },
    FileHash: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false
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
      type: DataTypes.STRING
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
      foreignKey: 'folderId',
      as: 'FileMovements',
    });
    Folder.hasMany(models.FileNote, {
      foreignKey: 'folderId',
      as: 'FileNotes',
    });
  };
  return Folder;
}