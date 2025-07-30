const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const orderController = require('../controllers/orderController');

router.get('/', authMiddleware, orderController.getMyOrders);
router.post('/', authMiddleware, orderController.createOrder);
router.post('/webhook', express.raw({ type: 'application/json' }), orderController.handleStripeWebhook);

module.exports = router;