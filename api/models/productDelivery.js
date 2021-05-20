const Sequelize = require('sequelize');
const Customer = require('../models/customer');
const WorkOrder = require('../models/workOrder');
const db = require('../../config/database');

const ProductDelivery = db.define(
  'productdelivery',
  {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    workOrderId: {
      type: Sequelize.BIGINT
    },
    checkNo: {
      type: Sequelize.STRING,
      require: true
    },
    productType: {
      type: Sequelize.INTEGER,
      require: true
    },
    customerId: {
      type: Sequelize.INTEGER,
      AllowNull: false
    },
    netWeight: {
      type: Sequelize.DECIMAL,
      AllowNull: false
    },
    date: {
      type: Sequelize.DATE,
      AllowNull: false
    },
    rate: {
      type: Sequelize.DECIMAL
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
    tableName: 'productdelivery'
  }
);
ProductDelivery.belongsTo(Customer);
Customer.hasMany(ProductDelivery);

ProductDelivery.belongsTo(WorkOrder);
WorkOrder.hasMany(ProductDelivery);

module.exports = ProductDelivery;
