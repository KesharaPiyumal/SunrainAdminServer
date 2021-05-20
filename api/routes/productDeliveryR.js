const express = require('express');
const router = express.Router();
const getAllProductDeliveryC = require('../controllers/productDelivery/productDeliveryGetAllC');
const getAllProductDeliveryByDateC = require('../controllers/productDelivery/productDeliveryGetByDate');
const addProductDeliveryC = require('../controllers/productDelivery/productDeliveryAddC');
const updateProductDeliveryC = require('../controllers/productDelivery/productDeliveryUpdateC');
const productDeliveryDeleteC = require('../controllers/productDelivery/productDeliveryDeleteC');

router.get(
  '/getAll',
  (req, res, next) => {
    next();
  },
  getAllProductDeliveryC.getAllProductDeliveries
);

router.post(
  '/getAllByDate',
  (req, res, next) => {
    next();
  },
  getAllProductDeliveryByDateC.getAllProductDeliveryByDate
);

router.post(
  '/add',
  (req, res, next) => {
    next();
  },
  addProductDeliveryC.addProductDelivery
);

router.post(
  '/update',
  (req, res, next) => {
    next();
  },
  updateProductDeliveryC.updateProductDelivery
);

router.post(
  '/delete',
  (req, res, next) => {
    next();
  },
  productDeliveryDeleteC.deleteProductDelivery
);

module.exports = router;
