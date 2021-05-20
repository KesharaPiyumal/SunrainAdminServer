const Sequelize = require('sequelize');
const db = require('../../config/database');

const Inventory = db.define(
  'inventory',
  {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    materialType: {
      type: Sequelize.INTEGER
    },
    productType: {
      type: Sequelize.INTEGER
    },
    totalWeight: {
      type: Sequelize.DECIMAL,
      AllowNull: false
    },
    rate: {
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
    tableName: 'inventory'
  }
);

module.exports = Inventory;
