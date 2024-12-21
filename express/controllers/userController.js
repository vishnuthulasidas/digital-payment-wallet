const User = require('../models/User');

// Get User Profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-passwordHash');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update User Profile
exports.updateUserProfile = async (req, res) => {
  const { username, email } = req.body;

  try {
    const updatedData = {};

    if (username) updatedData.username = username;
    if (email) updatedData.email = email;

    const user = await User.findByIdAndUpdate(req.user.id, updatedData, { new: true }).select('-passwordHash');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// get the user name,prifile pic and id based in username
exports.searchUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select('name profilePic _id username');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  }
  catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
