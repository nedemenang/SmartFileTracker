'use strict';
export default function (sequelize, DataTypes) {
  var Department = sequelize.define('Department', {
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
  });
  return Department;
}