const Order = require('../models/Order');
const { orderViewModel } = require('./util');

async function getAllOrders() {
    const orders = await Order.find({});
    return orders.map(orderViewModel);
}

async function getByIdOrder(id) {
    const order = await Order.findById(id);
    if (order) {
        return orderViewModel(order);
    } else {
        return undefined;
    }
}

async function createOrder(order) {
    const result=new Order(order);
    await result.save();
}

module.exports={
    getAllOrders,
    getByIdOrder,
    createOrder,
}