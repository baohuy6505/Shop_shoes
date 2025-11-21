// File: routes/usersRoute.js (ĐÃ SỬA LẠI)

var express = require("express");
var router = express.Router();
const AccountController = require("../../controllers/clients/AccountController");
const { requireLogOut } = require("../../middlewares/authMiddleware");
// --- SỬA LẠI HOÀN TOÀN ---

// GET / -> Trang chủ (sẽ được gọi bởi http://localhost:5000/)
router.get("/Login",requireLogOut,AccountController.Login);
router.get("/Register",requireLogOut,AccountController.Register);
router.post("/LoginUser",requireLogOut,AccountController.LoginUser);
router.post("/RegisterUser",requireLogOut,AccountController.RegisterUser);
router.get("/Logout", AccountController.Logout);
module.exports = router;
