const express = require('express');
const router = express.Router();
const StatusCodes = require('../../common/statusCodes');
const getAllUsersC = require('../controllers/users/userGetAllC');
const userRegisterC = require('../controllers/users/userRegisterC');
const userLoginC = require('../controllers/users/userLoginC');
const userVerifyC = require('../controllers/users/userVerifyC');
const uploadProfileImageC = require('../controllers/users/uploadProfileImageC');
const getProfileImageC = require('../controllers/users/getProfileImageC');
const upload = require('../../api/helpers/imageUploader');
// const checkToken = require('../../auth/checkToken');



router.post(
  '/uploadProfileImage',
    upload.single('file'),
  (req, res, next) => {
    const file = req.file;
    if (!file) {
      return res.status(200).json({
        data: null,
        message: 'Image Not Uploaded!',
        statusCode: StatusCodes.ServerError
      });
    } else {
      next();
    }
  },
  uploadProfileImageC.uploadImage
);

router.get(
  '/getProfileImage',
  (req, res, next) => {
    next();
  },
  getProfileImageC.getImage
);

router.post(
  '/register',
  (req, res, next) => {
    next();
  },
  userRegisterC.register
);

router.get(
  '/',
  (req, res, next) => {
    next();
  },
  getAllUsersC.getAllUsers
);

router.post(
  '/login',
  (req, res, next) => {
    next();
  },
  userLoginC.login
);

router.post(
  '/verify',
  (req, res, next) => {
    next();
  },
  userVerifyC.verifyUser
);

module.exports = router;
