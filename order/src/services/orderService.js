const order = require('../models/order');
const messageBroker = require('../../MessageBroker');


const orderservice = {
    async getOrderHistory(req){
        const userId = req.user.userId;
        const orderHistory = await order.find({userId});
        return {success:true, orderHistory:orderHistory};
        
    },

    async getOrder(req){
        const orderId = req.params.id;
        const userId = req.user.userId;
        const orderInstance = await order.findById(orderId);
        if(orderInstance.userId!==userId){
            return {success:false, message:"unautherized"};
        }
        return {success:true, order:orderInstance};
    }
}

module.exports = orderservice;