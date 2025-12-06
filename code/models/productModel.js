const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Định nghĩa Schema cho Product
const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: [true, "Vui lòng nhập tên sản phẩm"],
      trim: true,
      maxlength: 150,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Vui lòng nhập giá sản phẩm"],
      min: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category", // Tham chiếu đến model 'Category'
      required: [true, "Vui lòng chọn loại sản phẩm"],
    },
    imageUrl: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Mongoose sẽ tự động tạo collection tên là 'products'
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
