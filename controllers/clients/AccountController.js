const User = require("../../models/userModel");

class AccountController {
  // Hiển thị trang đăng nhập
  async Login(req, res) {
    return res.render("clients/account/login");
  }

  // Hiển thị trang đăng ký
  async Register(req, res) {
    return res.render("clients/account/register"); // Bỏ .hbs đi cho chuẩn
  }

  // [POST] Xử lý đăng nhập
  async LoginUser(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        req.flash("error", "Email không tồn tại.");
        return res.redirect("/Account/Login");
      }

      const checkPassword = await user.comparePassword(password);
      if (!checkPassword) {
        req.flash("error", "Mật khẩu không đúng.");
        return res.redirect("/Account/Login");
      }

      // Lưu session
      req.session.user = {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      };

      req.flash("success", "Đăng nhập thành công!");

      // Chuyển hướng theo role
      if (user.role === "admin" || user.role === "manager") {
        return res.redirect("/Admin/Home");
      }

      // user thường
      return res.redirect("/");
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      req.flash("error", "Đăng nhập thất bại: " + error.message);
      return res.redirect("/Account/Login");
    }
  }

  // [POST] Xử lý Đăng Ký (BẠN ĐANG THIẾU HÀM NÀY)
  async RegisterUser(req, res) {
    try {
      const { username, email, password, confirmPassword } = req.body;

      // 1. Kiểm tra xác nhận mật khẩu (nếu form có field này)
      // if (password !== confirmPassword) {
      //   req.flash("error", "Mật khẩu xác nhận không khớp.");
      //   return res.redirect("/Account/Register");
      // }

      // 2. Kiểm tra email tồn tại
      const userExists = await User.findOne({ email });
      if (userExists) {
        req.flash("error", "Email này đã được sử dụng.");
        return res.redirect("/Account/Register");
      }

      // 3. Tạo user mới (Mặc định role là user do Model quy định)
      // Password sẽ tự hash do pre('save') trong model
      const newUser = new User({
        username,
        email,
        password,
        role: "user",
      });

      await newUser.save();

      req.flash("success", "Đăng ký thành công! Vui lòng đăng nhập.");
      return res.redirect("/Account/Login");
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      req.flash("error", "Đăng ký thất bại: " + error.message);
      return res.redirect("/Account/Register");
    }
  }

  // Đăng xuất (BẠN ĐANG THIẾU HÀM NÀY)
  Logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        return res.redirect("/");
      }
      res.clearCookie("connect.sid"); // Tên cookie mặc định của express-session
      res.redirect("/Account/Login");
    });
  }
}

module.exports = new AccountController();
