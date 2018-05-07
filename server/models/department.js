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
  Department.associate = function (models) {
    // associations can be defined here
    Department.hasMany(models.User, {
      foreignKey: 'departmentId',
      as: 'Users',
    });
  };
  return Department;
}