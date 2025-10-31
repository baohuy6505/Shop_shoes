const express = require("express");
const router = express.Router();
const adminController = require('../../controllers/admin/AdminController');
const categoryAdminRoute = require('../categoryRoute');
const productAdminRoute = require('../productRoute');
const productVariantAdminRoute = require('../productvariantsRoute');
// const authMiddleware = require("../../middlewares/authMiddleware");

// === CÁC ROUTE XỬ LÝ FORM VÀ REDIRECT ===
//router.use(authMiddleware);
router.get("/Home", adminController.index);
router.use("/Category", categoryAdminRoute);
router.use("/Product", productAdminRoute);
router.use("/ProductVariant", productVariantAdminRoute);
module.exports = router;

