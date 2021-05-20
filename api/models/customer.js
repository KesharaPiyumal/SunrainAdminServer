const Sequelize = require('sequelize');
const db = require('../../config/database');

const Customer = db.define(
  'customer',
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
    tableName: 'customer'
  }
);

module.exports = Customer;
