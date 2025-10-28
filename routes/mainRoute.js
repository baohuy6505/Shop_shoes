// File: routes/mainRoute.js (ĐÃ SỬA LẠI)

const express = require("express");
const router = express.Router();

const usersRouter = require("./usersRoute");
const productsRouter = require("./productRoute");
const categoryRouter = require("./categoryRoute");
const productVariantRoutes = require("./productvariantsRoute");
router.use("/", usersRouter); // <<< DÒNG QUAN TRỌNG NHẤT CHO TRANG CHỦ

// Các nhánh quản lý khác
router.use("/product", productsRouter);
router.use("/category", categoryRouter);
router.use("/variant", productVariantRoutes); // Sửa tên biến nếu cần

module.exports = router;
