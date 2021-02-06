const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxLength: 50
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1
  },
  password: {
    type: String
  },
  provider: {
    type: Number,
    default: 0
  },
  role: {
    type: Number,
    default: 1
  },
  image: {
    type: String
  },
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;