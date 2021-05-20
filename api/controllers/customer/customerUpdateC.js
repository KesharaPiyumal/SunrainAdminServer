const Customer = require('../../models/customer');
const StatusCodes = require('../../../common/statusCodes');
const db = require('../../../config/database');

exports.updateCustomer = (req, res) => {
  try {
    Customer.update(
      {
        name: req.body.name
      },
      {
        where: {
          id: req.body.supplierId
        }
      }
    )
      .then(() => {
        res.status(200).json({
          data: null,
          message: 'Customer Edit Successfully',
          statusCode: StatusCodes.Success
        });
      })
      .catch(e => {
        res.status(200).json({
          data: null,
          message: 'Customer Edit DB Error',
          statusCode: StatusCodes.Success
        });
      });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      data: null,
      message: 'Customer Edit server error',
      statusCode: StatusCodes.Success
    });
  }
};
