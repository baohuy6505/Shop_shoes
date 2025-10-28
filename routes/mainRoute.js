const express = require("express");
const router = express.Router();

const usersRouter = require("./usersRoute");
const productsRouter = require("./productRoute");
const categoryRouter = require("./categoryRoute");
const productVariantRoutes = require("./productvariantsRoute");
router.use("/users", usersRouter);
router.use("/admin", usersRouter);
router.use("/product", productsRouter);
router.use("/category", categoryRouter);
router.use("/variant", productVariantRoutes);

module.exports = router;
