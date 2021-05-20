const PurchaseOrder = require('../../models/purchaseOrder');
const StatusCodes = require('../../../common/statusCodes');
const db = require('../../../config/database');

exports.updatePurchaseOrder = (req, res) => {
  try {
    db.transaction(async t => {
      const purchaseOrder = await PurchaseOrder.findAll({
        where: {
          materialType: req.body.materialType,
          supplierId: req.body.supplierId,
          netWeight: req.body.netWeight,
          date: req.body.date,
          rate: req.body.rate
        },
        transaction: t
      });
      if (purchaseOrder.length) {
        res.status(200).json({
          data: null,
          message: 'Purchase order exists!',
          statusCode: StatusCodes.ServerError
        });
      } else {
        PurchaseOrder.update(
          {
            ticketNo: req.body.ticketNo,
            materialType: req.body.materialType,
            supplierId: req.body.supplierId,
            vehicleNo: req.body.vehicleNo,
            netWeight: req.body.netWeight,
            date: req.body.date,
            rate: req.body.rate,
            value: req.body['purchaseValue']
          },
          {
            where: {
              id: req.body['purchaseOrderId']
            }
          }
        );
      }
    })
      .then(() => {
        res.status(200).json({
          data: null,
          message: 'Purchase Order Edited Successfully',
          statusCode: StatusCodes.Success
        });
      })
      .catch(e => {
        res.status(200).json({
          data: null,
          message: 'Purchase Order Edit DB Error',
          statusCode: StatusCodes.Success
        });
      });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      data: null,
      message: 'Purchase Order Edit server error',
      statusCode: StatusCodes.Success
    });
  }
};
