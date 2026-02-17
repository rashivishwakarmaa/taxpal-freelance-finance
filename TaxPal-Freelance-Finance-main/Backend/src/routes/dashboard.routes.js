const express = require("express");
const dashboardController = require("../controllers/dashboard.controller");
const { protectRoute } = require("../middleware/auth.middleware");

const router = express.Router();

router.use(protectRoute);
router.get("/stats", dashboardController.getStats);

module.exports = router;
