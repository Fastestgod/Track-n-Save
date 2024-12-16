const { Router } = require("express");
const {
  getTransaction,
  saveTransaction,
  updateTransaction,
  deleteTransaction,
  getReport,
} = require("../controllers/transaction_controller");

const router = Router();

router.get("/", getTransaction);
router.post("/save", saveTransaction);
router.post("/update", updateTransaction);
router.post("/delete", deleteTransaction);
router.get("/report", getReport);
module.exports = router;
