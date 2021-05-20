const express = require('express');
const router = express.Router();
const getAllWorkOrderC = require('../controllers/workOrder/workOrderGetC');
const workOrderStatusChangeC = require('../controllers/workOrder/workOrderStatusChangeC');
const workOrderRemainingAddC = require('../controllers/workOrder/workOrderRemainingAddC');
const getPurchaseOrdersForWorkOrderC = require('../controllers/workOrder/purchaseOrdersForWorkOrderC');

router.get(
  '/getAll',
  (req, res, next) => {
    next();
  },
  getAllWorkOrderC.getAllWorkOrders
);

router.post(
  '/statusChange',
  (req, res, next) => {
    next();
  },
  workOrderStatusChangeC.workOrderStatusChange
);

router.post(
  '/addRemaining',
  (req, res, next) => {
    next();
  },
  workOrderRemainingAddC.workOrderRemainingAdd
);

router.post(
  '/purchaseOrdersForWoId',
  (req, res, next) => {
    next();
  },
  getPurchaseOrdersForWorkOrderC.PurchaseOrdersForWorkOrder
);

module.exports = router;
