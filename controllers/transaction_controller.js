const transactionModel = require("../models/transaction_model");

module.exports.getTransaction = async (req, res) => {
  try {
    const userId = req.user.id;
    const transactions = await transactionModel.find({ userId });

    res.send(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).send("Error fetching transactions.");
  }
};

module.exports.saveTransaction = async (req, res) => {
  if (!req.body) {
    return res.status(400).send("Invalid transaction data");
  }

  const { date, description, category, amount } = req.body;

  if (!date || !description || !category || typeof amount !== "number") {
    return res.status(400).send("Invalid transaction data.");
  }

  try {
    const newTransaction = await transactionModel.create({
      date,
      description,
      category,
      amount,
      userId: req.user.id,
    });
    console.log("Transaction added successfully:", newTransaction);
    res.send(newTransaction);
  } catch (error) {
    console.error("Error saving transaction:", error);
    res.status(500).send("Error saving transaction.");
  }
};

module.exports.updateTransaction = async (req, res) => {
  const { _id, date, description, category, amount } = req.body;

  if (
    !_id ||
    !date ||
    !description ||
    !category ||
    typeof amount !== "number"
  ) {
    return res.status(400).send("Invalid transaction data.");
  }

  try {
    const transaction = await transactionModel.findById(_id);
    if (!transaction) {
      return res.status(404).send("Transaction not found.");
    }

    if (transaction.userId.toString() !== req.user.id) {
      return res.status(403).send("Not authorized to update this transaction.");
    }

    await transactionModel.findByIdAndUpdate(_id, {
      date,
      description,
      category,
      amount,
    });
    res.send("Transaction updated successfully.");
  } catch (error) {
    console.error("Error updating transaction:", error);
    res.status(500).send("Error updating transaction.");
  }
};

module.exports.deleteTransaction = async (req, res) => {
  const { _id } = req.body;

  if (!_id) {
    return res.status(400).send("Invalid transaction ID.");
  }

  try {
    const transaction = await transactionModel.findById(_id);
    if (!transaction) {
      return res.status(404).send("Transaction not found.");
    }

    if (transaction.userId.toString() !== req.user.id) {
      return res.status(403).send("Not authorized to delete this transaction.");
    }

    await transactionModel.findByIdAndDelete(_id);
    res.send("Transaction deleted successfully.");
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).send("Error deleting transaction.");
  }
};

module.exports.getReport = async (req, res) => {
  try {
    const userId = req.user.id;

    const transactions = await transactionModel.find({ userId });

    let totalBalance = transactions
      .filter((t) => t.category.toLowerCase() === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    let totalSpending = transactions
      .filter((t) => t.category.toLowerCase() === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    let totalSavings = transactions
      .filter((t) => t.category.toLowerCase() === "savings")
      .reduce((sum, t) => sum + t.amount, 0);

    let spendingByMonthAndYear = getTotalSpendingByMonthAndYear(transactions);
    let CurrentMonthTotals = getCurrentMonthTotals(transactions);
    res.send({
      totalBalance,
      totalSpending,
      totalSavings,
      spendingByMonthAndYear,
      CurrentMonthTotals,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).send("Error fetching transactions.");
  }
};

function getTotalSpendingByMonthAndYear(transactions) {
  const months = {
    "01": "jan",
    "02": "feb",
    "03": "mar",
    "04": "apr",
    "05": "may",
    "06": "jun",
    "07": "jul",
    "08": "aug",
    "09": "sep",
    10: "oct",
    11: "nov",
    12: "dec",
  };

  const currentYear = new Date().getFullYear();
  const result = {};
  transactions.forEach((t) => {
    const date = new Date(t.date);
    const transactionYear = date.getFullYear();
    if (
      transactionYear === currentYear &&
      t.category.toLowerCase() === "expense"
    ) {
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      if (!result[months[month]]) {
        result[months[month]] = 0;
      }
      result[months[month]] += t.amount;
    }
  });

  return result;
}

function getCurrentMonthTotals(transactions) {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  let totals = {
    income: 0,
    savings: 0,
    expense: 0,
  };

  transactions.forEach((t) => {
    const date = new Date(t.date);
    const transactionYear = date.getFullYear();
    const transactionMonth = date.getMonth();

    if (transactionYear === currentYear && transactionMonth === currentMonth) {
      if (t.category.toLowerCase() === "income") {
        totals.income += t.amount;
      } else if (t.category.toLowerCase() === "savings") {
        totals.savings += t.amount;
      } else if (t.category.toLowerCase() === "expense") {
        totals.expense += t.amount;
      }
    }
  });

  return totals;
}
