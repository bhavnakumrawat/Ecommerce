const mongoose = require('mongoose')

const cartSchema = mongoose.Schema(
  {
    user_id: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    qty_committed: {
        type: Number,
        default: 0
    },
    qty_ordered: {
        type: Number,
        default: 0
    },
    qty:{
        type: Number,
        default: 0

    },
    product_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
},{
    timestamps: true,
  }
)

const Cart = mongoose.model('Cart', cartSchema)


module.exports = Cart
