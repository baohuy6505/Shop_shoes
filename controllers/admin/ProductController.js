const Category = require("../../models/categoryModel");
const Product = require("../../models/productModel");

class ProductController {
  async renderProductPage(req, res) {
    try {
      const products = await Product.find()
        .populate("category")
        .sort({ createdAt: -1 })
        .lean();
      const categories = await Category.find().lean();
      const message = req.query.message || null;
      const error = req.query.error || null;

      res.render("admin/product/editProduct", {
        layout: "adminLayout",
        products: products,
        categories: categories,
        message: message,
        error: error,
      });
    } catch (err) {
      console.error("Lỗi renderProductPage:", err);
      console.error("Stack:", err.stack);
      res.status(500).send("Lỗi tải trang: " + err.message);
    }
  }

  async createProduct(req, res) {
    try {
      const { productName, description, price, category } = req.body;
      const file = req.file;
      let imageUrl = null;

      if (file) {
        imageUrl = "/images/products/" + file.filename;
      }
      //Kiểm tra dữ liệu bắt buộc
      if (!productName || !price || !category) {
        return res.redirect(
          "/Admin/Product?error=Vui%20lòng%20điền%20đầy%20đủ%20thông%20tin%20bắt%20buộc"
        );
      }

      const newProduct = new Product({
        productName: productName.trim(),
        description: description ? description.trim() : "",
        price: parseFloat(price),
        category: category,
        imageUrl: imageUrl,
      });

      await newProduct.save();
      res.redirect("/Admin/Product?message=Thêm%20mới%20sản%20phẩm%20thành%20công");
    } catch (err) {
      console.error("Lỗi createProduct:", err);
      let errorMsg = "Lỗi%20tạo%20mới:%20" + err.message;
      res.redirect("/Admin/Product?error=" + errorMsg);
    }
  }

  async renderEditPage(req, res) {
    try {
      const product = await Product.findById(req.params.id)
        .populate("category")
        .lean();
      const categories = await Category.find().lean();

      if (!product) {
        return res.redirect("/product?error=Không%20tìm%20thấy%20sản%20phẩm");
      }

      // Thêm flag isSelected để Handlebars dễ so sánh category
      const categoriesWithSelected = categories.map((cat) => ({
        ...cat,
        isSelected: cat._id.toString() === product.category._id.toString(),
      }));

      res.render("admin/product/editProduct", {
        layout: "adminLayout",
        product: product,
        categories: categoriesWithSelected,
        error: req.query.error || null,
      });
    } catch (err) {
      console.error("Lỗi renderEditPage:", err);
      res.redirect("/product?error=" + err.message);
    }
  }

  async updateProduct(req, res) {
    const productId = req.params.id;
    const { deleteFile } = require("../../middlewares/uploadMiddleware");
    try {
      const { productName, description, price, category } = req.body;
      const existingProduct = await Product.findById(productId).lean();
      const file = req.file;
      let imageUrl = null;
      if (file) {
        deleteFile(existingProduct.imageUrl);
        imageUrl = "/images/products/" + file.filename;
      } else {
        imageUrl = existingProduct.imageUrl;
      }

      // Kiểm tra dữ liệu bắt buộc
      if (!productName || !price || !category) {
        return res.redirect(
          `/Admin/Product/edit/${productId}?error=Vui%20lòng%20điền%20đầy%20đủ%20thông%20tin%20bắt%20buộc`
        );
      }

      await Product.findByIdAndUpdate(
        productId,
        {
          productName: productName.trim(),
          description: description ? description.trim() : "",
          price: parseFloat(price),
          category: category,
          imageUrl: imageUrl ? imageUrl.trim() : "",
        },
        { runValidators: true }
      );

      res.redirect(
        "/Admin/Product?message=Cập%20nhật%20sản%20phẩm%20thành%20công"
      );
    } catch (err) {
      console.error("Lỗi updateProduct:", err);
      let errorMsg = "Lỗi%20cập%20nhật:%20" + err.message;
      res.redirect(`/Admin/Product/edit/${productId}?error=` + errorMsg);
    }
  }

  async deleteProduct(req, res) {
    try {
      const productId = req.params.id;
        const { deleteFile } = require("../../middlewares/uploadMiddleware");
      const product = await Product.findById(productId);
      if (!product) {
        return res.redirect(
          "/Admin/Product?error=Không%20tìm%20thấy%20sản%20phẩm"
        );
      }
      if (product.imageUrl) {
        console.log("Xoá file:", product.imageUrl);
        deleteFile(product.imageUrl);
      }

      await Product.findByIdAndDelete(productId);
      req.flash("success", "Xóa sản phẩm thành công.");
      res.redirect("/Admin/Product");
    } catch (err) {
      console.error("Lỗi deleteProduct:", err);
      res.redirect("/Admin/Product?error=" + err.message);
    }
  }
}

module.exports = new ProductController();
