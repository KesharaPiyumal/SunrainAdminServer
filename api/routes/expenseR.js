const express = require('express');
const router = express.Router();
const expenseGetAllC = require('../controllers/expense/expenseGetAllC');
const expenseAddC = require('../controllers/expense/expenseAddC');
const expenseUpdateC = require('../controllers/expense/expenseUpdateC');
const expenseDeleteC = require('../controllers/expense/expenseDeleteC');

router.get(
  '/getAll',
  (req, res, next) => {
    next();
  },
  expenseGetAllC.getAllExpense
);

router.post(
  '/add',
  (req, res, next) => {
    next();
  },
  expenseAddC.addExpense
);

router.post(
  '/update',
  (req, res, next) => {
    next();
  },
  expenseUpdateC.updateExpense
);

router.post(
  '/delete',
  (req, res, next) => {
    next();
  },
  expenseDeleteC.deleteExpense
);

module.exports = router;
