const express = require("express");
const taxController = require("../controllers/tax.controller");
const { protectRoute } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/countries", taxController.getCountries);
router.use(protectRoute);
router.get("/estimate", taxController.getTaxEstimate);

module.exports = router;
