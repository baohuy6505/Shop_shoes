const session = require("express-session");

module.exports = {
  // checkLoginStatus: (req, res, next) => {
  //   if (!req.session.user) { 
  //     req.flash("error", "Vui lòng đăng nhập để thực hiện hành động này.");
  //     return res.redirect("/Account/Login");
  //   }
  //   if (req.session.role === "user") { 
  //     return next();
  //   }
  //     req.flash("error", "Bạn không có quyền truy cập trang này.");
  //     return res.redirect("/Account/Login");
  //  },
  requireLogOut: (req, res, next) => {
    if (req.session.user) {
      req.flash("error", "Bạn đã đăng nhập rồi.");
      return res.redirect("/");
    }
    next();
  },

  requireLogin: (req, res, next) => {
    if (!req.session.user) {
      req.flash("error", "Vui lòng đăng nhập để thực hiện hành động này.");
      return res.redirect("/Account/Login");
    }
    next();
  },

  isAdmin: (req, res, next) => {
    if (!req.session.user || req.session.user.role !== "admin") {
      req.flash("error", "Chỉ admin mới được truy cập trang này.");
      return res.redirect("/");
    }
    next();
  },

  isManagerOrAdmin: (req, res, next) => {
    if (
      !req.session.user ||
      !["admin", "manager"].includes(req.session.user.role)
    ) {
      req.flash(
        "error",
        "Chỉ admin hoặc manager mới được truy cập trang admin."
      );
      return res.redirect("/");
    }
    next();
  },
};
