const ProductDelivery = require('../../models/productDelivery');
const Customer = require('../../models/customer');
const StatusCodes = require('../../../common/statusCodes');

exports.getAllProductDeliveries = (req, res) => {
    ProductDelivery.findAll({
        order: [['date', 'DESC']],
        include: { model: Customer }
    })
        .then(list => {
            if (list.length > 0) {
                res.status(200).json({
                    data: list,
                    message: 'Get all product deliveries successfully!',
                    statusCode: StatusCodes.Success
                });
            } else {
                res.status(200).json({
                    data: [],
                    message: 'No Entries Found',
                    statusCode: StatusCodes.Success
                });
            }
        })
        .catch(e => {
            console.log(e);
            return res.status(200).json({
                data: null,
                message: 'Get all product deliveries DB error!',
                statusCode: StatusCodes.DBError
            });
        });
};
