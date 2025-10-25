// cầu nối be với fe
const productModel = require("../models/productModel");
const Category = require("../models/categoryModel");
class ProductController {
  async product(req, res) {
    try {
      const products = await productModel.find().lean();
      res.render("../views/product/product.hbs", {
        products: products,
      });
    } catch (err) {
      res.status(500).send("Lỗi không thể tải danh sách sản phẩm");
    }
  }
  async create(req, res) {
    const createData = new productModel(req.body);
    try {
      await createData.save();
      return res.redirect("/product/product");
    } catch (err) {
      console.error("Lỗi khi tạo sản phẩm:", err.message); // Ghi lại lỗi
      return res.status(500).send("Lỗi server, không thể lưu. " + err.message);
    }
  }
}
module.exports = new ProductController();
