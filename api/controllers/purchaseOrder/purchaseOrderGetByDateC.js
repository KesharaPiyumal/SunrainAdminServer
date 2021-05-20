const PurchaseOrder = require('../../models/purchaseOrder');
const Supplier = require('../../models/supplier');
const StatusCodes = require('../../../common/statusCodes');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.getAllPurchaseOrderByDate = (req, res) => {
  const startDate = new Date(req.body['startDate']);
  const endDate = new Date(req.body['endDate']);
  PurchaseOrder.findAll({
    order: [['date', 'DESC']],
    include: { model: Supplier },
    where: {
      date: { [Op.between]: [startDate, endDate] }
    }
  })
    .then(list => {
      if (list.length > 0) {
        res.status(200).json({
          data: list,
          message: 'Get all purchase orders successfully!',
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
        message: 'Get all purchase orders DB error!',
        statusCode: StatusCodes.DBError
      });
    });
};
