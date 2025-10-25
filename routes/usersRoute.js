var express = require("express");
var router = express.Router();
const UserController = require("../controllers/UserController");

router.get("/", UserController.index);
router.get("/admin", UserController.admin);
module.exports = router;
