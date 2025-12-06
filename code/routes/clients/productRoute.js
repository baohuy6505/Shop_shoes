const express = require("express");
const router = express.Router();
const ProductController = require("../../controllers/clients/ProductController");

// === CÁC ROUTE XỬ LÝ FORM VÀ REDIRECT ===

// GET /product -> Hiển thị trang chính (danh sách + form)
router.get("/", ProductController.index);
router.get("/Detail/:id", ProductController.detail);

module.exports = router;
