const Wallet = require('../models/Wallet');
const User = require('../models/User');

// Create a new wallet
exports.createWallet = async (req, res) => {
  const { name } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const existingWallet = await Wallet.findOne({ userId: user._id, name });
    if (existingWallet) {
      return res.status(400).json({ msg: 'Wallet with this name already exists' });
    }

    const newWallet = new Wallet({
      userId: user._id,
      name,
      isPrimary: false,
      balance: 0.00,
    });

    await newWallet.save();
    res.status(201).json(newWallet);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get all wallets for a user
exports.getUserWallets = async (req, res) => {
  try {
    const wallets = await Wallet.find({ userId: req.user.id });
    if (!wallets) {
      return res.status(404).json({ msg: 'No wallets found' });
    }
    res.json(wallets);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get wallet balance
exports.getWalletBalance = async (req, res) => {
  const walletId = req.params.walletId;

  try {
    const wallet = await Wallet.findById(walletId);
    if (!wallet) {
      return res.status(404).json({ msg: 'Wallet not found' });
    }
    res.json({ balance: wallet.balance });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Delete a wallet
exports.deleteWallet = async (req, res) => {
  const walletId = req.params.walletId;

  try {
    const wallet = await Wallet.findById(walletId);
    if (!wallet) {
      return res.status(404).json({ msg: 'Wallet not found' });
    }

    const user = await User.findById(wallet.userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (wallet.balance > 0) {
      const primaryWallet = await Wallet.findById(user.primaryWalletId);
      if (!primaryWallet) {
        return res.status(404).json({ msg: 'Primary wallet not found' });
      }

      primaryWallet.balance += wallet.balance;
      await primaryWallet.save();
    }

    await Wallet.findByIdAndDelete(walletId);
    res.json({ msg: 'Wallet deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};