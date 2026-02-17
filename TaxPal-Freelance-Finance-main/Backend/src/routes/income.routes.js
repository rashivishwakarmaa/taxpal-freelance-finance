const express = require("express");
const incomeController = require("../controllers/income.controller");
const { protectRoute } = require("../middleware/auth.middleware");

const router = express.Router();

router.use(protectRoute);

router.post("/", incomeController.createIncome);
router.get("/", incomeController.getIncomes);
router.get("/:id", incomeController.getIncomeById);
router.put("/:id", incomeController.updateIncome);
router.delete("/:id", incomeController.deleteIncome);

module.exports = router;
