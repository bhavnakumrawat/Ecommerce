var mongoose = require('mongoose')

const {Product} = require('../models/productModel.js')
const { where } = require('../models/userModel.js')
const User = require('../models/userModel.js')
const Cart = require('../models/cartModel.js')
const asyncHandler =require('express-async-handler')

exports.getProduct = async(req,res)=>{
    
    const products = await Product.find()
    
    res.json({ products})

  
}
exports.getProductById = async (req, res) => {
    console.log('products')
    const product = await Product.findById(req.params.id)
  
    if (product) {
      res.json(product)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
}
exports.addToCart = async (req, res) => {
   

  console.log("req.query.qty : ",req.query.qty)

  var cart_data = {
    product_id:req.params.id,
    qty:req.query.qty,
    user_id:req.user._id
  }
  const cart_exit = await Cart.find({user_id:req.user._id,product_id:req.params.id})
 
  console.log("cart_exit : ",cart_exit)
  console.log("cart_exit.length>0 : ",cart_exit.length>0)

  if (req.query.cart_id != 'undefined'){
    console.log(' if')

    const cart = await Cart.findById(req.query.cart_id)
    cart.qty = req.query.qty
    cart.save().then(result=>{
      Cart.find({user_id:req.user._id})
      .populate("product_id","_id name image price countInStock")
      .sort('-createdAt')
      .then(cart=>{
        console.log("cart data : ",cart)
          res.json({cart})
      })
      .catch(err=>{
          console.log(err)
      }) 
      
    }).catch(err=>{console.log(err)});
    
  }
  else if((cart_exit.length>0)&&(req.query.cart_id == 'undefined')){
    console.log('else if')
    const cart = await Cart.find({user_id:req.user._id,product_id:req.params.id})
    console.log("cart : ",cart[0])
    cart[0].qty = req.query.qty
     cart[0].save().then(result=>{
      Cart.find({user_id:req.user._id})
      .populate("product_id","_id name image price countInStock")
      .sort('-createdAt')
      .then(cart=>{
        console.log("cart data : ",cart)
          res.json({cart})
      })
      .catch(err=>{
          console.log(err)
      }) 
    }).catch(()=>{})
  }
  else{
    console.log('else ')

    const cart = await Cart.create(cart_data);
    cart.save().then(result=>{
      Cart.find({user_id:req.user._id})
      .populate("product_id","_id name image price countInStock")
      .sort('-createdAt')
      .then(cart=>{
        console.log("cart data : ",cart)
          res.json({cart})
      })
      .catch(err=>{
          console.log(err)
      }) 
      
     }).catch(err=>{console.log(err)})
  }
  
}
exports.getCart = async (req, res) => {

      
  Cart.find({user_id:req.user._id})
  .populate("product_id","_id name image price countInStock")
  .sort('-createdAt')
  .then(cart=>{
    console.log("cart data : ",cart)
      res.json({cart})
  })
  .catch(err=>{
      console.log(err)
  })
}

exports.removeCart = async (req, res) => {
  Cart.findByIdAndRemove(req.params.id).then((cart)=>{
    res.json({cart})

  }).catch(err=>{
    console.log(err)  
  })

}
exports.createProduct = async (req, res) => {
  // const {
  //   name,
  //   price,
  //   description,
  //   image,
  //   brand,
  //   category,
  //   countInStock,
  // } = req.body

  // if(name&&price&&description&&image&&brand&&category&&countInStock){
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      user: req.user._id,
      image: req.body.image,
      brand:  req.body.brand,
      category:  req.body.category,
      countInStock: req.body.countInStock,
      numReviews: 0,
      description:  req.body.description,
    })
  
    const createdProduct = await product.save()
    console.log("createdProduct : ",createdProduct)
    res.status(201).json(createdProduct)

  // }else{
    
    // res.status(401).json({msg:'All the fields required'})
  // }


}

exports.updateProduct = async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    console.log(updatedProduct)
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }

}
exports.deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
}
exports.shippingAddress = async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
}
exports.createProductReview = asyncHandler(async (req, res) => {

  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )
    console.log(" alreadyReviewed : ",alreadyReviewed)

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    console.log("product.reviews : ",product.reviews.length)
    console.log("product.reviews.reduce((acc, item) => item.rating + acc, 0) : ",product.reviews.reduce((acc, item) => item.rating + acc, 0))
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})
