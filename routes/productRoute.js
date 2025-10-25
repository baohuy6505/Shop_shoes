var express = require("express");
var router = express.Router();
const ProductController = require("../controllers/ProductController");
router.get("/", ProductController.renderProductPage);
router.post("/createProduct", ProductController.createProduct);
router.get("/edit/:id", ProductController.renderEditPage);
router.post("/update/:id", ProductController.updateProduct);
router.post("/delete/:id", ProductController.deleteProduct);
module.exports = router;
