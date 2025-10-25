const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Định nghĩa Schema cho Product
const productSchema = new Schema(
  {
    // ProductName NVARCHAR(150) NOT NULL
    productName: {
      type: String,
      required: [true, "Vui lòng nhập tên sản phẩm"],
      trim: true,
      maxlength: 150,
    },
    // Description NVARCHAR(MAX)
    description: {
      type: String,
      trim: true,
    },
    // Price DECIMAL(10,2) NOT NULL
    price: {
      type: Number,
      required: [true, "Vui lòng nhập giá sản phẩm"],
      min: 0,
    },
    // CategoryID INT NOT NULL ( FOREIGN KEY)
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category", // Tham chiếu đến model 'Category'
      required: [true, "Vui lòng chọn loại sản phẩm"],
    },
    // ImageURL NVARCHAR(255)
    imageUrl: {
      type: String,
      trim: true,
    },
  },
  {
    // CreatedAt DATETIME DEFAULT GETDATE()
    timestamps: true,
  }
);

// Mongoose sẽ tự động tạo collection tên là 'products'
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
