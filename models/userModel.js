// File: models/userModel.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Vui lòng nhập tên người dùng"],
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, "Vui lòng nhập email"],
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 100,
    },

    // Đổi 'passwordHash' thành 'password'
    password: {
      type: String,
      required: [true, "Vui lòng nhập mật khẩu"],
      select: false, // Vẫn giữ 'select: false' để không bị lộ khi query
    },
    // --- KẾT THÚC SỬA ---

    role: {
      type: String,
      enum: ["admin", "customer"],
      default: "customer",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
