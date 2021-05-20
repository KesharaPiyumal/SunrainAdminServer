const express = require('express');
const router = express.Router();
const inventoryGetAllC = require('../controllers/inventory/inventoryGetAllC');
const stockAddC = require('../controllers/inventory/stockAddC');

router.get(
  '/getAll',
  (req, res, next) => {
    next();
  },
  inventoryGetAllC.getAllInventory
);

router.post(
  '/materialStockAdd',
  (req, res, next) => {
    next();
  },
  stockAddC.addMaterialStock
);

router.post(
  '/productStockAdd',
  (req, res, next) => {
    next();
  },
  stockAddC.addProductStock
);

module.exports = router;
