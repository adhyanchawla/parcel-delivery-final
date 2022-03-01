const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Models = sequelize.define("coupons", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  identifier: DataTypes.STRING,
  amount: DataTypes.INTEGER,
  isPercentage: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
});

module.exports = Models;
