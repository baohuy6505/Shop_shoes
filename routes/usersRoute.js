var express = require("express");
var router = express.Router();
const UserController = require("../controllers/UserController");

router.get("/", UserController.admin);
router.get("/users", UserController.admin);
module.exports = router;
