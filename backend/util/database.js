const Sequelize = require("sequelize");

const sequelize = new Sequelize("deliverymanagement", "root", "1234567890", {
  dialect: "mysql",
  host: "172.27.48.1",
  logging: false,
});

module.exports = sequelize;
