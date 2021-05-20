const Sequelize = require('sequelize');
const db = require('../../config/database');

const Supplier = db.define(
    'supplier',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            require: true
        },
        createdAt: {
            type: Sequelize.DATE
        },
        updatedAt: {
            type: Sequelize.DATE
        }
    },
    {
        tableName: 'supplier'
    }
);

module.exports = Supplier;
