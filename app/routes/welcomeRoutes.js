const express = require("express");
const router = express.Router();

const welcome_controller = require("../controllers/welcomeController");

router.get("/welcome", welcome_controller.read_welcome);

module.exports = router
