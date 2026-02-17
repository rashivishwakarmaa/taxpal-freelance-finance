const IncomeModel = require("../models/income.model");

async function createIncome(req, res) {
  try {
    const { amount, description, category, date, source } = req.body;
    const income = await IncomeModel.create({
      userId: req.userId,
      amount,
      description: description || "",
      category: category || "Other",
      date: date ? new Date(date) : new Date(),
      source,
    });
    return res.status(201).json({
      income,
      message: "Income added successfully",
      status: "success",
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message || "Failed to add income",
      status: "failed",
    });
  }
}

async function getIncomes(req, res) {
  try {
    const { startDate, endDate, category, limit = 100, skip = 0 } = req.query;
    const filter = { userId: req.userId };

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }
    if (category) filter.category = category;

    const incomes = await IncomeModel.find(filter)
      .sort({ date: -1 })
      .limit(Number(limit))
      .skip(Number(skip))
      .lean();

    const total = await IncomeModel.countDocuments(filter);

    return res.status(200).json({
      incomes,
      total,
      status: "success",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Failed to fetch incomes",
      status: "failed",
    });
  }
}

async function getIncomeById(req, res) {
  try {
    const income = await IncomeModel.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!income) {
      return res.status(404).json({
        message: "Income not found",
        status: "failed",
      });
    }

    return res.status(200).json({ income, status: "success" });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Failed to fetch income",
      status: "failed",
    });
  }
}

async function updateIncome(req, res) {
  try {
    const income = await IncomeModel.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!income) {
      return res.status(404).json({
        message: "Income not found",
        status: "failed",
      });
    }

    return res.status(200).json({
      income,
      message: "Income updated successfully",
      status: "success",
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message || "Failed to update income",
      status: "failed",
    });
  }
}

async function deleteIncome(req, res) {
  try {
    const income = await IncomeModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!income) {
      return res.status(404).json({
        message: "Income not found",
        status: "failed",
      });
    }

    return res.status(200).json({
      message: "Income deleted successfully",
      status: "success",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Failed to delete income",
      status: "failed",
    });
  }
}

module.exports = {
  createIncome,
  getIncomes,
  getIncomeById,
  updateIncome,
  deleteIncome,
};
