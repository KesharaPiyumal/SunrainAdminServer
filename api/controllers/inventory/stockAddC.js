const Inventory = require('../../models/inventory');
const StatusCodes = require('../../../common/statusCodes');
const db = require('../../../config/database');

exports.addMaterialStock = (req, res) => {
  try {
    let inventoryRecord;
    db.transaction(async t => {
      inventoryRecord = await Inventory.findOne(
        {
          where: {
            materialType: req.body.materialType,
            rate: req.body.rate
          }
        },
        { transaction: t }
      );
      if (inventoryRecord) {
        await Inventory.update(
          {
            totalWeight: +req.body.totalWeight
          },
          {
            where: { id: inventoryRecord.id },
            transaction: t
          }
        );
      } else {
        await Inventory.create(
          {
            materialType: req.body.materialType,
            totalWeight: +req.body.totalWeight,
            rate: req.body.rate
          },
          { transaction: t }
        );
      }
    })
      .then(response => {
        res.status(200).json({
          data: null,
          message: 'Material stock created successfully!',
          statusCode: StatusCodes.Success
        });
      })
      .catch(e => {
        console.log(e);
        return res.status(200).json({
          data: null,
          message: 'Material stock create DB error!',
          statusCode: StatusCodes.DBError
        });
      });
  } catch (error) {
    res.status(200).json({
      data: null,
      message: 'Material stock create server error!',
      statusCode: StatusCodes.ServerError
    });
  }
};

exports.addProductStock = (req, res) => {
  try {
    let inventoryRecord;
    db.transaction(async t => {
      inventoryRecord = await Inventory.findOne(
        {
          where: {
            productType: req.body.productType,
            rate: req.body.rate
          }
        },
        { transaction: t }
      );
      if (inventoryRecord) {
        await Inventory.update(
          {
            totalWeight: +req.body.totalWeight
          },
          {
            where: { id: inventoryRecord.id },
            transaction: t
          }
        );
      } else {
          console.log(+req.body.totalWeight)
        await Inventory.create(
          {
            productType: req.body.productType,
            totalWeight: +req.body.totalWeight,
            rate: req.body.rate
          },
          { transaction: t }
        );
      }
    })
      .then(response => {
        res.status(200).json({
          data: null,
          message: 'Product stock created successfully!',
          statusCode: StatusCodes.Success
        });
      })
      .catch(e => {
        console.log(e);
        return res.status(200).json({
          data: null,
          message: 'Product stock create DB error!',
          statusCode: StatusCodes.DBError
        });
      });
  } catch (error) {
    res.status(200).json({
      data: null,
      message: 'Product create server error!',
      statusCode: StatusCodes.ServerError
    });
  }
};
