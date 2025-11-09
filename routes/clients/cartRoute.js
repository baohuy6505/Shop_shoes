const express = require("express");
const router = express.Router();
const CartController = require("../../controllers/clients/CartController");
const { requireLogin } = require("../../middlewares/authMiddleware");

// === CÁC ROUTE XỬ LÝ FORM VÀ REDIRECT ===
router.get("/", requireLogin, CartController.index);
router.post("/add-To-Cart", requireLogin, CartController.addToCart);

module.exports = router;
