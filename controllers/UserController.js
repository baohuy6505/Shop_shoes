// File: controllers/UserController.js (ĐÃ SỬA LẠI)

const Category = require("../models/categoryModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");
// Sửa require nếu tên file model là productVariantsModel.js
const ProductVariant = require("../models/productVariantsModel");

class UserController {
  async index(req, res) {
    try {
      const [categories, featuredProducts] = await Promise.all([
        Category.find().lean(),
        Product.find()
          .populate("category")
          .sort({ createdAt: -1 })
          .limit(8)
          .lean(),
      ]);

      // SỬA LỖI: Đường dẫn render đúng
      res.render("index", {
        // Render views/index.hbs
        categories: categories,
        featuredProducts: featuredProducts,
      });
    } catch (err) {
      console.error("Lỗi tải trang chủ:", err);
      res.status(500).send("Lỗi server khi tải trang chủ.");
    }
  }

  admin(req, res) {
    // SỬA LỖI: Đường dẫn render đúng
    res.render("admin/admin"); // Render views/admin/admin.hbs
  }

  // === XÓA CÁC HÀM API KHÔNG DÙNG ===
  // async register(...) { ... }
  // async login(...) { ... }
  // async getUsers(...) { ... }
  // === KẾT THÚC XÓA ===
}

module.exports = new UserController();
