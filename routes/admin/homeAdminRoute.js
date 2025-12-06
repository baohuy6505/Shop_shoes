// File: routes/categoryRoute.js

const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/admin/AdminController");

router.get("/", adminController.index);
router.get("/ListOder", adminController.ListOder);
router.post("/orders/confirm/:id", adminController.ConfirmOrder);
router.post("/orders/delete/:id", adminController.DeleteOrder);

module.exports = router;
