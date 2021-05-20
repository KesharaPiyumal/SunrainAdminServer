const Sequelize = require('sequelize');
const db = require('../../config/database');

const User = db.define(
    'user',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            // autoIncrement: true
        },
        firstName: {
            type: Sequelize.STRING,
            require: true
        },
        lastName: {
            type: Sequelize.STRING,
            require: true
        },
        email: {
            type: Sequelize.STRING,
            AllowNull: false

        },
        password: {
            type: Sequelize.STRING,
            AllowNull: false,
            validate: {
                min: 6
            }
        },
        phoneNumber: {
            type: Sequelize.STRING,
            AllowNull: false
        },
        address: {
            type: Sequelize.STRING,
            AllowNull: false
        },
        zip: {
            type: Sequelize.INTEGER
        },
        isActive: {
            type: Sequelize.INTEGER
        },
        secretToken: {
            type: Sequelize.STRING
        },
        otp: {
            type: Sequelize.INTEGER
        },
        otpCode: {
            type: Sequelize.INTEGER
        },
        picUrl: {
            type: Sequelize.STRING
        },
        mimeType: {
            type: Sequelize.STRING
        },
        createdAt: {
            type: Sequelize.DATE
        },
        updatedAt: {
            type: Sequelize.DATE
        },
    },
    {
        tableName: 'user'
    }
);

module.exports = User;