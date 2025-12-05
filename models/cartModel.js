const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User', //liên kết với User
      required: true,
    },
    items: [
      {
        variantId: {
          type: Schema.Types.ObjectId,
          ref: 'ProductVariant', //liên kết với biến thể sản phẩm
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          min: 1,
        },
      },
    ],
    status: {
            type: String,
            enum: ['ACTIVE', 'PLACED', 'CONFIRMED'],
            default: 'ACTIVE', 
    },
    totalPrice: {
            type: Number,
            default: 0,
    },
  },
  {
    timestamps: true, //tạo createdAt, updatedAt
  }
);

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
