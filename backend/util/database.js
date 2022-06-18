const Sequelize = require("sequelize");

const sequelize = new Sequelize("deliverymanagement", "root", "Adhyan@2000", {
  dialect: "mysql",
  host: "localhost",
  logging: false,
  port: 3306
});

module.exports = sequelize;
