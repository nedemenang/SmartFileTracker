'use strict';
export default function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    FirstName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    LastName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    UserName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    createdBy: {
      allowNull: false,
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.STRING
    }
  }, {});
  User.associate = function (models) {
    // associations can be defined here
    User.belongsTo(models.Department, {
      foreignKey: 'departmentId'
    });
  };
  return User;
}