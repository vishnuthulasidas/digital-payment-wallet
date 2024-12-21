const express = require('express');
const { createWallet, getUserWallets, getWalletBalance,deleteWallet } = require('../controllers/walletController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Route to create a new wallet
router.post('/new', authMiddleware, createWallet);

// Route to get all wallets for a user
router.get('/all', authMiddleware, getUserWallets);

// Route to get balance of a specific wallet
router.get('/:walletId/balance', authMiddleware, getWalletBalance);

// Route to delete a wallet
router.delete('/:walletId', authMiddleware, deleteWallet);

module.exports = router;
