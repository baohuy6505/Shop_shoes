const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Định nghĩa Schema cho User
const userSchema = new Schema(
  {
    // UserName NVARCHAR(100) NOT NULL
    username: {
      type: String,
      required: [true, "Vui lòng nhập tên người dùng"],
      trim: true,
      maxlength: 100,
    },
    // Email NVARCHAR(100) UNIQUE NOT NULL
    email: {
      type: String,
      required: [true, "Vui lòng nhập email"],
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 100,
    },
    // PasswordHash NVARCHAR(255) NOT NULL
    passwordHash: {
      type: String,
      required: [true, "Vui lòng nhập mật khẩu"],
      select: false, // Ẩn trường này khi query
    },
    // Role NVARCHAR(20) CHECK (Role IN ('admin', 'customer')) NOT NULL DEFAULT 'customer'
    role: {
      type: String,
      enum: ["admin", "customer"], // Chỉ cho phép 1 trong 2 giá trị này
      default: "customer",
      required: true,
    },
  },
  {
    // CreatedAt DATETIME DEFAULT GETDATE()
    timestamps: true, // Tự động thêm createdAt và updatedAt
  }
);

// Mongoose sẽ tự động tạo collection tên là 'users'
const User = mongoose.model("User", userSchema);
module.exports = User;
