const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRouter = require("./routes/auth.routes");
const incomeRouter = require("./routes/income.routes");
const expenseRouter = require("./routes/expense.routes");
const dashboardRouter = require("./routes/dashboard.routes");
const taxRouter = require("./routes/tax.routes");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/income", incomeRouter);
app.use("/api/expenses", expenseRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/tax", taxRouter);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "TaxPal API is running" });
});

module.exports = app;
