const express = require('express');
const { createChatRoom, sendMessage, getChatMessages } = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Route to create a new chat room
router.post('/room', authMiddleware, createChatRoom);

// Route to send a message in a chat room
router.post('/message', authMiddleware, sendMessage);

// Route to get all messages from a specific chat room
router.get('/:chatId/messages', authMiddleware, getChatMessages);

module.exports = router;
