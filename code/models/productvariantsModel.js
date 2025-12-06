const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Định nghĩa Schema cho Biến thể sản phẩm
const productVariantSchema = new Schema(
  {
    // ProductID INT NOT NULL (FOREIGN KEY)
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product", // Tham chiếu đến model 'Product'
      required: [true, "Biến thể phải thuộc về một sản phẩm"],
    },
    // Size NVARCHAR(20) NOT NULL
    size: {
      type: String,
      required: [true, "Vui lòng nhập size"],
      trim: true,
      maxlength: 20,
    },
    // Color NVARCHAR(50) NOT NULL
    color: {
      type: String,
      required: [true, "Vui lòng nhập màu sắc"],
      trim: true,
      maxlength: 50,
    },
    // StockQuantity INT NOT NULL DEFAULT 0
    stockQuantity: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Mongoose sẽ tự động tạo collection tên là 'productvariants'
// const ProductVariant = mongoose.model("ProductVariant", productVariantSchema);
const ProductVariant = 
    mongoose.models.ProductVariant || 
    mongoose.model("ProductVariant", productVariantSchema);
module.exports = ProductVariant;
