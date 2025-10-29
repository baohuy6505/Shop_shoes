module.exports = function (req, res, next) {
  if (!req.session.user) {
    req.flash("error", "Vui lòng đăng nhập để thêm vào giỏ hàng.");
    return res.redirect("/Account/Login");
  }
  next();
};
