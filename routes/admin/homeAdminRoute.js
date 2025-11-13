// File: routes/categoryRoute.js

const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/admin/AdminController");
const { isManagerOrAdmin } = require("../../middlewares/authMiddleware");

router.use(isManagerOrAdmin);
// === CÁC ROUTE XỬ LÝ FORM VÀ REDIRECT ===
// GET /category -> Hiển thị trang chính
router.get("/", adminController.index);


module.exports = router;
