const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Wallet = require('../models/Wallet');
const config = require('../config/env');

// Register a new user
exports.registerUser = async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    // Check if email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ msg: 'Email or Phone already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const username = `${phone}@ezpay`;

    // Create new user
    const newUser = new User({
      name,
      username,
      email,
      phone,
      passwordHash: hashedPassword,
    });

    // Save to DB
    await newUser.save();

    // Create a primary wallet for the new user
    const wallet = new Wallet({
      userId: newUser._id,
      name: 'Primary Wallet',
      isPrimary: true,
      balance: 1000.00, // first time user gets 1000.00
    });

    await wallet.save();

    // Link wallet to the user
    newUser.primaryWalletId = wallet._id;
    await newUser.save();

    res.status(201).json({ msg:"register successfull" });

  } catch (err) {
    console.error('Error during registration: ', err);
    res.status(500).json({ msg: err });
  }
};

// Login a user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = { user: { id: user._id } };
    const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '6h' });
    console.log("login successfull")
    res.status(200).json({ token });
  } catch (err) {
    console.error('Error during login: ', err);
    res.status(500).json({ msg: 'Server error' });
  }
};
