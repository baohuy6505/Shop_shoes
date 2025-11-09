const User = require("../../models/userModel");
const Cart = require("../../models/cartModel");
class CartController {
  async index(req, res) {
    const userId = req.session.userId;
    const cartUser = await Cart.findById({ userId: userId }).populate(
      "item.productId"
    );
    return res.render("../views/cart/index.hbs", {
      cart: cartUser,
    });
  }
  async addToCart(req, res) {
    const userId = req.session.userId;
    const { productId, quantity } = req.body; // Lấy dữ liệu sản phẩm và số lượng
    const productQuantity = parseInt(quantity) || 1;

    try {
      let cart = await Cart.findOne({ userId: userId });
      if (cart) {
        const itemIndex = cart.items.findIndex(
          (item) => item.productId.toString() === productId
        );
        if (itemIndex > -1) {
          cart.items[itemIndex].quantity += productQuantity;
        } else {
          cart.items.push({ productId, quantity: productQuantity });
        }
      } else {
        cart = await Cart.create({
          userId,
          items: [{ productId, quantity: productQuantity }],
        });
      }

      await cart.save();
      req.flash("success", "Đã thêm sản phẩm vào giỏ hàng thành công!");
      return res.redirect("/cart");
    } catch (err) {
      console.error("Lỗi khi thêm vào giỏ hàng:", err);
      req.flash("error", "Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.");
      return res.redirect("/cart");
    }
  }
}

module.exports = new CartController();
