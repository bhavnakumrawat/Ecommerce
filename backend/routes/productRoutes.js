const express = require('express')
const router = express.Router()
const productController = require('../controller/product')
const { protect, admin } = require('../middleware/authMiddleware.js')

router.get('/product',productController.getProduct);
router.get('/product/:id',productController.getProductById);
router.post('/product',protect,productController.createProduct);
// router.put('/product',protect,productController.updateProduct);
router.put('/product/:id',protect,productController.updateProduct);
router.delete('/product/:id',protect,productController.deleteProduct);
router.post('/product/:id/reviews',protect,productController.createProductReview);

router.get('/add-to-cart/:id',protect,productController.addToCart);
router.get('/get-cart',protect,productController.getCart);
router.delete('/remove-cart/:id',protect,productController.removeCart);

module.exports = router;