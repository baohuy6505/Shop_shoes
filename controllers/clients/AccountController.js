const User = require("../../models/userModel");

class AccountController {
  async Login(req, res) {
    return res.render("clients/account/login");
   }
  async Register(req, res) {
    return res.render("clients/account/register.hbs");
  }
  
  async RegisterUser(req, res) {
    try {
      const { username, email, password } = req.body;
      const newUser = new User({ username, email, password });
        const checkEmail = await User.findOne({ email });
        if (checkEmail) {
            req.flash("error", "Email đã được sử dụng.");
            return res.redirect("/Account/Register");
        }
      await newUser.save();
      req.flash("success", "Đăng kí thành công!");
      return res.redirect("/Account/Login");
    } catch (error) {
      console.error("Lỗi đăng kí:", error);
      req.flash("error", "Đăng kí thất bại: " + error.message);
      return res.redirect("/Account/Register");
    }
  }
  async LoginUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        req.flash("error", "Email không tồn tại.");
        return res.redirect("/Login");
      }
      const checkPassword = await user.comparePassword(password);
      if (!checkPassword) {
        req.flash("error", "Mật khẩu không đúng.");
        return res.redirect("/Login");
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
      return res.redirect("/Login");
    }
  }

  async Logout(req, res) {
    req.session.destroy((err) => {  //hủy session trên server 
      if (err) {
        console.error("Lỗi đăng xuất:", err);
        req.flash("error", "Đăng xuất thất bại.");
        return res.redirect("/");
      }
      res.clearCookie("connect.sid");
      return res.redirect("/Account/Login");
    });
  }
}

module.exports = new AccountController();
