const User = require("../../models/userModel");

class UserController {
  // [GET] /admin/users/create
  // Hiển thị form thêm mới
  async create(req, res, next) {
    try {
      // Truyền danh sách Role cứng vào view
      const roles = ["admin", "manager", "user"];

      res.render("admin/user/add", {
        layout: "adminLayout", // Đảm bảo bạn có file views/layouts/adminLayout.hbs
        roles: roles,
      });
    } catch (error) {
      next(error);
    }
  }

  // [POST] /admin/users/store
  // Xử lý lưu dữ liệu từ form
  async store(req, res, next) {
    try {
      const { username, email, password, role } = req.body;

      // 1. Kiểm tra email tồn tại
      const userExists = await User.findOne({ email });
      if (userExists) {
        req.flash("error", "Email đã tồn tại!"); // Thông báo lỗi nếu trùng email
        return res.redirect("/admin/users/create");
      }

      // 2. Tạo user mới
      // Password sẽ tự động được hash nhờ pre-save hook trong Model
      const newUser = new User({
        username,
        email,
        password,
        role,
      });

      await newUser.save();

      // 3. Thông báo thành công
      req.flash("success", "Thêm tài khoản thành công!");

      // 4. Quay về trang danh sách
      res.redirect("/admin/users");
    } catch (error) {
      console.error(error);
      req.flash("error", "Đã xảy ra lỗi: " + error.message);
      next(error);
    }
  }

  // [GET] /admin/users
  // Hiển thị danh sách user
  async index(req, res, next) {
    try {
      const users = await User.find({}).lean();
      res.render("admin/user/list", {
        // Đảm bảo bạn có file view này
        layout: "adminLayout",
        users,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
