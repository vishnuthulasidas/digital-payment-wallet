const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, 'Name should be at least 3 characters long'],
    maxlength: [30, 'Name should be at most 30 characters long']
  },

  username: {
    type: String,
    required: true,
    unique: true,  
    trim: true, 
    minlength: [3, 'Username should be at least 3 characters long'],
    maxlength: [30, 'Username should be at most 30 characters long']
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address'] 
  },
  
  phone: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{10}$/, 'Please use a valid phone number']
  },
  passwordHash: {
    type: String,
    required: true
  },
  profilePic: {
    type: String,
    default: ''
  },
  primaryWalletId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wallet',
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

userSchema.pre('save', function (next) {
  if (!this.profilePic) {
    const encodedName = encodeURIComponent(this.name || 'User'); // Ensure the name is URL-safe
    this.profilePic = `https://ui-avatars.com/api/?background=143458&color=fff&name=${encodedName}`;
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
