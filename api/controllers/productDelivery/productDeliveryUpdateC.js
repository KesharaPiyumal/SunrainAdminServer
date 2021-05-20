const ProductDelivery = require('../../models/productDelivery');
const StatusCodes = require('../../../common/statusCodes');
const db = require('../../../config/database');

exports.updateProductDelivery = (req, res) => {
  try {
    db.transaction(async t => {
      const productDelivery = await ProductDelivery.findAll({
        where: {
          productType: req.body.productType,
          customerId: req.body.customerId,
          netWeight: req.body.netWeight,
          date: req.body.date,
          rate: req.body.rate
        },
        transaction: t
      });
      if (productDelivery.length) {
        res.status(200).json({
          data: null,
          message: 'Product delivery exists!',
          statusCode: StatusCodes.ServerError
        });
      } else {
        await ProductDelivery.update(
          {
            checkNo: req.body.checkNo,
            productType: req.body.productType,
            customerId: req.body.customerId,
            netWeight: req.body.netWeight,
            date: req.body.date,
            rate: req.body.rate,
            value: req.body['purchaseValue']
          },
          { where: { id: req.body['productDeliveryId'] }, transaction: t }
        );
      }
    })
      .then(() => {
        res.status(200).json({
          data: null,
          message: 'Product delivery created successfully!',
          statusCode: StatusCodes.Success
        });
      })
      .catch(e => {
        console.log(e);
        res.status(200).json({
          data: null,
          message: 'Product delivery create DB error!',
          statusCode: StatusCodes.DBError
        });
      });
  } catch (error) {
    res.status(200).json({
      data: null,
      message: 'Product delivery create server error!',
      statusCode: StatusCodes.ServerError
    });
  }
};
