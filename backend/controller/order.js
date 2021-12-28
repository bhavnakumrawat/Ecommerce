var mongoose = require('mongoose')

const {Product} = require('../models/productModel.js')
const User = require('../models/userModel.js')
const Cart = require('../models/cartModel.js')
const Order  = require('../models/orderModel.js')

exports.createOrder = async(req,res)=>{
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      } = req.body
    
      if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
        return
      } else {
        const order = new Order({
          orderItems,
          user: req.user._id,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        })
    
        const createdOrder = await order.save()
       
        Cart.deleteMany({user_id:req.user._id}).then((result)=>{
          res.status(201).json(createdOrder)
        }).catch((err)=>{
           console.log(err)
        })
        
      }
}

exports.getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )
  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
}

exports.getMyOrder = async (req, res) => {

  const order = await Order.find({user:req.user._id}) 
  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
}
exports.orderList = async (req, res) => {

  const order = await Order.find().populate(
    'user',
    'name email'
  )
  
  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
}
exports.updateOrderToPaid = async (req, res) => {
  const order = await Order.findById(req.params.id)
   console.log("req body : ",req.body)
  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.created,
      email_address: req.body.email,
    }

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
}
