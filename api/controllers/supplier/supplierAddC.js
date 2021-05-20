const Supplier = require('../../models/supplier');
const StatusCodes = require('../../../common/statusCodes');
const db = require('../../../config/database');

exports.addSupplier = (req, res) => {
  try {
    let supplier;
    db.transaction(async t => {
      supplier = await Supplier.create(
        {
          name: req.body.name
        },
        { transaction: t }
      );
    })
      .then(() => {
        res.status(200).json({
          data: null,
          message: 'Supplier created successfully!',
          statusCode: StatusCodes.Success
        });
      })
      .catch(e => {
        console.log(e);
        res.status(200).json({
          data: null,
          message: 'Supplier create DB error!',
          statusCode: StatusCodes.DBError
        });
      });
  } catch (error) {
    res.status(200).json({
      data: null,
      message: 'Supplier create server error!',
      statusCode: StatusCodes.ServerError
    });
  }
};
