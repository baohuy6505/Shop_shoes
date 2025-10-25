// định nghĩa url liên quan đến product
var express = require("express");
var router = express.Router();
const ProductController = require("../controllers/ProductController");
router.get("/product", ProductController.product);
router.post("/createProduct", ProductController.create);
module.exports = router;
