const Category = require("../../models/categoryModel");
const Product = require("../../models/productModel");

class HomeController {
    async index(req, res) { 
        const getProducts = await Product.find({})
            .sort({ createdAt: -1 })
            .limit(4)
            .lean();
        return res.render("clients/index", {
            products: getProducts
        });
    }
}

module.exports = new HomeController();
