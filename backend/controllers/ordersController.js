// const Order = require('../models/Order');

const {Safepay} = require('@sfpy/node-sdk')

const safepay = new Safepay({
    environment: 'sandbox',
    apiKey: 'sec_41d4ee2c-f14b-4014-8d62-161012b2c034',
    v1Secret: 'f94cd00834086c95cf0a4a6b442e50269f621ad7bcb38526be67e92da798086b',
    webhookSecret: 'foo'
})

exports.payment = async (req, res) => {
    try {
        const { token } = await safepay.payments.create({
            amount: Number(req.query.price),
            currency: 'PKR'
        })
        const url = safepay.checkout.create({
            token,
            orderId: 'T800',
            cancelUrl: `${process.env.FRONT_END_BASE_URL}/payment`,
            redirectUrl: `${process.env.FRONT_END_BASE_URL}/order-completed`,
            source: 'custom',
            webhooks: true
        })
        res.status(200).json(url)
        // redirect user to `url`
    } catch (error) {
console.log(error)
    }
}

// Create a new order
exports.createOrder = async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        console.error('Error fetching all orders:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get orders by user
exports.getOrdersByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId });
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders by user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update an existing order
exports.updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedOrder = await Order.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ message: 'Order updated successfully', order: updatedOrder });
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedOrder = await Order.findByIdAndDelete(id);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
