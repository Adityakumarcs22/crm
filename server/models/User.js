const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String },
  role: { type: String, default: 'User' },
  phone: { type: String },
  address: { type: String },
  joined: { type: Date, default: Date.now },
  password: { type: String, required: true }, // For future authentication
});

module.exports = mongoose.model('User', userSchema);
