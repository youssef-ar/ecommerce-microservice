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
        const prod = new Product(productInfo);
        await prod.save();

    }
}

module.exports = productService;