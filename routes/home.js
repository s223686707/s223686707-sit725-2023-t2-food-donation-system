// routes/home.js
const express = require("express");
const router = express.Router();
const homeController = require("../controller/homeController");

// Define routes using controller functions
router.get("/", homeController.getWelcomePage);

router.get("/home/about-us", homeController.getAboutUsPage);

router.get("/home/mission", homeController.getMissionPage);

router.get("/home/contact-us", homeController.getContactUsPage);

module.exports = router;
