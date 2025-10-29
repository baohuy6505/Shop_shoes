const User = require("../models/userModel");

class AccountController {
  async Login(req, res) {
    return res.render("../views/account/login.hbs");
   }
  async Register(req, res) {
    return res.render("../views/account/register.hbs");
  }
  
  async RegisterUser(req, res) {
    try {
      const { username, email, password } = req.body;
      const newUser = new User({ username, email, password });
        const checkEmail = await User.findOne({ email });
        if (checkEmail) {
            req.flash("error", "Email đã được sử dụng.");
            return res.redirect("/register");
        }
      await newUser.save();
      req.flash("success", "Đăng kí thành công!");
      return res.redirect("/login");
    } catch (error) {
      console.error("Lỗi đăng kí:", error);
      req.flash("error", "Đăng kí thất bại: " + error.message);
      return res.redirect("/register");
    }
  }
  async LoginUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        req.flash("error", "Email không tồn tại.");
        return res.redirect("/login");
      }
      const checkPassword = await user.comparePassword(password);
      if (!checkPassword) {
        req.flash("error", "Mật khẩu không đúng.");
        return res.redirect("/login");
      }
      req.session.user = {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      };
      req.flash("success", "Đăng nhập thành công!");
      return res.redirect("/");
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      req.flash("error", "Đăng nhập thất bại: " + error.message);
      return res.redirect("/login");
    }
  }
}

module.exports = new AccountController();
