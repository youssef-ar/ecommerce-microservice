const productService = require('../services/productService');


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
    }
}


module.exports = productController;