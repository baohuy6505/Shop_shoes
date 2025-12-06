// const express = require("express");
// const router = express.Router();
// const roleController = require("../../controllers/admin/RoleController");

// // GET - trang quản lý quyền
// router.get("/", roleController.index);

// // POST - cập nhật quyền
// router.post("/update", roleController.updateRole);

// module.exports = router;
// roleRoute.js (Nằm trong thư mục routes/admin/)

const express = require("express");
const router = express.Router();

const roleController = require("../../controllers/admin/RoleController");

const { isAdmin } = require("../../middlewares/authMiddleware");
router.use(isAdmin);
// router.get("/", isAdmin, roleController.index);

// router.post("/update", isAdmin, roleController.updateRole);
router.get("/", roleController.index);

router.post("/update", roleController.updateRole);
module.exports = router;