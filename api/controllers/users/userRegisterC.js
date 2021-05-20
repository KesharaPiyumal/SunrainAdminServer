const User = require('../../models/user');
const StatusCodes = require('../../../common/statusCodes');
const db = require('../../../config/database');
const bCrypt = require('bcryptjs');
const randomString = require('randomstring');
const elasticMailer = require('../../../misc/mailer');

exports.register = (req, res) => {
  try {
    let user;
    User.findAll({
      where: { email: req.body.email }
    })
      .then(userItem => {
        if (userItem.length > 0) {
          return res.status(200).json({
            data: null,
            message: 'Email already exists!',
            statusCode: StatusCodes.ValidationError
          });
        } else {
          bCrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(200).json({
                data: null,
                message: 'User Create Server Error!',
                statusCode: StatusCodes.ServerError
              });
            } else {
              const secretToken = randomString.generate();
              db.transaction(async t => {
                user = await User.create(
                  {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    phoneNumber: req.body.phoneNumber,
                    address: req.body.address,
                    zip: req.body.zip,
                    email: req.body.email,
                    password: hash,
                    isActive: 0,
                    secretToken: secretToken
                  },
                  { transaction: t }
                );
                // const attachment = [
                //     {
                //         data: './assets/images/yoursketch-logo2.png',
                //         filename: 'image.png',
                //         cid: 'regImage'
                //     },
                //     // {
                //     //     filename: 'image.png',
                //     //     path: './assets/images/logo/yoursketch-logo2.png',
                //     //     cid: 'regImage' //same cid value as in the html img src
                //     // }
                //     ];
                let redirectUrl = 'http://localhost:4227';
                const html = `Hi there,
                              <br/>
                              Thank you for registering!
                              <br/><br/>
                              Please verify your email by typing the following token:
                              <br/>
                              Token: <b>${secretToken}</b>
                              <br/>
                              On the following page:
                              <br/>
                              <b>${redirectUrl}/auth/verify<a href=${redirectUrl}/auth/verify></a></b>
                              <br/>
                              Have a pleasant day!`;
                const msg = {
                  from: 'kesharapiyumal2016@gmail.com',
                  from_name: 'YourSketch',
                  to: req.body.email,
                  subject: 'Welcome to YourSketch!',
                  body_html: html
                  // attachment: attachment
                };
                await elasticMailer.mailer.send(msg, function(err, result) {
                  if (err) {
                    return console.error(err);
                  }
                  console.log(result);
                });
              })
                .then(() => {
                  res.status(200).json({
                    data: null,
                    message: 'User: ' + req.body.firstName + ' ' + req.body.lastName + ' Created.. Check your email !',
                    statusCode: StatusCodes.Success
                  });
                })
                .catch(e => {
                  res.status(200).json({
                    data: null,
                    message: 'User Create DB Error!',
                    statusCode: StatusCodes.DBError
                  });
                });
            }
          });
        }
      })
      .catch(error => {
        res.status(200).json({
          data: null,
          message: 'User Register Server Error!',
          statusCode: StatusCodes.ServerError
        });
      });
  } catch (error) {
    res.status(200).json({
      data: null,
      message: 'User Register Server Error!',
      statusCode: StatusCodes.ServerError
    });
  }
};
