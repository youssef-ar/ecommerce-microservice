const product = require('../models/product');

const productService={

    async getProducts(query){
        const {category, minPrice , maxPrice, sort} = query;
        const params = {}
        if(category) params.category = category;
        if (minPrice) params.price = { ...params.price, $gte: Number(minPrice) };
        if (maxPrice) params.price = { ...params.price, $lte: Number(maxPrice) };
        let sortOptions = {};
        if (sort) {
            const [field, order] = sort.split(':');
            if (field && (order === 'asc' || order === 'desc')) {
                sortOptions[field] = order === 'asc' ? 1 : -1;
            }
        }
        const products = await product.find(params).sort(sortOptions);
        return({success:true, data:{products}});
    },
    async getProduct(id){
        const products = await product.findById(id);
        return({success:true, data:{products}});
    },
    async postProduct(productInfo){

        const prod = new product(productInfo);
        
        await prod.save();
        return {success:true, message:'Product added successfully'};

    },

    async patchProduct(id,update){
        const newProduct = await product.findByIdAndUpdate(id,update,{new:true});
        if(!newProduct){
            return {success:false, message:'Product not found'};
        }
        return {success:true, data:{product:newProduct}};

    },

    async deleteProduct(id){
        const deletedProduct = await product.findByIdAndDelete(id);
        if(!deletedProduct){
            return {success:false, message:'Product not found'};
        }
        return {success:true, message:'Product deleted successfully'};
    }
}

module.exports = productService;