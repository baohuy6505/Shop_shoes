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
// Middleware mã hóa mật khẩu trước khi lưu
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();zv
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Thêm method để so sánh mật khẩu khi đăng nhập
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
