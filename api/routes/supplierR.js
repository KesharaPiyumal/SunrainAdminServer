const express = require('express');
const router = express.Router();
const getAllSupplierC = require('../controllers/supplier/supplierGetAllC');
const addSupplierC = require('../controllers/supplier/supplierAddC');
const updateSupplierC = require('../controllers/supplier/supplierUpdateC');

router.get(
  '/getAll',
  (req, res, next) => {
    next();
  },
  getAllSupplierC.getAllSupplier
);

router.post(
  '/add',
  (req, res, next) => {
    next();
  },
  addSupplierC.addSupplier
);

router.post(
  '/update',
  (req, res, next) => {
    next();
  },
  updateSupplierC.updateSupplier
);

module.exports = router;
