const Category = require("../../models/categoryModel");
const Product = require("../../models/productModel");

class HomeController {
    async index(req, res) { 
        return res.render("clients/index");
    }
}

module.exports = new HomeController();
