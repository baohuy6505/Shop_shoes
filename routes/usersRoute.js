// File: routes/usersRoute.js (ĐÃ SỬA LẠI)

var express = require("express");
var router = express.Router();
const AccountController = require("../controllers/AccountController");

// --- SỬA LẠI HOÀN TOÀN ---

// GET / -> Trang chủ (sẽ được gọi bởi http://localhost:5000/)
router.get("/Login", AccountController.Login);
router.get("/Register", AccountController.Register);
router.post("/LoginUser", AccountController.LoginUser);
router.post("/RegisterUser", AccountController.RegisterUser);
module.exports = router;
