const cartService = require('../services/cartService');
const messageBroker = require('../../MessageBroker');


const cartController= {
    async postCart(req,res){
        try{
            const result = await cartService.postCart(req);
            return res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({success:false,error});
        }
    },

    async postItem(req,res){
        try{
            const result = await cartService.postItem(req);
            if(result.success===false){
                return res.status(404).json(result);
            }
            return res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({success:false,error});
        }
    },
    async getCart(req,res){
        try{
            const result = await cartService.getCart(req);
            if(result.success===false){
                return res.status(404).json(result);
            }
            return res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({success:false,error});
        }
    },

    async deleteItem(req,res){
        try {
            console.log('controller');
            const result = await cartService.deleteItem(req);
            if(result.success===false){
                return res.status(404).json(result);
            }
            return res.status(200).json(result);
        } catch (error) {
            res.status(500).json({success:false,error});
        }
    },
    async patchItem(req,res){
        try {
            const result = await cartService.patchItem(req);
            if(result.success===false){
                return res.status(404).json(result);
            }
            return res.status(200).json(result);
        } catch (error) {
            res.status(500).json({success:false,error});
        }
    },
    async clearCart(req,res){
        try {
            const result = await cartService.clearCart(req);
            if(result.success===false){
                return res.status(404).json(result);
            }
            return res.status(200).json(result);
        } catch (error) {
            res.status(500).json({success:false,error});
        }
    },

    async checkout(req,res){
        try { 
            const cartInstance = await cartService.checkout(req);
            console.log(cartInstance);
            await messageBroker.publishMessage("orders", cartInstance);
            res.status(200).json({success:true, cartInstance});
        } catch (error) {
            return res.status(500).json({success:false,error});
        }
    }

}


module.exports = cartController;