const express = require("express");
const router = express.Router();

const usersRouter = require("./usersRoute");
const productsRouter = require("./productRoute");
const categoryRouter = require("./categoryRoute");
router.use("/users", usersRouter);
router.use("/product", productsRouter);
router.use("/category", categoryRouter);

module.exports = router;
