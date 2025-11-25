const User = require("../../models/userModel");
const Cart = require("../../models/cartModel");
const ProductVariant = require("../../models/productvariantsModel");
class CartController {
  async index(req, res) {
    const userId = req.session.user ? req.session.user.id : null;
    if (!userId) {
      return res.redirect("/Account/Login");
    }
    const cartUser = await Cart.findOne({ userId: userId }).populate({
      path: "items.variantId",
      populate: { path: "product" },
    });

    const cartData = cartUser ? cartUser.toObject() : { items: [] };
    let totalPrice = 0;
    cartData.items.forEach((item) => {
      if (item.variantId && item.variantId.product) {
        item.totalLine = item.variantId.product.price * item.quantity;
        totalPrice += item.totalLine;
      }
    });
    return res.render("clients/cart/index", {
      cart: cartData,
      totalPrice: totalPrice,
    });
  }

  // async addToCart(req, res) {
  //   const userId = req.session.user.id;
  //   const { productId, quantity, size, color } = req.body; // Lấy dữ liệu sản phẩm và số lượng
  
  //   const productQuantity = parseInt(quantity) || 1;
  //   const variant = await ProductVariant.findOne({
  //     product: productId,
  //     size: size,
  //     color: color
  //   })
  //   if(!variant){
  //     req.flash("error", "Sản phẩm với kích thước và màu sắc đã chọn không tồn tại.");
  //     return res.redirect("back");
  //   }
  //   try {
  //     let cart = await Cart.findOne({ userId: userId });
  //     if (cart) {
  //       const itemIndex = cart.items.findIndex(
  //         (item) => item.productId.toString() === productId
  //       );
  //       if (itemIndex > -1) {
  //         cart.items[itemIndex].quantity += productQuantity;
  //       } else {
  //         cart.items.push({ productId, quantity: productQuantity });
  //       }
  //     } else {
  //       cart = await Cart.create({
  //         userId,
  //         items: [{ productId, quantity: productQuantity }],
  //       });
  //     }

  //     await cart.save();
  //     req.flash("success", "Đã thêm sản phẩm vào giỏ hàng thành công!");
  //     return res.redirect("/cart");
  //   } catch (err) {
  //     console.error("Lỗi khi thêm vào giỏ hàng:", err);
  //     req.flash("error", "Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.");
  //     return res.redirect("/cart");
  //   }
  // }
  async addToCart(req, res) {
    try {
      // 1. Kiểm tra đăng nhập (Tránh crash nếu session hết hạn)
      if (!req.session.user) {
        req.flash("error", "Vui lòng đăng nhập.");
        return res.redirect("/Account/Login");
      }
      const userId = req.session.user.id;
      
      // 2. Lấy dữ liệu
      const { productId, quantity, size, color } = req.body; 
      const productQuantity = parseInt(quantity) || 1;
  
      // 3. TÌM BIẾN THỂ (VARIANT)
      // Bước này quan trọng nhất: Phải tìm ra ID của biến thể (VD: Giày Nike Size 40 Màu Đen là ID nào?)
      const variant = await ProductVariant.findOne({
        product: productId,
        size: size,
        color: color
      });
  
      if (!variant) {
        req.flash("error", "Sản phẩm với kích thước và màu sắc đã hết hàng.");
        return res.redirect("back");
      }
      
      // Kiểm tra tồn kho (Optional)
      if (variant.stockQuantity < productQuantity) {
          req.flash("error", "Số lượng trong kho không đủ.");
          return res.redirect("back");
      }
  
      // 4. XỬ LÝ GIỎ HÀNG
      let cart = await Cart.findOne({ userId: userId });
  
      if (cart) {
        // --- SỬA LỖI Ở ĐÂY ---
        // Phải tìm theo variantId (biến thể), KHÔNG PHẢI productId
        // Vì 1 đôi giày size 40 và size 41 là 2 dòng khác nhau trong giỏ hàng
        const itemIndex = cart.items.findIndex(
          (item) => item.variantId.toString() === variant._id.toString()
        );
  
        if (itemIndex > -1) {
          cart.items[itemIndex].quantity += productQuantity;
        } else {
          cart.items.push({ 
              variantId: variant._id,  
              quantity: productQuantity 
          });
        }
      } else {
        cart = await Cart.create({
          userId,
          items: [{ 
              variantId: variant._id, 
              quantity: productQuantity 
          }],
        });
      }
  
      await cart.save();
      req.flash("success", "Đã thêm sản phẩm vào giỏ hàng thành công!");
      return res.redirect("/cart");

    } catch (err) {
      console.error("Lỗi khi thêm vào giỏ hàng:", err);
      req.flash("error", "Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.");
      return res.redirect("back"); // Dùng "back" để quay lại trang chi tiết thay vì về trang cart ngay
    }
  }
  async removeFromCart(req, res) {
    try {
      const userId = req.session.user.id;
      const { variantId } = req.body;
      let cart = await Cart.findOne
        ({ userId: userId });
      if (cart) {
        cart.items = cart.items.filter(
          (item) => item.variantId.toString() !== variantId
        );
        await cart.save();
      }
      req.flash("success", "Đã xóa sản phẩm khỏi giỏ hàng.");
      return res.redirect("/cart");
    } catch (err) {
      console.error("Lỗi khi xóa khỏi giỏ hàng:", err);
      req.flash("error", "Có lỗi xảy ra khi xóa sản phẩm khỏi giỏ hàng.");
      return res.redirect("/cart");
    }
  }
}

module.exports = new CartController();
