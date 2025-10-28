// File: routes/usersRoute.js (ĐÃ SỬA LẠI)

var express = require("express");
var router = express.Router();
const UserController = require("../controllers/UserController");

// --- SỬA LẠI HOÀN TOÀN ---

// GET / -> Trang chủ (sẽ được gọi bởi http://localhost:5000/)
router.get("/", UserController.index);

// GET /admin -> Trang admin (sẽ được gọi bởi http://localhost:5000/admin)
router.get("/admin", UserController.admin);

// (Bỏ các route API vì không dùng admin.js)

module.exports = router;
