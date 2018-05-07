'use strict';
export default function (sequelize, DataTypes) {
  var FileNote = sequelize.define('FileNote', {
    DateCreated: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Notes: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    NotesBy: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });
  FileNote.associate = function (models) {
    // associations can be defined here
    FileNote.belongsTo(models.Folder, {
      foreignKey: 'fileId'
    });
  };
  return FileNote;
}