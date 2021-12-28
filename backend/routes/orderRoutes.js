const express = require('express')
const router = express.Router()
const orderController = require('../controller/order')
const { protect, admin } = require('../middleware/authMiddleware.js')

router.post('/order',protect,orderController.createOrder);
router.get('/order/:id',protect,orderController.getOrderById);
router.get('/myorders',protect,orderController.getMyOrder);
router.get('/orderlist',protect,orderController.orderList);
router.put('/order/:id/pay',protect,orderController.updateOrderToPaid);

module.exports = router;