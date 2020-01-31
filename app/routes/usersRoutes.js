const express = require("express");
const router = express.Router();

const users_controller = require("../controllers/usersController");

router.post("/users/create", users_controller.create_user);

// router.get("/users/:username", users_controller.read_one_user);
router.post("/users/login", users_controller.read_login);

module.exports = router;
