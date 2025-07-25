const Order = require('../models/Order');

exports.placeOrder = async (req, res) => {
  try {
    const { items, restaurantId, total } = req.body;
    const order = new Order({
      user: req.user.id,
      items,
      restaurant: restaurantId,
      total
    });
    await order.save();
    res.status(201).json({ message: 'Order placed successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('restaurant');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
