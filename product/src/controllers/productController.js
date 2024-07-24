const productService = require('../services/productService');
const { validationResult } = require('express-validator');


const productController= {

    async getProducts(req,res){
        try {
            
            const result = await productService.getProducts(req.query);
            if(!result){
                return res.status(404).json({success:true,message:'No products found'})
            }
            return res.status(200).json(result);

        } catch (error) {
            res.status(500).json({success:false,error});
        }
    },
    async getProduct(req,res){
        try {
            const result = await productService.getProduct(req.params.id);
            if(!result){
                return res.status(404).json({success:true,message:'No products found'})
            }
            res.status(200).json(result);

        } catch (error) {
            res.status(500).json({success:false,error});
        }
    },

    async postProduct(req,res){
        try {
            
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(422).json({errors: errors.array()});
            }
            const result = await productService.postProduct(req.body);
            return res.status(200).json(result);

        } catch (error) {
            res.status(500).json({success:false,error});
        }
    },

    async patchProduct(req,res){
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(422).json({errors: errors.array()});
            }
            const result = await productService.patchProduct(req.params.id,req.query);
            if(!result.success){
                return res.status(404).json(result);
            }
            return res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({success:false,error});
        }
    },
    async deleteProduct(req,res){
        try{
            const result = await productService.deleteProduct(req.params.id);
            if(!result.success){
                return res.status(404).json(result);
            }
            return res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({success:false,error});
        }
    }
}


module.exports = productController;