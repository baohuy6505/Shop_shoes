const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
class ProductController {
  async renderProductPage(req, res) {
    try {
      // Lấy thông báo (nếu có) từ query URL
      const message = req.query.message || null;
      const error = req.query.error || null;

      // Lấy đồng thời products và categories
      const [products, categories] = await Promise.all([
        Product.find().populate("category").sort({ createdAt: -1 }).lean(),
        Category.find().lean(), // Bắt buộc phải có cho dropdown
      ]);

      res.render("../views/product/editProduct.hbs", {
        products: products,
        categories: categories,
        message: message,
        error: error,
      });
    } catch (err) {
      res.status(500).send("Lỗi tải trang: " + err.message);
    }
  }

  async createProduct(req, res) {
    try {
      const newProduct = new Product(req.body);
      await newProduct.save();

      // Sửa redirect: Về trang /product (không phải /product/product)
      res.redirect("/product?message=Thêm%20sản%20phẩm%20thành%20công");
    } catch (err) {
      console.error("Lỗi khi tạo sản phẩm:", err.message);
      // Gửi lỗi validation về trang /product
      const errorMsg = "Lỗi%20tạo%20sản%20phẩm:%20" + err.message;
      res.redirect("/product?error=" + errorMsg);
    }
  }
  async renderEditPage(req, res) {
    try {
      const [product, allCategories] = await Promise.all([
        Product.findById(req.params.id).populate("category").lean(),
        Category.find().lean(),
      ]);

      if (!product) {
        return res.redirect("/product?error=Không%20tìm%20thấy%20sản%20phẩm");
      }

      // Xử lý để tự động "chọn" đúng category trong dropdown
      const categories = allCategories.map((cat) => {
        // === BẮT ĐẦU SỬA LỖI ===
        // 1. Kiểm tra xem 'product.category' có tồn tại (không phải null) hay không
        const isCurrentlySelected =
          product.category && // <-- DÒNG KIỂM TRA QUAN TRỌNG
          cat._id.toString() === product.category._id.toString();

        // 2. Trả về đối tượng
        return {
          ...cat,
          isSelected: isCurrentlySelected, // Trả về kết quả (true/false)
        };
        // === KẾT THÚC SỬA LỖI ===
      });

      // Render file 'editProduct.hbs'
      res.render("product/editProduct", {
        product: product,
        categories: categories,
        error: req.query.error || null,
      });
    } catch (err) {
      // Bắt lỗi nếu ngay cả .populate() cũng thất bại
      res.redirect("/product?error=" + err.message);
    }
  }
  async updateProduct(req, res) {
    const productId = req.params.id;
    try {
      await Product.findByIdAndUpdate(productId, req.body, {
        runValidators: true,
      });
      res.redirect("/product?message=Cập%20nhật%20thành%20công");
    } catch (err) {
      // Nếu lỗi, quay lại trang Sửa
      const errorMsg = "Lỗi%20cập%20nhật:%20" + err.message;
      res.redirect(`/product/edit/${productId}?error=` + errorMsg);
    }
  }

  async deleteProduct(req, res) {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.redirect("/product?message=Xóa%20sản%20phẩm%20thành%20công");
    } catch (err) {
      const errorMsg = "Lỗi%20xóa:%20" + err.message;
      res.redirect("/product?error=" + errorMsg);
    }
  }
}

module.exports = new ProductController();
