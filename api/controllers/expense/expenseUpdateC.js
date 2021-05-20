const Expense = require('../../models/expense');
const StatusCodes = require('../../../common/statusCodes');

exports.updateExpense = (req, res) => {
  try {
    Expense.update(
      {
        date: new Date(req.body.date),
        value: req.body.value,
        description: req.body.description
      },
      {
        where: {
          id: req.body['expenseId']
        }
      }
    )
      .then(() => {
        res.status(200).json({
          data: null,
          message: 'Expense Edited Successfully',
          statusCode: StatusCodes.Success
        });
      })
      .catch(e => {
        res.status(200).json({
          data: null,
          message: 'Expense Edit DB Error',
          statusCode: StatusCodes.Success
        });
      });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      data: null,
      message: 'Expense Edit server error',
      statusCode: StatusCodes.Success
    });
  }
};
