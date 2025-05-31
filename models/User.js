const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['patient', 'doctor','admin'],
    required: true
  },
  status: {
  type: String,
  enum: ['pending', 'approved', 'rejected'],
  default: 'pending'
},
identityDoc: {
  type: String, 
  required: true
},
rejectionReason: {
  type: String,
  default: ''
}
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
