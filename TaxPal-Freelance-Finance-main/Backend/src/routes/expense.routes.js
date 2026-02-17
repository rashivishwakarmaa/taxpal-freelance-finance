const express = require("express");
const expenseController = require("../controllers/expense.controller");
const { protectRoute } = require("../middleware/auth.middleware");

const router = express.Router();

router.use(protectRoute);

router.post("/", expenseController.createExpense);
router.get("/", expenseController.getExpenses);
router.get("/:id", expenseController.getExpenseById);
router.put("/:id", expenseController.updateExpense);
router.delete("/:id", expenseController.deleteExpense);

module.exports = router;
