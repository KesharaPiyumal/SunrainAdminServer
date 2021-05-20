const User = require('../../models/user');
const StatusCodes = require('../../../common/statusCodes');
const bCrypt = require('bcryptjs');
const Otp = require('../../../common/otp');
const jwt = require('jsonwebtoken');
const JWT_KEY = require('../../jwtKey');
const fs = require('fs');

exports.login = (req, res, next) => {
    User.findAll({
        where: {email: req.body.email}
    })
        .then(userItem => {
            if (userItem.length < 1) {
                return res.status(200).json({
                    statusCode: StatusCodes.NotFound,
                    message: 'Login Failed! Email Does Not Exist!',
                    data: null
                });
            } else {
                if (+userItem[0].isActive === 1) {
                    if (userItem[0].otp === Otp.None) {
                        bCrypt.compare(req.body.password, userItem[0].password, (err, result) => {
                            if (err) {
                                return res.status(200).json({
                                    statusCode: StatusCodes.NotFound,
                                    message: 'Login Failed! Password Does Not Match!',
                                    data: null
                                });
                            }
                            if (result) {
                                const token = jwt.sign(
                                    {
                                        email: userItem[0].email,
                                        userId: userItem[0].id,
                                        displayName: userItem[0].firstName + ' ' + userItem[0].lastName
                                    },
                                    JWT_KEY,
                                    {
                                        expiresIn: '7d'
                                    }
                                );
                              const picUrl = userItem[0].picUrl ? userItem[0].picUrl: 'no-image.png' ;
                              const mimeType = userItem[0].mimeType;
                              let imageData;
                              fs.readFile(`./assets/profile-images/${picUrl}`, function (err, data) {
                                if (err) throw err; // Fail if the file can't be read.
                                imageData = `data:image/${mimeType};base64,` + Buffer.from(data).toString('base64');
                                return res.status(200).json({
                                  statusCode: StatusCodes.Success,
                                  message: 'Login Successful',
                                  data: {token: token, image: imageData}
                                });
                              });
                            } else {
                                return res.status(200).json({
                                    statusCode: StatusCodes.NotFound,
                                    message: 'Login Failed! Password Does Not Match!',
                                    data: null
                                });
                            }
                        });
                    }
                    // } else if (userItem[0].otp === Otp.Email) {
                    //     const otpCode = Math.floor(100000 + Math.random() * 900000);
                    //     db.transaction(async (t) => {
                    //         await GlobalUser.update({
                    //             otpCode: otpCode
                    //         }, {
                    //             where: {id: user[0].id},
                    //             transaction: t
                    //         });
                    //         await Audit.create({
                    //             userId: user[0].id,
                    //             description: 'User [' + user[0].id + ' - ' + req.body.email + '] OTP code send via email'
                    //         }, {transaction: t});
                    //         const ingeniiClient = await IngeniiClient.findAll(
                    //             {
                    //                 where: {id: req.body.clientId}
                    //             });
                    //         const html = `Hi there,
                    //           <br/><br/>
                    //           Please use the following OTP code to login:
                    //           <br/>
                    //           OTP: <b>${otpCode}</b>
                    //           <br/>
                    //           Have a pleasant day.`;
                    //         await mailer.sendEmail(ingeniiClient[0].getDataValue('email'), req.body.email, 'OTP for login!', html, []).then(() => {
                    //             res.status(200).json({
                    //                 statusCode: StatusCodes.Success,
                    //                 message: 'Check your mail for OTP Code',
                    //                 data: null
                    //             });
                    //         }).catch(e => {
                    //             log.error(e);
                    //             res.status(200).json({
                    //                 data: null,
                    //                 message: 'Email Send Error',
                    //                 statusCode: StatusCodes.DBError
                    //             });
                    //         });
                    //     }).then().catch(e => {
                    //         log.error(e);
                    //         res.status(200).json({
                    //             data: null,
                    //             message: 'User OTP Code Error',
                    //             statusCode: StatusCodes.DBError
                    //         })
                    //     })
                    // } else if (user[0].otp === Otp.SMS) {
                    //
                    // }
                } else {
                    return res.status(200).json({
                        statusCode: StatusCodes.ValidationError,
                        message: 'User is not activated.. Verify Email!',
                        data: null
                    });
                }
            }
        })
        .catch(err => {
            res.status(200).json({
                statusCode: StatusCodes.DBError,
                message: 'Login Failed',
                data: null
            });
        });
};
