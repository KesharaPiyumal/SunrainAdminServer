const Expense = require('../../models/expense');
const StatusCodes = require('../../../common/statusCodes');
const db = require('../../../config/database');

exports.addExpense = (req, res) => {
  try {
    let expense;
    db.transaction(async t => {
      expense = await Expense.create(
        {
          date: new Date(req.body.date),
          value: req.body.value,
          description: req.body.description
        },
        { transaction: t }
      );
    })
      .then(() => {
        res.status(200).json({
          data: null,
          message: 'Expense created successfully!',
          statusCode: StatusCodes.Success
        });
      })
      .catch(e => {
        console.log(e);
        res.status(200).json({
          data: null,
          message: 'Expense create DB error!',
          statusCode: StatusCodes.DBError
        });
      });
  } catch (error) {
    res.status(200).json({
      data: null,
      message: 'Expense create server error!',
      statusCode: StatusCodes.ServerError
    });
  }
};
