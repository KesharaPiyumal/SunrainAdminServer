const WorkOrder = require('../../models/workOrder');
const Inventory = require('../../models/inventory');
const WorkOrderMaterial = require('../../models/workOrderMaterial');
const StatusCodes = require('../../../common/statusCodes');
const db = require('../../../config/database');

exports.workOrderRemainingAdd = (req, res) => {
  try {
    const workOrderId = req.body['workOrderId'];
    const materials = req.body['materials'];
    const products = req.body['products'];
    let inventoryRecord;
    db.transaction(async t => {
      // materials
      for (let i = 0; i < materials.length; i++) {
        const material = materials[i];
        inventoryRecord = await Inventory.findOne(
          {
            where: {
              materialType: material.materialType,
              rate: material.rate
            }
          },
          { transaction: t }
        );
        if (inventoryRecord) {
          await Inventory.update(
            {
              totalWeight: +inventoryRecord.totalWeight - +material.totalWeight + +material['remaining']
            },
            {
              where: { id: inventoryRecord.id },
              transaction: t
            }
          );
          await WorkOrderMaterial.create(
            {
              workOrderId: workOrderId,
              materialType: material.materialType,
              rate: +material.rate,
              netWeight: +material.totalWeight - +material['remaining']
            },
            {
              transaction: t
            }
          );
        }
      }

      // products
      for (let i = 0; i < products.length; i++) {
        const product = products[i];
        await Inventory.create(
          {
            rate: +product.rate,
            productType: +product.productType,
            totalWeight: +product.totalWeight
          },
          {
            transaction: t
          }
        );
      }

      await WorkOrder.update(
        {
          status: 2
        },
        {
          where: {
            id: workOrderId
          },
          transaction: t
        }
      );
    })
      .then(response => {
        res.status(200).json({
          data: null,
          message: 'Remaining added successfully!',
          statusCode: StatusCodes.Success
        });
      })
      .catch(e => {
        console.log(e);
        return res.status(200).json({
          data: null,
          message: 'Remaining create DB error!',
          statusCode: StatusCodes.DBError
        });
      });
  } catch (error) {
    res.status(200).json({
      data: null,
      message: 'Remaining create server error!',
      statusCode: StatusCodes.ServerError
    });
  }
};
