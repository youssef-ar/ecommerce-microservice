const orderService = require('../services/orderService');

const orderController ={
    async getOrderHistory(req,res){
        try {
            const result = await orderService.getOrderHistory(req);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    async getOrder(req,res){
        try {
            const result = await orderService.getOrder(req);
            if(!(result.success)){
                return res.status(401).json({ message: "Unauthorized" });
            }
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports = orderController;