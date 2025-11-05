const express = require("express");
const router = express.Router();
const RoleController = require("../controllers/admin/RoleController");
const { isAdmin } = require("../middlewares/authMiddleware");

router.get("/", isAdmin, RoleController.list);
router.post("/update", isAdmin, RoleController.updateRole);

module.exports = router;
