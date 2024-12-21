const Transaction = require('../models/Transaction');
const Wallet = require('../models/Wallet');
const User = require('../models/User');

// Create a transaction
exports.createTransaction = async (req, res) => {
  const { receiverUsername } = req.body;
  let { amount } = req.body;
  amount = parseFloat(amount);

  try {
    const receiver = await User.findOne({ username: receiverUsername });

    if (!receiver) {
      return res.status(404).json({ msg: 'Invalid receiver username' });
    }

    const senderWallet = await Wallet.findOne({ userId: req.user.id, isPrimary: true });
    const receiverWallet = await Wallet.findOne({ userId: receiver._id, isPrimary: true });

    if (!senderWallet || senderWallet.balance < amount) {
      return res.status(400).json({ msg: 'Insufficient funds in Primary Wallet' });
    }

    const transaction = new Transaction({
      senderId: req.user.id,
      receiverId: receiver._id,
      amount,
      senderWalletId: senderWallet._id,
      receiverWalletId: receiverWallet._id,
      transactionType: 'send',
      status: 'completed',
    });

    senderWallet.balance -= amount;
    receiverWallet.balance += amount;

    await senderWallet.save();
    await receiverWallet.save();
    await transaction.save();

    res.status(201).json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};


exports.getUserTransactions = async (req, res) => {
  try {
    let transactions = await Transaction.find({
      $or: [{ senderId: req.user.id }, { receiverId: req.user.id }],
    })
    .populate('senderId', 'name')
    .populate('receiverId', 'name')
    .sort({ createdAt: -1 });

    // filter transactions and add type if i send or receive
    transactions.forEach(transaction => {
      if (transaction.senderId._id.equals(req.user.id)) {
        transaction._doc.type = 'send';
      } else {
        transaction._doc.type = 'receive';
      }
    });
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
