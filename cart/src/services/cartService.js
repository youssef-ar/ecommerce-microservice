const { checkout } = require('../controllers/cartController');
const cart = require('../models/cart');
const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config/index');


const cartservice = {

    async getCart(req){
        let cartInstance;
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(" ")[1];
            const user = jwt.verify(token, jwtSecret);
            const userId = user.userId;
            cartInstance = await cart.findOne({userId});
        }else{
            cartInstance = await cart.findOne({sessionId:req.sessionID});
        }
        if(!cartInstance){
            return{ success: false, message:'Cart not found'};
        }
        
        
        return {success:true, cart:cartInstance};
    },

    async postCart(req) {
        const authHeader = req.headers.authorization;
        let user;
        if (authHeader) {
            const token = authHeader.split(" ")[1];
            user = jwt.verify(token, jwtSecret);
        }
        const cartData = {sessionId:req.sessionID};
        if (user) {
            cartData.userId= mongoose.Types.ObjectId(user._id);
        }
        const cartInstance = new cart(cartData);
        await cartInstance.save();
        return { success: true, cart: cartInstance };
    },
    async postItem(req) {
        const { productId, quantity } = req.body;
        let cartInstance;
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(" ")[1];
            const user = jwt.verify(token, jwtSecret);
            const userId = user.userId;
            cartInstance = await cart.findOne({userId});
        }else{
            cartInstance = await cart.findOne({sessionId:req.sessionID});
        }
        if(!cartInstance){
            return{ success: false, message:'Cart not found'};
        }
        // Check if the product already exists in the cart
        const existingItem = cartInstance.items.find(item => item.productId.toString() === productId);
        if (existingItem) {
            // Update the quantity if the product already exists
            existingItem.quantity += quantity;
        } else {
            
            // Add new item if the product doesn't exist
            cartInstance.items.push({
                productId,
                quantity
            });
        }
        
        await cartInstance.save();
    
        return { success: true, cart: cartInstance };
    },

    async deleteItem(req){
        const {productId} = req.body;
        let cartInstance;
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(" ")[1];
            const user = jwt.verify(token, jwtSecret);
            const userId = user.userId;
            cartInstance = await cart.findOne({userId});
        }else{
            cartInstance = await cart.findOne({sessionId:req.sessionID});
        }
        if(!cartInstance){
            return{ success: false, message:'Cart not found'};
        }
        const filteredItems = cartInstance.items.filter(item => item.productId.toString() !== productId);
        cartInstance.items=filteredItems;
        await cartInstance.save();
        return {success: true, cart:cartInstance};
    },

    async patchItem(req){
        const {productId, quantity} = req.body;
        let cartInstance;
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(" ")[1];
            const user = jwt.verify(token, jwtSecret);
            const userId = user.userId;
            cartInstance = await cart.findOne({userId});
        }else{
            cartInstance = await cart.findOne({sessionId:req.sessionID});
        }
        if(!cartInstance){
            return{ success: false, message:'Cart not found'};
        }
        const item = cartInstance.items.find(item => item.productId.toString() === productId);
        item.quantity = quantity;

        await cartInstance.save();
        return {success: true, cart:cartInstance};
    },

    async clearCart(req){
        let cartInstance;
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(" ")[1];
            const user = jwt.verify(token, jwtSecret);
            const userId = user.userId;
            cartInstance = await cart.findOne({userId});
        }else{
            cartInstance = await cart.findOne({sessionId:req.sessionID});
        }
        if(!cartInstance){
            return{ success: false, message:'Cart not found'};
        }
        cartInstance.items=[];
        await cartInstance.save();
        return {success: true, cart:cartInstance};
    },
    async checkout(req){
        let cartInstance;
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(" ")[1];
            const user = jwt.verify(token, jwtSecret);
            const userId = user.userId;
            cartInstance = await cart.findOne({userId});
        }else{
            cartInstance = await cart.findOne({sessionId:req.sessionID});
        }
        if(!cartInstance){
            return{ success: false, message:'Cart not found'};
        }
        return (cartInstance.toJSON());
    }
    

}

module.exports = cartservice;