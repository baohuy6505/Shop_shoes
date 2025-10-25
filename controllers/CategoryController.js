const Category = require("../models/categoryModel");
const Product = require("../models/productModel");
class CategoryController {
  async renderCategoryPage(req, res) {
    try {
      const categories = await Category.find().sort({ createdAt: -1 }).lean();
      const message = req.query.message || null;
      const error = req.query.error || null;
      res.render("../views/category/editCategory.hbs", {
        categories: categories,
        message: message,
        error: error,
      });
    } catch (err) {
      res.status(500).send("Lỗi tải trang: " + err.message);
    }
  }
  async createCategory(req, res) {
    try {
      const newCategory = new Category(req.body);
      await newCategory.save();

      res.redirect("/category?message=Thêm%20mới%20thành%20công");
    } catch (err) {
      let errorMsg = "Lỗi%20tạo%20mới:%20" + err.message;
      if (err.code === 11000) {
        errorMsg = "Lỗi:%20Tên%20loại%20sản%20phẩm%20đã%20tồn%20tại.";
      }
      res.redirect("/category?error=" + errorMsg);
    }
  }
  async renderEditPage(req, res) {
    try {
      const category = await Category.findById(req.params.id).lean();
      if (!category) {
        return res.redirect(
          "/category?error=Không%20tìm%20thấy%20loại%20sản%20phẩm"
        );
      }

      res.render("editCategory", {
        category: category,
        error: req.query.error || null, // Lấy lỗi nếu update thất bại
      });
    } catch (err) {
      res.redirect("/category?error=" + err.message);
    }
  }

  async updateCategory(req, res) {
    const categoryId = req.params.id;
    try {
      await Category.findByIdAndUpdate(categoryId, req.body, {
        runValidators: true,
      });

      res.redirect("/category?message=Cập%20nhật%20thành%20công");
    } catch (err) {
      let errorMsg = "Lỗi%20cập%20nhật:%20" + err.message;
      if (err.code === 11000) {
        errorMsg = "Lỗi:%20Tên%20loại%20sản%20phẩm%20đã%20tồn%20tại.";
      }
      res.redirect(`/category/edit/${categoryId}?error=` + errorMsg);
    }
  }

  async deleteCategory(req, res) {
    try {
      const categoryId = req.params.id;

      const productCount = await Product.countDocuments({
        category: categoryId,
      });
      if (productCount > 0) {
        return res.redirect(
          `/category?error=Không%20thể%20xóa.%20Đang%20có%20${productCount}%20sản%20phẩm%20thuộc%20loại%20này.`
        );
      }

      await Category.findByIdAndDelete(categoryId);

      res.redirect("/category?message=Xóa%20thành%20công");
    } catch (err) {
      res.redirect("/category?error=" + err.message);
    }
  }
}

module.exports = new CategoryController();
