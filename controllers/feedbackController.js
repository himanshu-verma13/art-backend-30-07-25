const Feedback = require('../models/feedback');
const Product = require('../models/product');
const User = require('../models/user');

exports.getFeedbacksByProduct = async (req, res) => {
  try {
    const feedbacks = await Feedback.findAll({
      where: { productId: req.params.productId },
      include: [{ model: User, attributes: ['id', 'username'] }],
      order: [['createdAt', 'DESC']],
    });
    res.json(feedbacks);
  } catch(err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching feedback' });
  }
};

exports.submitFeedback = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const productId = req.params.productId;
    if(!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const product = await Product.findByPk(productId);
    if(!product) return res.status(404).json({ message: 'Product not found' });

    const feedback = await Feedback.create({
      userId: req.user.id,
      productId,
      rating,
      comment,
    });

    res.status(201).json({ feedback });
  } catch(err) {
    console.error(err);
    res.status(500).json({ message: 'Error submitting feedback' });
  }
};