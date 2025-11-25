const express = require("express");
const router = express.Router();
const productController = require("../../controllers/admin/ProductController");
const { isManagerOrAdmin } = require("../../middlewares/authMiddleware");
const multer = require("multer");
const { storage, imageFilter } = require("../../middlewares/uploadMiddleware");
const upload = multer({ storage: storage, fileFilter: imageFilter });

router.use(isManagerOrAdmin);

// === CÁC ROUTE XỬ LÝ FORM VÀ REDIRECT ===
// GET /product -> Hiển thị trang chính (danh sách + form)
router.get("/", productController.renderProductPage);

// POST /product/create -> Xử lý tạo mới
router.post("/create", upload.single("imageUrl"), productController.createProduct);

// GET /product/edit/:id -> Hiển thị trang Sửa (form + chi tiết)
router.get("/edit/:id", productController.renderEditPage);

// POST /product/update/:id -> Xử lý cập nhật
router.post("/update/:id",upload.single("imageUrl"), productController.updateProduct);

// POST /product/delete/:id -> Xử lý xóa
router.post("/delete/:id", productController.deleteProduct);

module.exports = router;
