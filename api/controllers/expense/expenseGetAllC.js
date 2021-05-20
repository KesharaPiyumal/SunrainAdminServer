const Expense = require('../../models/expense');
const StatusCodes = require('../../../common/statusCodes');

exports.getAllExpense = (req, res) => {
  Expense.findAll({
    order: [['id', 'DESC']]
  })
    .then(list => {
      if (list.length > 0) {
        res.status(200).json({
          data: list,
          message: 'Get all expenses successfully!',
          statusCode: StatusCodes.Success
        });
      } else {
        res.status(200).json({
          data: [],
          message: 'No Entries Found',
          statusCode: StatusCodes.Success
        });
      }
    })
    .catch(e => {
      console.log(e);
      return res.status(200).json({
        data: null,
        message: 'Get all expenses DB error!',
        statusCode: StatusCodes.DBError
      });
    });
};
