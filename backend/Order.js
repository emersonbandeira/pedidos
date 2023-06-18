const { DataTypes } = require('sequelize');
const sequelize = require('./db');


const Order = sequelize.define('Order', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    uuid: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


Order.sync();

module.exports = Order;