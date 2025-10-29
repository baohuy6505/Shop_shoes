const express = require("express");
const router = express.Router();
const CartController = require("../controllers/CartController");
const authMiddleware = require("../middlewares/authMiddleware");

// === CÁC ROUTE XỬ LÝ FORM VÀ REDIRECT ===
router.use(authMiddleware);
// router.get("/",authMiddleware, CartController.index);
router.get("/", CartController.index);
router.post("/add-To-Cart", authMiddleware, CartController.addToCart);

module.exports = router;
