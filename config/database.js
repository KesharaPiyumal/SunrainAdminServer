const Sequelize = require('sequelize');

module.exports = new Sequelize('sunrainadmindb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 1
    }
});






