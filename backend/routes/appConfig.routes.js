const express = require("express");
const appConfigController = require("../controllers/appConfig.controller");
const router = express.Router();

// USER ROUTES
router.get("/read/:userId", appConfigController.getAppConfig);
router.put("/edit/:userId", appConfigController.editAppConfig);
router.post("/create/:userId", appConfigController.createAppConfig);

module.exports = router;
