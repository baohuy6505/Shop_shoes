const Category = require("../models/categoryModel");
const Product = require("../models/productModel");

class HomeController {
    async index(req, res) { 
        return res.render("../views/home/index.hbs");
    }
}

module.exports = new HomeController();
