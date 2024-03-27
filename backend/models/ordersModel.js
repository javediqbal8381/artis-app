const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: {
        type: Number,
        required: true,
        unique: true
    },
    products: {
        type: Array,
        required: true
    },
    shopId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop'
    },
    totalPrice: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
