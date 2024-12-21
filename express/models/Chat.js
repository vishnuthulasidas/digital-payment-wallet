const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatSchema = new Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  
    required: true
  }],
  messages: [{
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  
      required: true
    },
    message: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now 
    }
  }],
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


const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
