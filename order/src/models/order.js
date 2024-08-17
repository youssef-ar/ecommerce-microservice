const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderItemSchema = new Schema({
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

const OrderSchema = new Schema({
  userId:{
    type: String,
    required: false
  },
  items: {
    type: [orderItemSchema],
    default: []
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.00
  },
  paymentMethod: {
    type: String,
    enum: ['Credit Card', 'PayPal', 'Bank Transfer', 'Cash on Delivery'],
    required: false
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
    default: 'Pending'
  },
  orderStatus: {
    type: String,
    enum: ['Processing', 'Completed', 'Canceled', 'Returned'],
    default: 'Processing'
  },
  orderDate: {
    type: Date,
    default: Date.now
  }
},{ collection : 'orders',
  strict: false
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
