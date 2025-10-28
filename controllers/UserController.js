const User = require("../models/userModel");

class UserController {
  // (Hàm 'index' và 'admin' giữ nguyên)
  index(req, res) {
    res.render("index");
  }
  admin(req, res) {
    res.render("../views/admin/admin.hbs");
  }

  async register(req, res) {
    try {
      const { username, email, password, role } = req.body;

      // KHÔNG CẦN MÃ HÓA
      const newUser = new User({
        username,
        email,
        password: password, // <-- Lưu mật khẩu thô
        role: role || "customer",
      });

      await newUser.save();
      res
        .status(201)
        .json({ success: true, message: "Tạo người dùng thành công" });
    } catch (err) {
      if (err.code === 11000) {
        return res
          .status(400)
          .json({ success: false, message: "Email đã tồn tại" });
      }
      res
        .status(500)
        .json({ success: false, message: "Lỗi server: " + err.message });
    }
  }

  /**
   * 4. (POST /login) - API Đăng nhập (So sánh mật khẩu thô)
   */
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // 1. Tìm user VÀ LẤY mật khẩu
      // Phải dùng .select('+password') vì model có 'select: false'
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "Email không tồn tại" });
      }

      // 2. So sánh mật khẩu thô (string vs string)
      if (user.password !== password) {
        return res
          .status(401)
          .json({ success: false, message: "Sai mật khẩu" });
      }

      // 3. Kiểm tra vai trò
      if (user.role !== "admin") {
        return res
          .status(403)
          .json({ success: false, message: "Bạn không có quyền Admin" });
      }

      // 4. KHÔNG TẠO TOKEN
      // Chỉ trả về thông báo thành công.
      // File admin.js của bạn sẽ nhận được cái này và tự chuyển trang
      res.status(200).json({
        success: true,
        message: "Đăng nhập thành công",
        user: { username: user.username, role: user.role },
      });
    } catch (err) {
      res
        .status(500)
        .json({ success: false, message: "Lỗi server: " + err.message });
    }
  }

  /**
   * 5. (GET /api/users) - API lấy danh sách người dùng
   * (Hàm này giữ nguyên, nó vẫn an toàn vì 'select: false'
   * trong model sẽ không trả về mật khẩu)
   */
  async getUsers(req, res) {
    try {
      const users = await User.find().sort({ createdAt: -1 });
      res.status(200).json({ success: true, users: users });
    } catch (err) {
      res
        .status(500)
        .json({ success: false, message: "Lỗi server: " + err.message });
    }
  }
}

module.exports = new UserController();
