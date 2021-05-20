const Sequelize = require('sequelize');
const db = require('../../config/database');

const Expense = db.define(
  'expense',
  {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    description: {
      type: Sequelize.STRING
    },
    date: {
      type: Sequelize.DATE
    },
    value: {
      type: Sequelize.DECIMAL
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    }
  },
  {
    tableName: 'expense'
  }
);

module.exports = Expense;
