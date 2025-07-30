const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/product/:productId', feedbackController.getFeedbacksByProduct);
router.post('/product/:productId', authMiddleware, feedbackController.submitFeedback);

module.exports = router;