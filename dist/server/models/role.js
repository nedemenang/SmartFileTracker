'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Role = sequelize.define('Role', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    createdBy: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {});
  Role.associate = function (models) {
    // associations can be defined here
  };
  return Role;
};