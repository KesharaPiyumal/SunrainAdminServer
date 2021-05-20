const Customer = require('../../models/customer');
const StatusCodes = require('../../../common/statusCodes');
const db = require('../../../config/database');

exports.addCustomer = (req, res) => {
  try {
    let customer;
    db.transaction(async t => {
      customer = await Customer.create(
        {
          name: req.body.name
        },
        { transaction: t }
      );
    })
      .then(() => {
        res.status(200).json({
          data: null,
          message: 'Customer created successfully!',
          statusCode: StatusCodes.Success
        });
      })
      .catch(e => {
        console.log(e);
        res.status(200).json({
          data: null,
          message: 'Customer create DB error!',
          statusCode: StatusCodes.DBError
        });
      });
  } catch (error) {
    res.status(200).json({
      data: null,
      message: 'Customer create server error!',
      statusCode: StatusCodes.ServerError
    });
  }
};
