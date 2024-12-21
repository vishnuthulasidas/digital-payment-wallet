const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

const {selfTransfer} = require('../controllers/transferController');

// Route to transfer money
router.post('/self-transfer', authMiddleware, selfTransfer);

module.exports = router;