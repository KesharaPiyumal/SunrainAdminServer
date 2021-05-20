const WorkOrder = require('../../models/workOrder');
const StatusCodes = require('../../../common/statusCodes');

exports.getAllWorkOrders = (req, res) => {
    WorkOrder.findAll({
        order: [['id', 'DESC']]
    })
        .then(list => {
            if (list.length > 0) {
                res.status(200).json({
                    data: list,
                    message: 'Get all work orders successfully!',
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
                message: 'Get all work orders DB error!',
                statusCode: StatusCodes.DBError
            });
        });
};
