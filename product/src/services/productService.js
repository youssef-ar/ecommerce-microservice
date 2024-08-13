const product = require('../models/product');

const productService={

    async getProducts(query){
        //filtering
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
        //pagination
        const page = Number(query.page || 1);
        const limit = Number(query.limit || 15);
        const totalProducts = await product.countDocuments(params);
        const totalPages =  Math.ceil(totalProducts / limit);
        if((page>totalPages) || (page<totalPages)){
            return({success:false, message:"Out-of-Range Page Request",pagination:{
                total_records:totalProducts,
                total_pages:totalPages
            }});
        }
        const startIndex = (page-1)*limit;
        const pagination= {
            total_records:totalProducts,
            current_page:page,
            total_pages:totalPages,
            next_page:page+1<=totalPages?page+1:null,
            prev_page:page-1>=1?page-1:null
        };
        const products = await product.find(params).sort(sortOptions).skip(startIndex).limit(limit);
        return({success:true, data:{products}, pagination});
    },
    async getProduct(id){
        //if changed change cart model
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
    },
    async getCategories(){
        const categories = await product.distinct('category');
        return {success:true, data:{categories}};
    }
}

module.exports = productService;