var mongoose = require('mongoose')
// Product = mongoose.model('Product'); 
// Post = mongoose.model('Post'); 
const User = require('../models/userModel')
const generateToken =require('../utils/generateToken.js')
const asyncHandler = require('express-async-handler')

exports.login = asyncHandler(async(req,res)=>{
    
    const { email, password } = req.body

    const user = await User.findOne({ email })
    
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        wishlist:user.wishlist,
        token: generateToken(user._id),
      })
    } else {
      res.status(401)
      throw new Error('Invalid email or password')
    }

  
})
exports.signup = asyncHandler( async (req, res) => {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password,
    })

    if (user) {
        res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})
exports.getUserProfile = async (req, res) => {

    const user = await User.findById(req.user._id)

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
}
exports.updateUserProfile = async (req, res) => {
    
    const user = await User.findById(req.user._id)

    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      // user.isAdmin = true
  
      if (req.body.password) {
        user.password = req.body.password
      }
  
      const updatedUser = await user.save()
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
}
exports.getAllUsers = async (req, res) => {
  const users = await User.find({})
  res.json(users)
}

exports.addToWishList = async (req, res) => {
  
  User.findByIdAndUpdate(req.user._id,{
    $push:{wishlist:req.params.id}
    },{
        new:true
    },(err,result)=>{
      console.log("result data : ",result)
        if(err){
            return res.status(422).json({error:err})
        }
        return res.status(201).json({result})

    })
}
exports.getUserWishList = async (req, res) => {
  console.log("result data : ")
  User.findById(req.user._id).
    populate('wishlist').
      then((result)=>{     
        const data = result.wishlist
         console.log("result data : ",data)
         return res.status(201).json(data)
     } ).catch((err)=> {return res.status(422).json({error:err})})
}
exports.removeToWishList = async (req, res) => {
  
 
  User.findByIdAndUpdate(req.user._id,{
    $pull:{wishlist:req.params.id}
      },{
          new:true
      }).exec((err,result)=>{
        console.log(result)
          if(err){
              return res.status(422).json({error:err})
          }else{
              res.json(result)
          }
  })
}