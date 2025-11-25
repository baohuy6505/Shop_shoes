// File: routes/mainRoute.js (ĐÃ SỬA LẠI)

const express = require("express");
const router = express.Router();
const usersRouter = require("./usersRoute");
const homeRouter = require("./homeRoute");
const cartRouter = require("./cartRoute");
const productsRouter = require("./productRoute");

// Các nhánh quản lý
router.use("/Account", usersRouter); 
// Các nhánh quản lý khác
router.use("/", homeRouter);
router.use("/Cart", cartRouter);
router.use("/Products", productsRouter);

module.exports = router;
