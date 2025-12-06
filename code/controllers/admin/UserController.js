const User = require("../../models/userModel");

class UserController {
  // [GET] /admin/users/create
  async create(req, res, next) {
    try {
      const roles = ["admin", "manager", "user"];

      res.render("admin/user/add", {
        layout: "adminLayout",
        roles: roles,
      });
    } catch (error) {
      next(error);
    }
  }

  // [POST] /admin/users/store
  async store(req, res, next) {
    try {
      const { username, email, password, role } = req.body;
      const userExists = await User.findOne({ email });
      if (userExists) {
        req.flash("error", "Email đã tồn tại!");
        return res.redirect("/admin/users/create");
      }
      const newUser = new User({
        username,
        email,
        password,
        role,
      });
      await newUser.save();
      req.flash("success", "Thêm tài khoản thành công!");
      res.redirect("/admin/users");
    } catch (error) {
      console.error(error);
      req.flash("error", "Đã xảy ra lỗi: " + error.message);
      next(error);
    }
  }

  // [GET] /admin/users
  async index(req, res, next) {
    try {
      const users = await User.find({}).lean();
      res.render("admin/user/list", {
        layout: "adminLayout",
        users,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
