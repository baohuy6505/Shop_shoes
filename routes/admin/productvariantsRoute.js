const express = require("express");
const router = express.Router();
const ProductVariantController = require("../../controllers/admin/ProductVariantsController");
const { isManagerOrAdmin } = require("../../middlewares/authMiddleware");

router.use(isManagerOrAdmin);
// 1. (GET /variant) -> Hiển thị trang quản lý tổng hợp
router.get("/", ProductVariantController.manageVariantsPage);

// 2. (POST /variant/create) -> Xử lý form Thêm mới
router.post("/create", ProductVariantController.createVariant);

// 3. (POST /variant/update/:id) -> Xử lý form Cập nhật
router.post("/update/:id", ProductVariantController.updateVariant);

// 4. (POST /variant/delete/:id) -> Xử lý form Xóa
router.post("/delete/:id", ProductVariantController.deleteVariant);

// KHÔNG CẦN route GET /edit/:id nữa

module.exports = router;
