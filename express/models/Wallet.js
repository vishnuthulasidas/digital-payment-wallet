const mongoose = require('mongoose');
const { Schema } = mongoose;

const walletSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: [50, 'Wallet name should be at most 50 characters long']
  },
  balance: {
    type: Number,
    required: true,
    default: 0.0 
  },
  isPrimary: {
    type: Boolean,
    required: true,
    default: false 
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


const Wallet = mongoose.model('Wallet', walletSchema);

module.exports = Wallet;
