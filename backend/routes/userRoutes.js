const express = require('express')
const router = express.Router()
const userController = require('../controller/user')
const { protect, admin } = require('../middleware/authMiddleware.js')

router.post('/login',userController.login);
router.post('/signup',userController.signup);
router.get('/profile',protect,userController.getUserProfile);
router.put('/profile',protect,userController.updateUserProfile);
router.get('/users',protect,userController.getAllUsers);
router.get('/wishlist/:id',protect,userController.addToWishList);
router.get('/user-wishlist',protect,userController.getUserWishList);
router.delete('/wishlist/:id',protect,userController.removeToWishList);

module.exports = router;