const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../util/database')

const Users = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING(13),
    country: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    zipCode: DataTypes.STRING(6),
    password: DataTypes.STRING,
    isVerified : {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    OTP: {
        type: DataTypes.STRING(6),
        defaultValue: null,
    }
})

module.exports = Users;