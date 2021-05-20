const Supplier = require('../../models/supplier');
const StatusCodes = require('../../../common/statusCodes');
const db = require('../../../config/database');

exports.updateSupplier = (req, res) => {
  try {
      Supplier.update(
          {
              name: req.body.name,
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
                  message: 'Group Edit Successfully',
                  statusCode: StatusCodes.Success
              });
          })
          .catch(e => {
              res.status(200).json({
                  data: null,
                  message: 'Group Edit DB Error',
                  statusCode: StatusCodes.Success
              });
          });
  } catch (error) {
      console.log(error)
    res.status(200).json({
      data: null,
      message: 'Group Edit server error',
      statusCode: StatusCodes.Success
    });
  }
};
