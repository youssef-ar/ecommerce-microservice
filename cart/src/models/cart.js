const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const axios = require('axios');
const CartItemSchema = new Schema({
  productId:{
    type:String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity can\'t be less than 1'],
    default: 1
  }
});

const CartSchema = new Schema({
  sessionId:{
    type: String,
    required:true
  },
  userId:{
    type: String,
    required: false
  },
  items: {
    type: [CartItemSchema],
    default: []
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.00
  }
},{ collection : 'carts',
  strict: false
});

CartSchema.pre('save', async function(next) {
  const cart = this;

  if (cart.isModified('items')) {
    cart.totalPrice = 0;
    try {
      for (const item of cart.items) {
        const response = await axios.get(`http://localhost:8000/products/${item.productId}`);
        const product = response.data.data.products;
        if (product && product.price) {
          cart.totalPrice += item.quantity * product.price;
        } else {
          return next(new Error(`Product with ID ${item.productId} does not have a valid price`));
        }
      }
    } catch (error) {
      return next(new Error('Failed to fetch product details: ' + error.message));
    }
  }

  next();
});
const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
