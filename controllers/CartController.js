const User = require("../models/userModel");

class CartController {
  async index(req, res) { 
    return res.render("../views/cart/index.hbs");
  }
  async addToCart(req, res) {
    const userId = req.session.userId;
    
    // const { productId, quantity } = req.body;
  }

}

module.exports = new CartController();
