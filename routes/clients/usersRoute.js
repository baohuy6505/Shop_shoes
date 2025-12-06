// routes/clients/usersRoute.js
var express = require("express");
var router = express.Router();

// Đảm bảo đường dẫn này trỏ đúng tới file Controller vừa sửa ở trên
const AccountController = require("../../controllers/clients/AccountController");
const { requireLogOut } = require("../../middlewares/authMiddleware");

// GET / -> Trang chủ (sẽ được gọi bởi http://localhost:5000/Account/...)

// Hiển thị form
router.get("/Login", requireLogOut, AccountController.Login);
router.get("/Register", requireLogOut, AccountController.Register);

// Xử lý form POST
router.post("/LoginUser", requireLogOut, AccountController.LoginUser);
router.post("/RegisterUser", requireLogOut, AccountController.RegisterUser); // Giờ hàm này đã tồn tại

// Đăng xuất
router.get("/Logout", AccountController.Logout); // Giờ hàm này đã tồn tại

module.exports = router;
