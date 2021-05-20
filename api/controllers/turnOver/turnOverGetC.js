const PurchaseOrder = require('../../models/purchaseOrder');
const ProductDelivery = require('../../models/productDelivery');
const Expense = require('../../models/expense');
const StatusCodes = require('../../../common/statusCodes');
const db = require('../../../config/database');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.getAllTurnOverByDate = (req, res) => {
  try {
    const startDate = new Date(req.body['startDate']);
    const endDate = new Date(req.body['endDate']);
    const turnOver = {
      purchasesValue: null,
      expenses: null,
      deliveriesValue: null
    };
    db.transaction(async t => {
      turnOver.purchasesValue = await getAllPurchaseOrdersTotal(t, startDate, endDate);
      turnOver.deliveriesValue = await getAllProductDeliveriesTotal(t, startDate, endDate);
      turnOver.expenses = await getAllExpensesTotal(t, startDate, endDate);
    })
      .then(() => {
        return res.status(200).json({
          data: turnOver,
          message: 'Get all turn over successfull!',
          statusCode: StatusCodes.Success
        });
      })
      .catch(e => {
        console.log(e);
        return res.status(200).json({
          data: null,
          message: 'Get all turn over DB error!',
          statusCode: StatusCodes.DBError
        });
      });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      data: null,
      message: 'Get all turn over Server error!',
      statusCode: StatusCodes.DBError
    });
  }
};

async function getAllPurchaseOrdersTotal(t, startDate, endDate) {
  const orders = await PurchaseOrder.findAll(
    {
      where: {
        date: { [Op.between]: [startDate, endDate] }
      }
    },
    { transaction: t }
  );
  let total = 0;
  if (orders && orders.length) {
    orders.forEach(item => {
      total = +total + +item['rate'] * +item['netWeight'];
    });
  }
  return total;
}

async function getAllProductDeliveriesTotal(t, startDate, endDate) {
  const productDeliveries = await ProductDelivery.findAll(
    {
      where: {
        date: { [Op.between]: [startDate, endDate] }
      }
    },
    { transaction: t }
  );
  let total = 0;
  if (productDeliveries && productDeliveries.length) {
    productDeliveries.forEach(item => {
      total = +total + +item['rate'] * +item['netWeight'];
    });
  }
  return total;
}

async function getAllExpensesTotal(t, startDate, endDate) {
  const expenses = await Expense.findAll(
    {
      where: {
        date: { [Op.between]: [startDate, endDate] }
      }
    },
    { transaction: t }
  );
  let total = 0;
  if (expenses && expenses.length) {
    expenses.forEach(item => {
      total = +total + +item['value'];
    });
  }
  return total;
}
