class UserController {
  index(req, res) {
    res.render("../views/index.hbs");
  }
  admin(req, res) {
    res.render("../views/admin/admin.hbs");
  }
}
module.exports = new UserController();
