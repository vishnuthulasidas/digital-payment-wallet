const express = require('express');
const { createTransaction, getUserTransactions } = require('../controllers/transactionController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Route to create a transaction
router.post('/new', authMiddleware, createTransaction);

// Route to get all transactions for the logged-in user
router.get('/all', authMiddleware, getUserTransactions);

module.exports = router;
