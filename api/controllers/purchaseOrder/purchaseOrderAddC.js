const PurchaseOrder = require('../../models/purchaseOrder');
// const WorkOrder = require('../../models/workOrder');
// const Inventory = require('../../models/inventory');
const StatusCodes = require('../../../common/statusCodes');
const db = require('../../../config/database');

exports.addPurchaseOrder = (req, res) => {
  try {
    let workOrderId;
    db.transaction(async t => {
      // const workOrder = await WorkOrder.findOne(
      //   {
      //     where: {
      //       status: 0
      //     }
      //   },
      //   { transaction: t }
      // );
      // if (workOrder) {
      //   workOrderId = workOrder['id'];
      // } else {
      //   const newWorkOrder = await WorkOrder.create(
      //     {
      //       startDate: null,
      //       endDate: null,
      //       description: 'Work Order Initiated',
      //       status: 0
      //     },
      //     { transaction: t }
      //   );
      //   workOrderId = newWorkOrder.getDataValue('id');
      // }
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
        await PurchaseOrder.create(
          {
            ticketNo: req.body.ticketNo,
            materialType: req.body.materialType,
            // workOrderId: workOrderId,
            supplierId: req.body.supplierId,
            vehicleNo: req.body.vehicleNo,
            netWeight: req.body.netWeight,
            date: req.body.date,
            rate: req.body.rate,
            value: req.body['purchaseValue'],
            isAvailable: 1
          },
          { transaction: t }
        );
      }
    })
      .then(() => {
        // let inventoryRecord;
        // db.transaction(async t => {
        //   inventoryRecord = await Inventory.findOne(
        //     {
        //       where: {
        //         materialType: req.body.materialType,
        //         rate: req.body.rate
        //       }
        //     },
        //     { transaction: t }
        //   );
        //   if (inventoryRecord) {
        //     await Inventory.update(
        //       {
        //         totalWeight: +inventoryRecord.totalWeight + +req.body.netWeight
        //       },
        //       {
        //         where: { id: inventoryRecord.id },
        //         transaction: t
        //       }
        //     );
        //   } else {
        //     await Inventory.create(
        //       {
        //         materialType: req.body.materialType,
        //         totalWeight: req.body.netWeight,
        //         rate: req.body.rate
        //       },
        //       { transaction: t }
        //     );
        //   }
        // })
        //   .then(list => {
        //     res.status(200).json({
        //       data: null,
        //       message: 'Purchase order created successfully!',
        //       statusCode: StatusCodes.Success
        //     });
        //   })
        //   .catch(e => {
        //     console.log(e);
        //     return res.status(200).json({
        //       data: null,
        //       message: 'Purchase order create DB error!',
        //       statusCode: StatusCodes.DBError
        //     });
        //   });
        res.status(200).json({
          data: null,
          message: 'Purchase order created successfully!',
          statusCode: StatusCodes.Success
        });
      })
      .catch(e => {
        console.log(e);
        res.status(200).json({
          data: null,
          message: 'Purchase order create DB error!',
          statusCode: StatusCodes.DBError
        });
      });
  } catch (error) {
    res.status(200).json({
      data: null,
      message: 'Purchase order create server error!',
      statusCode: StatusCodes.ServerError
    });
  }
};
