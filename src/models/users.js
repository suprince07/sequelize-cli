'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate({ Todo }) {
      this.hasMany(Todo, {
        foreignKey: "userId",
        as: 'todos'
      })
    }
    toJSON() {
      return { ...this.get(), password: undefined, createdAt: undefined, updatedAt: undefined };
    }
  };
  users.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    admin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  });
  return users;
};