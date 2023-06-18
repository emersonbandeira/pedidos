const { Sequelize } = require('sequelize');


console.log('sequelize... indo');

const sequelize = new Sequelize('pedidos','pedidos','pedidos@', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;