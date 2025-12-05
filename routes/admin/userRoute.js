const express = require("express");
const router = express.Router();
const userController = require("../../controllers/admin/UserController");

// 1. Xem danh sách
router.get("/", userController.index);

// 2. Hiển thị form thêm mới
router.get("/create", userController.create);

// 3. Xử lý lưu form (POST)
router.post("/store", userController.store);

module.exports = router;
