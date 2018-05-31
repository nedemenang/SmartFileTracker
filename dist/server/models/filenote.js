'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var FileNote = sequelize.define('FileNote', {
    DateCreated: {
      type: DataTypes.DATE,
      allowNull: false
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: false
    },
    notesBy: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  FileNote.associate = function (models) {
    // associations can be defined here
    FileNote.belongsTo(models.Folder, {
      foreignKey: 'folderId'
    });
  };
  return FileNote;
};