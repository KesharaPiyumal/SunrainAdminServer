const Sequelize = require('sequelize');
const WorkOrder = require('../models/workOrder');
const db = require('../../config/database');

const WorkOrderMaterial = db.define(
  'workordermaterial',
  {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    workOrderId: {
      type: Sequelize.BIGINT
    },
    materialType: {
      type: Sequelize.INTEGER,
      require: true
    },
    rate: {
      type: Sequelize.DECIMAL,
      AllowNull: false
    },
    netWeight: {
      type: Sequelize.DECIMAL,
      AllowNull: false
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    }
  },
  {
    tableName: 'workordermaterial'
  }
);

WorkOrderMaterial.belongsTo(WorkOrder);
WorkOrder.hasMany(WorkOrderMaterial);

module.exports = WorkOrderMaterial;
