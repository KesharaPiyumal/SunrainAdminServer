const WorkOrder = require('../../models/workOrder');
const StatusCodes = require('../../../common/statusCodes');
const db = require('../../../config/database');

exports.workOrderStatusChange = (req, res) => {
  db.transaction(async t => {
    if (req.body['newStatus'] === 1) {
      await WorkOrder.update(
        {
          status: req.body['newStatus'],
          description: 'Work Order Started',
          startDate: new Date()
        },
        {
          where: {
            id: req.body['id']
          }
        },
        { transaction: t }
      );
    } else if (req.body['newStatus'] === 3) {
      const workOrder = await WorkOrder.findOne(
        {
          where: {
            id: req.body['id'],
            allowProductDelivery: 0
          }
        },
        { transaction: t }
      );
      if (workOrder) {
        return res.status(200).json({
          data: null,
          message: 'Please complete product delivery!',
          statusCode: StatusCodes.ValidationError
        });
      } else {
        await WorkOrder.update(
          {
            status: req.body['newStatus'],
            description: 'Work Order Ended',
            endDate: new Date()
          },
          {
            where: {
              id: req.body['id']
            }
          },
          { transaction: t }
        );
      }
    }
  })
    .then(() => {
      return res.status(200).json({
        data: null,
        message: 'Work order status changed successfully!',
        statusCode: StatusCodes.Success
      });
    })
    .catch(e => {
      console.log(e);
      return res.status(200).json({
        data: null,
        message: 'Get all work orders DB error!',
        statusCode: StatusCodes.DBError
      });
    });
};
