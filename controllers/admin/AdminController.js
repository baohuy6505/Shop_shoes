class AdminController {
    async index(req, res) {
      return res.render("../views/admin/admin.hbs", {
        layout: "adminLayout.hbs",
      });
  }
}

module.exports = new AdminController();
