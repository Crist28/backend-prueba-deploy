const { Router } = require("express");

const userController = require("../controllers/ControllerUser");

const router = Router();

router.post("/register_user", userController.register_user);
router.post("/login_user", userController.login_user);

module.exports = router;