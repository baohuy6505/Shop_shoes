const Category = require("../../models/categoryModel");
const Product = require("../../models/productModel");

class CategoryController {
  // Trang quản lý Category
  async renderCategoryPage(req, res) {
    try {
      const categories = await Category.find().sort({ createdAt: -1 }).lean();
      res.render("admin/category/create", {
        layout: "adminLayout",
        categories,
      });
    } catch (err) {
      console.error("Lỗi renderCategoryPage:", err);
      res.status(500).send("Lỗi tải trang: " + err.message);
    }
  }

  // Thêm mới Category
  async createCategory(req, res) {
    try {
      const newCategory = new Category(req.body);
      await newCategory.save();
      req.flash("success", "Thêm sản phẩm thành công.");
      return res.redirect("/Admin/Category");
    } catch (err) {
      console.error("Lỗi createCategory:", err);
      let errorMsg = "Lỗi tạo mới: " + err.message;
      if (err.code === 11000) {
        errorMsg = "Tên loại sản phẩm đã tồn tại.";
      }
      req.flash("error", errorMsg);
      return res.redirect("/Admin/Category");
    }
  }


  async renderEditPage(req, res) { 
    const editId = await req.params.id;
    if (!editId) {
      return res.render("admin/category/create", { layout: "adminLayout" });
    }
    const category = await Category.findById(editId).lean();
    return res.render("admin/category/edit", { layout: "adminLayout", category });
  }

  // Cập nhật Category
  async editCategory(req, res) {
    const categoryId = req.params.id;
    try {
      await Category.findByIdAndUpdate(categoryId, req.body, {
        runValidators: true,
      });
      req.flash("success", "Cập nhật loại sản phẩm thành công.");
      return res.redirect("/Admin/Category");
    } catch (err) {
      console.error("Lỗi updateCategory:", err);
      let errorMsg = "Lỗi cập nhật: " + err.message;
      if (err.code === 11000) {
        errorMsg = "Tên loại sản phẩm đã tồn tại.";
      }
      req.flash("error", errorMsg);
      return res.redirect("/Admin/Category");
    }
  }

  // Xóa Category
  async deleteCategory(req, res) {
    try {
      const categoryId = req.params.id;

      const productCount = await Product.countDocuments({
        category: categoryId,
      });

      if (productCount > 0) {
        req.flash("error", `Không thể xóa. Đang có ${productCount} sản phẩm thuộc loại này.`);
        return res.redirect("/Admin/Category");
      }

      await Category.findByIdAndDelete(categoryId);
      req.flash("success", "Xóa loại sản phẩm thành công.");
      return res.redirect("/Admin/Category");
    } catch (err) {
      console.error("Lỗi deleteCategory:", err);
      req.flash("error", err.message);
      res.redirect("/Admin/Category");
    }
  }
}

module.exports = new CategoryController();
