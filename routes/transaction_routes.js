const { Router } = require("express");
const {
  getTransaction,
  saveTransaction,
  updateTransaction,
  deleteTransaction,
  getReport,
} = require("../controllers/transaction_controller");

const { authenticateToken } = require("../middleware/authenticateToken");
const router = Router();

router.get("/", authenticateToken, getTransaction);
router.post("/save", authenticateToken, saveTransaction);
router.post("/update", authenticateToken, updateTransaction);
router.post("/delete", authenticateToken, deleteTransaction);
router.get("/report", authenticateToken, getReport);

module.exports = router;
