const User = require("../../models/userModel");
const Cart = require("../../models/cartModel");
const ProductVariant = require("../../models/productvariantsModel");
class CartController {
  async index(req, res) {
    const userId = req.session.user ? req.session.user.id : null;
    if (!userId) {
      return res.redirect("/Account/Login");
    }
    const cartUser = await Cart.findOne({ userId: userId, status: 'ACTIVE' }).populate({
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

  async addToCart(req, res) {
    try {
      if (!req.session.user) {
        req.flash("error", "Vui lòng đăng nhập.");
        return res.redirect("/Account/Login");
      }
      const userId = req.session.user.id;

      const { productId, quantity, size, color } = req.body;
      const productQuantity = parseInt(quantity) || 1;

      const variant = await ProductVariant.findOne({
        product: productId,
        size: size,
        color: color,
      });

      if (!variant) {
        req.flash("error", "Sản phẩm với kích thước và màu sắc đã hết hàng.");
        return res.redirect("back");
      }

      if (variant.stockQuantity < productQuantity) {
        req.flash("error", "Số lượng trong kho không đủ.");
        return res.redirect("back");
      }

      let cart = await Cart.findOne({ userId: userId, status: 'ACTIVE' });

      if (cart) {
        const itemIndex = cart.items.findIndex(
          (item) => item.variantId.toString() === variant._id.toString()
        );

        if (itemIndex > -1) {
          cart.items[itemIndex].quantity += productQuantity;
        } else {
          cart.items.push({
            variantId: variant._id,
            quantity: productQuantity,
          });
        }
      } else {
        cart = await Cart.create({
          userId,
          items: [
            {
              variantId: variant._id,
              quantity: productQuantity,
            },
          ],
          status: 'ACTIVE',
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

  async updateQuantityCart(req, res) {
    try {
      const userId = req.session.user.id;
      const { variantId, action, productId, quantityProduct } = req.body;
      let cart = await Cart.findOne({ userId: userId });

      if (!["increase", "decrease"].includes(action)) {
        return res.status(400).send("Hành động không hợp lệ.");
      }
      if (action === "decrease" && quantityProduct <= 1) {
        req.flash("error", "Số lượng sản phẩm không thể nhỏ hơn 1.");
        return res.redirect("/cart");
      } 
      if (action === "increase") {
        // Kiểm tra tồn kho trước khi tăng số lượng
        const variant = await ProductVariant.findById(variantId);
        if (variant.stockQuantity < quantityProduct + 1) {
          req.flash("error", "Số lượng trong kho không đủ.");
          return res.redirect("/cart");
        } else {
          const itemIndex = cart.items.findIndex(
            (item) => item.variantId.toString() === variantId
          );
          if (itemIndex > -1) {
            cart.items[itemIndex].quantity += 1;
            await cart.save();
            req.flash("success", "Đã cập nhật số lượng sản phẩm.");
            return res.redirect("/cart");
          }

        }
      } else if (action === "decrease") {
        const itemIndex = cart.items.findIndex(
          (item) => item.variantId.toString() === variantId
        );
        if (itemIndex > -1) {
          cart.items[itemIndex].quantity -= 1;
          await cart.save();
          req.flash("success", "Đã cập nhật số lượng sản phẩm.");
          return res.redirect("/cart");
        }
      }
    } catch (err) {
      console.error("Lỗi khi cập nhật số lượng giỏ hàng:", err);
      req.flash("error", "Có lỗi xảy ra khi cập nhật số lượng giỏ hàng.");
      return res.redirect("/cart");
    }
  }
  async removeFromCart(req, res) {
    try {
      const userId = req.session.user.id;
      const  variantId  = req.params.id;
      let cart = await Cart.findOne({ userId: userId });
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
  async orderProduct(req, res) {
    const userId = req.session.user.id;
    const totalPrice = req.body.totalPrice;
    if (!userId) {
      req.flash("error", "Vui lòng đăng nhập.");
      return res.redirect("/Account/Login");
    }
    const cart = await Cart.findOne({ userId: userId, status: 'ACTIVE' });
    if (!cart || cart.items.length === 0) {
      req.flash("error", "Giỏ hàng của bạn đang trống.");
      return res.redirect("/cart");
    }
    cart.status = 'PLACED';
    cart.totalPrice = totalPrice;
    await cart.save();
    req.flash("success", "Đặt hàng thành công!");
    return res.redirect("/cart");
  }
}

module.exports = new CartController();
