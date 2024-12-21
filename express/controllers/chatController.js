const Chat = require('../models/Chat');
const User = require('../models/User');

// Create a new chat room
exports.createChatRoom = async (req, res) => {
  const { participants } = req.body;

  try {
    if (participants.length < 2) {
      return res.status(400).json({ msg: 'At least two participants required' });
    }

    const chat = new Chat({
      participants,
    });

    await chat.save();
    res.status(201).json(chat);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Send a message
exports.sendMessage = async (req, res) => {
  const { chatId, message } = req.body;

  try {
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ msg: 'Chat not found' });
    }

    const newMessage = {
      senderId: req.user.id,
      message,
    };

    chat.messages.push(newMessage);
    await chat.save();

    res.status(201).json(newMessage);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get chat messages
exports.getChatMessages = async (req, res) => {
  const { chatId } = req.params;

  try {
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ msg: 'Chat not found' });
    }

    res.json(chat.messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
