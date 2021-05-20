const Sequelize = require('sequelize');
const Supplier = require('../models/supplier');
const WorkOrder = require('../models/workOrder');
const db = require('../../config/database');

const PurchaseOrder = db.define(
  'order',
  {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    workOrderId: {
      type: Sequelize.BIGINT
    },
    ticketNo: {
      type: Sequelize.STRING,
      require: true
    },
    materialType: {
      type: Sequelize.INTEGER,
      require: true
    },
    supplierId: {
      type: Sequelize.INTEGER,
      AllowNull: false
    },
    vehicleNo: {
      type: Sequelize.STRING,
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
    },
  },
  {
    tableName: 'order'
  }
);
PurchaseOrder.belongsTo(Supplier);
Supplier.hasMany(PurchaseOrder);

PurchaseOrder.belongsTo(WorkOrder);
WorkOrder.hasMany(PurchaseOrder);

module.exports = PurchaseOrder;
