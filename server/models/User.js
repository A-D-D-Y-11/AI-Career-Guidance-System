// server/models/User.js

const mongoose = require('mongoose');

const SearchHistorySchema = new mongoose.Schema({
  interest: { type: String, required: true },
  goals: { type: String },
  suggestions: { type: [String], required: true },
  date: { type: Date, default: Date.now }
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false,
  },
  // 👇 ADD THIS searchHistory field 👇
  searchHistory: [SearchHistorySchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);