// File: routes/categoryRoute.js

const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/admin/AdminController");

router.get("/", adminController.index);
router.get("/ListOder", adminController.ListOder);

module.exports = router;
