const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Orders = sequelize.define("orders", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userId: DataTypes.INTEGER,
  type: DataTypes.STRING,
  weight: DataTypes.INTEGER,
  altPhoneNumber: DataTypes.STRING(13),
  length: DataTypes.INTEGER,
  width: DataTypes.INTEGER,
  height: DataTypes.INTEGER,
  pickUpAddr: DataTypes.STRING,
  pickUpCity: DataTypes.STRING,
  pickUpState: DataTypes.STRING,
  pickUpCountry: DataTypes.STRING,
  pickUpZipCode: DataTypes.STRING(6),
  dropOffAddr: DataTypes.STRING,
  dropOffCity: DataTypes.STRING,
  dropOffState: DataTypes.STRING,
  dropOffCountry: DataTypes.STRING,
  dropOffZipCode: DataTypes.STRING(6),
  amount: DataTypes.INTEGER,
  orderStage: DataTypes.INTEGER,
  imageUrl: DataTypes.STRING,
  isPaid: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
});

module.exports = Orders;
