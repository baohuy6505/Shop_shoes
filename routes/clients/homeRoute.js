const express = require("express");
const router = express.Router();
const HomeController = require("../../controllers/clients/HomeController");

// === CÁC ROUTE XỬ LÝ FORM VÀ REDIRECT ===

// GET /product -> Hiển thị trang chính (danh sách + form)
router.get("/", HomeController.index);

module.exports = router;
