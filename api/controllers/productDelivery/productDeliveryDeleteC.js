// const Inventory = require('../../models/inventory');
// const WorkOrder = require('../../models/workOrder');
const ProductDelivery = require('../../models/productDelivery');
const StatusCodes = require('../../../common/statusCodes');
const db = require('../../../config/database');

exports.deleteProductDelivery = (req, res) => {
  try {
    db.transaction(async t => {
      await ProductDelivery.destroy({
        where: { id: req.body.id },
        transaction: t
      });
    })
      .then(() => {
        res.status(200).json({
          data: null,
          message: 'Product delivery deleted successfully!',
          statusCode: StatusCodes.Success
        });
      })
      .catch(e => {
        console.log(e);
        res.status(200).json({
          data: null,
          message: 'Product delivery delete DB error!',
          statusCode: StatusCodes.DBError
        });
      });
  } catch (error) {
    res.status(200).json({
      data: null,
      message: 'Product delivery delete server error!',
      statusCode: StatusCodes.ServerError
    });
  }
};

// exports.addProductDelivery = (req, res) => {
//   try {
//     let productDelivery;
//     db.transaction(async t => {
//       const workOrder = await WorkOrder.findOne({ where: { status: 2 }, transaction: t });
//       if (workOrder) {
//         await workOrder.update(
//           {
//             allowProductDelivery: 1
//           },
//           { transaction: t }
//         );
//         productDelivery = await ProductDelivery.create(
//           {
//             checkNo: req.body.checkNo,
//             productType: req.body.productType,
//             customerId: req.body.customerId,
//             netWeight: req.body.netWeight,
//             date: req.body.date,
//             rate: req.body.rate,
//             value: req.body['purchaseValue'],
//             workOrderId: workOrder['id']
//           },
//           { transaction: t }
//         );
//       } else {
//         res.status(200).json({
//           data: null,
//           message: 'Work order does not exist!',
//           statusCode: StatusCodes.ValidationError
//         });
//       }
//     })
//       .then(() => {
//         let inventoryRecord;
//         db.transaction(async t => {
//           inventoryRecord = await Inventory.findOne(
//             {
//               where: {
//                 productType: req.body.productType,
//                 rate: req.body.rate
//               }
//             },
//             { transaction: t }
//           );
//           if (inventoryRecord) {
//             await Inventory.update(
//               {
//                 totalWeight: +inventoryRecord.totalWeight - +req.body.netWeight
//               },
//               {
//                 where: { id: inventoryRecord.id },
//                 transaction: t
//               }
//             );
//           } else {
//             // await Inventory.create(
//             //   {
//             //     materialType: req.body.materialType,
//             //     totalWeight: req.body.netWeight,
//             //     rate: req.body.rate
//             //   },
//             //   { transaction: t }
//             // );
//           }
//         })
//           .then(list => {
//             res.status(200).json({
//               data: null,
//               message: 'Product delivery created successfully!',
//               statusCode: StatusCodes.Success
//             });
//           })
//           .catch(e => {
//             console.log(e);
//             return res.status(200).json({
//               data: null,
//               message: 'Product delivery create DB error!',
//               statusCode: StatusCodes.DBError
//             });
//           });
//       })
//       .catch(e => {
//         console.log(e);
//         res.status(200).json({
//           data: null,
//           message: 'Product delivery create DB error!',
//           statusCode: StatusCodes.DBError
//         });
//       });
//   } catch (error) {
//     res.status(200).json({
//       data: null,
//       message: 'Product delivery create server error!',
//       statusCode: StatusCodes.ServerError
//     });
//   }
// };
