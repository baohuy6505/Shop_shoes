const express = require("express");
const router = express.Router();
const roleController = require("../../controllers/admin/RoleController");

// GET - trang quản lý quyền
router.get("/", roleController.index);

// POST - cập nhật quyền
router.post("/update", roleController.updateRole);

module.exports = router;
