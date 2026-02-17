const express = require("express")
const authController = require("../controllers/auth.controller")
const { protectRoute } = require("../middleware/auth.middleware")
const router = express.Router()

router.post("/register", authController.userRegisterController)
router.post("/login", authController.userLoginController)
router.get("/me", protectRoute, authController.getMe)
router.patch("/me", protectRoute, authController.updateProfile)

module.exports = router