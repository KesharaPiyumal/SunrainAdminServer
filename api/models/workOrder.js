const Sequelize = require('sequelize');
const db = require('../../config/database');

const WorkOrder = db.define(
  'workorder',
  {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    startDate: {
      type: Sequelize.DATE,
      allowNull: true
    },
    endDate: {
      type: Sequelize.DATE,
      required: false,
      allowNull: true
    },
    description: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.INTEGER,
      AllowNull: false
    },
    allowProductDelivery: {
      type: Sequelize.BOOLEAN,
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
    tableName: 'workorder'
  }
);

module.exports = WorkOrder;
