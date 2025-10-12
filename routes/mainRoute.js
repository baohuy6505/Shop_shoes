const express = require("express");
const router = express.Router();

const usersRouter = require("./usersRoute");

router.use("/users", usersRouter);

module.exports = router;
