const ExpenseModel = require("../models/expense.model");

async function createExpense(req, res) {
  try {
    const { amount, description, category, date, isTaxDeductible } = req.body;
    const expense = await ExpenseModel.create({
      userId: req.userId,
      amount,
      description: description || "",
      category: category || "Other",
      date: date ? new Date(date) : new Date(),
      isTaxDeductible: isTaxDeductible !== false,
    });
    return res.status(201).json({
      expense,
      message: "Expense added successfully",
      status: "success",
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message || "Failed to add expense",
      status: "failed",
    });
  }
}

async function getExpenses(req, res) {
  try {
    const { startDate, endDate, category, limit = 100, skip = 0 } = req.query;
    const filter = { userId: req.userId };

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }
    if (category) filter.category = category;

    const expenses = await ExpenseModel.find(filter)
      .sort({ date: -1 })
      .limit(Number(limit))
      .skip(Number(skip))
      .lean();

    const total = await ExpenseModel.countDocuments(filter);

    return res.status(200).json({
      expenses,
      total,
      status: "success",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Failed to fetch expenses",
      status: "failed",
    });
  }
}

async function getExpenseById(req, res) {
  try {
    const expense = await ExpenseModel.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
        status: "failed",
      });
    }

    return res.status(200).json({ expense, status: "success" });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Failed to fetch expense",
      status: "failed",
    });
  }
}

async function updateExpense(req, res) {
  try {
    const expense = await ExpenseModel.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
        status: "failed",
      });
    }

    return res.status(200).json({
      expense,
      message: "Expense updated successfully",
      status: "success",
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message || "Failed to update expense",
      status: "failed",
    });
  }
}

async function deleteExpense(req, res) {
  try {
    const expense = await ExpenseModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
        status: "failed",
      });
    }

    return res.status(200).json({
      message: "Expense deleted successfully",
      status: "success",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Failed to delete expense",
      status: "failed",
    });
  }
}

module.exports = {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
};
