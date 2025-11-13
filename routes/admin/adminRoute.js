const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/admin/AdminController");
const categoryAdminRoute = require("../admin/categoryRoute");
const productAdminRoute = require("../admin/productRoute");
const productVariantAdminRoute = require("../admin/productvariantsRoute");
const roleAdminRoute = require("../admin/roleRoute"); 
const homeAdminRoute = require("../admin/homeAdminRoute"); 

// === Bảo vệ route admin chung ===
//router.use(isManagerOrAdmin);

// === CÁC ROUTE XỬ LÝ FORM VÀ REDIRECT ===
router.use("/Home", homeAdminRoute);
router.use("/Category", categoryAdminRoute);
router.use("/Product", productAdminRoute);
router.use("/ProductVariant", productVariantAdminRoute);
router.use("/Role", roleAdminRoute); // ✅ route quản lý quyền

module.exports = router;
