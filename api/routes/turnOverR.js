const express = require('express');
const router = express.Router();
const turnOverGetC = require('../controllers/turnOver/turnOverGetC');

router.post(
  '/getAllByDate',
  (req, res, next) => {
    next();
  },
  turnOverGetC.getAllTurnOverByDate
);

module.exports = router;
