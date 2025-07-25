const express = require('express');
const router = express.Router();
const { placeOrder, getOrders } = require('../controllers/orderController');
const { authenticate } = require('../controllers/authController');

router.post('/', authenticate, placeOrder);
router.get('/', authenticate, getOrders);

module.exports = router;
