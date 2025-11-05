const User = require("../../models/UserModel");

const RoleController = {
  // Hiển thị danh sách user và quyền
  index: async (req, res) => {
    try {
      const users = await User.find().lean(); // lấy tất cả user
      res.render("admin/roleList", { users, layout: "adminLayout" });
    } catch (err) {
      console.error(err);
      res.status(500).send("Lỗi khi tải danh sách người dùng");
    }
  },

  // Cập nhật quyền user
  updateRole: async (req, res) => {
    const { userId, role } = req.body;

    try {
      // không cho phép tự hạ quyền admin cuối cùng
      const user = await User.findById(userId);
      if (!user) {
        req.flash("error", "Không tìm thấy người dùng");
        return res.redirect("/admin/role");
      }

      // Nếu là manager thì không thể cấp quyền admin
      if (req.session.user.role === "manager" && role === "admin") {
        req.flash("error", "Bạn không có quyền cấp quyền admin!");
        return res.redirect("/admin/role");
      }

      user.role = role;
      await user.save();

      req.flash("success", `Cập nhật quyền thành công cho ${user.username}`);
      res.redirect("/admin/role");
    } catch (err) {
      console.error(err);
      req.flash("error", "Lỗi khi cập nhật quyền người dùng");
      res.redirect("/admin/role");
    }
  },
};

module.exports = RoleController;
