const PurchaseOrder = require('../../models/purchaseOrder');
// const WorkOrder = require('../../models/workOrder');
// const Inventory = require('../../models/inventory');
const StatusCodes = require('../../../common/statusCodes');
const db = require('../../../config/database');

exports.deletePurchaseOrder = (req, res) => {
  try {
    let workOrderId;
    db.transaction(async t => {
      await PurchaseOrder.destroy({
        where: { id: req.body.id },
        transaction: t
      });
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
          message: 'Purchase order deleted successfully!',
          statusCode: StatusCodes.Success
        });
      })
      .catch(e => {
        console.log(e);
        res.status(200).json({
          data: null,
          message: 'Purchase order delete DB error!',
          statusCode: StatusCodes.DBError
        });
      });
  } catch (error) {
    res.status(200).json({
      data: null,
      message: 'Purchase order delete server error!',
      statusCode: StatusCodes.ServerError
    });
  }
};
