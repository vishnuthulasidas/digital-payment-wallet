const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionSchema = new Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: [0, 'Amount must be greater than 0'] 
  },
  status: {
    type: String,
    enum: ['completed', 'pending', 'failed'],  
    required: true,
    default: 'pending' 
  },
  transactionType: {
    type: String,
    enum: ['send','self transfer'], 
    required: true
  },
  senderWalletId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wallet',  
    required: true
  },
  receiverWalletId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wallet', 
    required: true
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


const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
