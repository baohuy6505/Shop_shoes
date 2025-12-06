const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Định nghĩa Schema cho Category
const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: [true, "Vui lòng nhập tên loại sản phẩm"],
      trim: true,
      unique: true,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 255,
    },
  },
  {
    timestamps: true,
  }
);

// Mongoose sẽ tự động tạo collection tên là 'categories'
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
