const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/admin/AdminController");
const categoryAdminRoute = require("../admin/categoryRoute");
const productAdminRoute = require("../admin/productRoute");
const productVariantAdminRoute = require("../admin/productvariantsRoute");
const roleAdminRoute = require("../admin/roleRoute");
const homeAdminRoute = require("../admin/homeAdminRoute");
const userRoute = require("./userRoute");
// === Bảo vệ route admin chung ===
//router.use(isManagerOrAdmin);
router.get("/home", (req, res) => {
  res.render("admin/home", { layout: "adminLayout" }); // Đảm bảo có view này
});
// === CÁC ROUTE XỬ LÝ FORM VÀ REDIRECT ===
router.use("/users", userRoute);
router.use("/Home", homeAdminRoute);
router.use("/Category", categoryAdminRoute);
router.use("/Product", productAdminRoute);
router.use("/ProductVariant", productVariantAdminRoute);
router.use("/Role", roleAdminRoute); // ✅ route quản lý quyền

module.exports = router;
