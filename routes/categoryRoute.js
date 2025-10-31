// File: routes/categoryRoute.js

const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/CategoryController");

// === CÁC ROUTE XỬ LÝ FORM VÀ REDIRECT ===

// GET /category -> Hiển thị trang chính
router.get("/", categoryController.renderCategoryPage);

// POST /category/create -> Xử lý tạo mới
router.post("/create", categoryController.createCategory);

// GET /category/edit/:id -> Hiển thị trang Sửa
router.get("/edit/:id", categoryController.renderEditPage);

// GET /category/edit/:id -> Hiển thị trang Sửa
// router.post("/edit/:id", categoryController.EditPage);

// POST /category/update/:id -> Xử lý cập nhật
router.post("/edit/:id", categoryController.editCategory);

// POST /category/delete/:id -> Xử lý xóa
router.post("/delete/:id", categoryController.deleteCategory);

module.exports = router;
