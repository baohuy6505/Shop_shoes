// File: controllers/ProductVariantController.js

const ProductVariant = require("../../models/productvariantsModel");
const Product = require("../../models/productModel");

class ProductVariantController {

  //1. (GET /variant) - TRANG QUẢN LÝ TỔNG HỢP
  async manageVariantsPage(req, res) {
    try {
      const message = req.query.message || null;
      const error = req.query.error || null;
      const editId = req.query.editId || null; // Lấy ID cần sửa từ URL

      let variantToEdit = null; // Biến thể cần sửa (nếu có)

      // Chỉ lấy variant cần sửa nếu có editId
      if (editId) {
        variantToEdit = await ProductVariant.findById(editId)
          .populate("product")
          .lean();
      }

      // Luôn lấy danh sách tất cả variants và products
      const [variants, allProducts] = await Promise.all([
        ProductVariant.find()
          .populate("product")
          .sort({ createdAt: -1 })
          .lean(),
        Product.find().select("productName").lean(),
      ]);

      // Xử lý isSelected cho dropdown của form Sửa (nếu có)
      let editProductsDropdown = [];
      if (variantToEdit) {
        editProductsDropdown = allProducts.map((prod) => ({
          ...prod,
          isSelected:
            prod._id.toString() === variantToEdit.product._id.toString(),
        }));
      }

      // Render trang HBS duy nhất, truyền tất cả dữ liệu cần thiết
      res.render("admin/productVariant/editproductVariant", {
        layout: "adminLayout",
        // Render file HBS bạn yêu cầu
        variants: variants, // Cho bảng danh sách
        products: allProducts, // Cho dropdown form Thêm
        variantToEdit: variantToEdit, // Dữ liệu cho form Sửa (có thể là null)
        editProductsDropdown: editProductsDropdown, // Dropdown đã xử lý cho form Sửa
        message: message,
        error: error,
      });
    } catch (err) {
      // Nếu có lỗi nghiêm trọng (vd: sai editId), quay về trang chính ko có editId
      res.redirect("/Admin/ProductVariant?error=" + err.message);
    }
  }

 //2. (POST /variant/create) - Xử lý form Thêm
  async createVariant(req, res) {
    try {
      const newVariant = new ProductVariant(req.body);
      await newVariant.save();
      res.redirect("/Admin/ProductVariant?message=Thêm%20biến%20thể%20thành%20công");
    } catch (err) {
      const errorMsg = "Lỗi%20tạo%20biến%20thể:%20" + err.message;
      res.redirect("/Admin/ProductVariant?error=" + errorMsg);
    }
  }

 //3. (POST /variant/update/:id) - Xử lý form Sửa
 
  async updateVariant(req, res) {
    const variantId = req.params.id;
    try {
      await ProductVariant.findByIdAndUpdate(variantId, req.body, {
        runValidators: true,
      });
      // Redirect về trang chính sau khi sửa
      res.redirect("/Admin/ProductVariant?message=Cập%20nhật%20biến%20thể%20thành%20công");
    } catch (err) {
      // Nếu lỗi, quay lại trang chính VÀ giữ lại ID cần sửa trên URL
      const errorMsg = "Lỗi%20cập%20nhật:%20" + err.message;
      res.redirect(`/Admin/ProductVariant?editId=${variantId}&error=` + errorMsg);
    }
  }

 //4. (POST /variant/delete/:id) - Xử lý form Xóa
 
  async deleteVariant(req, res) {
    try {
      await ProductVariant.findByIdAndDelete(req.params.id);
      res.redirect("/Admin/ProductVariant?message=Xóa%20biến%20thể%20thành%20công");
    } catch (err) {
      const errorMsg = "Lỗi%20xóa:%20" + err.message;
      res.redirect("/Admin/ProductVariant?error=" + errorMsg);
    }
  }
}

module.exports = new ProductVariantController();
