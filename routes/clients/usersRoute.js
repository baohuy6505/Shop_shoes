// File: routes/usersRoute.js (ĐÃ SỬA LẠI)

var express = require("express");
var router = express.Router();
const AccountController = require("../../controllers/clients/AccountController");
const { requireLogOut } = require("../../middlewares/authMiddleware");
// --- SỬA LẠI HOÀN TOÀN ---

// GET / -> Trang chủ (sẽ được gọi bởi http://localhost:5000/)
router.use(requireLogOut); // chỉ cho phép truy cập khi chưa đăng nhập
router.post("/SubmitForm", AccountController.SubmitForm.bind(AccountController));
router.get("/Login", AccountController.Login);
router.get("/Register", AccountController.Register);
router.post("/LoginUser", AccountController.LoginUser);
router.post("/RegisterUser", AccountController.RegisterUser);
module.exports = router;
