const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  products: [{
    productId: { type: Schema.Types.ObjectId, ref: 'Product' }, 
    name: String,
    price: Number,
    quantity: Number
  }],
  userId: { type: Schema.Types.ObjectId, ref: 'User' }, // rferences userSchema for the user placing the order
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ['cart', 'placed'], // should check if order is placed and show to admin
    //later when i make admin dashboard should be using the 'placed' for view
    default: 'cart'
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
