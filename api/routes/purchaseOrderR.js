const express = require('express');
const router = express.Router();
const getAllPurchaseOrderC = require('../controllers/purchaseOrder/purchaseOrderGetAllC');
const addPurchaseOrderC = require('../controllers/purchaseOrder/purchaseOrderAddC');
const updatePurchaseOrderC = require('../controllers/purchaseOrder/purchaseOrderUpdateC');
const getAllPurchaseOrderByDateC = require('../controllers/purchaseOrder/purchaseOrderGetByDateC');
const purchaseOrderDeleteC = require('../controllers/purchaseOrder/purchaseOrderDeleteC');

router.post(
  '/getAllByDate',
  (req, res, next) => {
    next();
  },
  getAllPurchaseOrderByDateC.getAllPurchaseOrderByDate
);
router.get(
  '/getAll',
  (req, res, next) => {
    next();
  },
  getAllPurchaseOrderC.getAllPurchaseOrder
);

router.post(
  '/add',
  (req, res, next) => {
    next();
  },
  addPurchaseOrderC.addPurchaseOrder
);

router.post(
  '/update',
  (req, res, next) => {
    next();
  },
  updatePurchaseOrderC.updatePurchaseOrder
);

router.post(
  '/delete',
  (req, res, next) => {
    next();
  },
  purchaseOrderDeleteC.deletePurchaseOrder
);

module.exports = router;
