const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/admin/AdminController");

const categoryAdminRoute = require("../admin/categoryRoute");
const productAdminRoute = require("../admin/productRoute");
const productVariantAdminRoute = require("../admin/productvariantsRoute");
const roleAdminRoute = require("../admin/roleRoute"); // ✅ chỉ giữ dòng này, xóa dòng trùng bên trên

const { isManagerOrAdmin } = require("../../middlewares/authMiddleware");

// === Bảo vệ route admin chung ===
//router.use(isManagerOrAdmin);

// === CÁC ROUTE XỬ LÝ FORM VÀ REDIRECT ===
router.get("/Home", adminController.index);
router.use("/Category", categoryAdminRoute);
router.use("/Product", productAdminRoute);
router.use("/ProductVariant", productVariantAdminRoute);
router.use("/Role", roleAdminRoute); // ✅ route quản lý quyền

module.exports = router;
