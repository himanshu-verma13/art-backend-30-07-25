const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);
router.get('/top_product', productController.getTopProducts); // add auth & admin middleware later if needed
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct); // add auth & admin middleware later if needed
router.post('/top_product', productController.createTopProduct); // add auth & admin middleware later if needed

module.exports = router;