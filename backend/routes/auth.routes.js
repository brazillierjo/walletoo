const express = require("express");
const authController = require("../controllers/auth.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const router = express.Router();

// USER ROUTES
router.post("/sign-up", authController.signUp);
router.post("/sign-in", authController.signIn);
router.get("/read/:userId", authController.getUser);
router.put("/update/:userId", verifyToken, authController.updateUser);
router.put("/update-password/:userId", verifyToken, authController.updatePassword);
router.delete("/delete/:userId", verifyToken, authController.deleteUser);
router.post("/forget-password", authController.forgetPassword);
router.post("/reset-password/:userId", authController.resetPasword);

module.exports = router;
