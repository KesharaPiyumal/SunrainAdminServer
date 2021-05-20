const express = require('express');
const router = express.Router();
const getAllCustomerC = require('../controllers/customer/customerGetAllC');
const addCustomerC = require('../controllers/customer/customerAddC');
const updateCustomerC = require('../controllers/customer/customerUpdateC');

router.get(
  '/getAll',
  (req, res, next) => {
    next();
  },
  getAllCustomerC.getAllCustomer
);

router.post(
  '/add',
  (req, res, next) => {
    next();
  },
  addCustomerC.addCustomer
);

router.post(
  '/update',
  (req, res, next) => {
    next();
  },
  updateCustomerC.updateCustomer
);

module.exports = router;
