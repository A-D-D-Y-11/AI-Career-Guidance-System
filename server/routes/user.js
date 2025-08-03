// server/routes/user.js

const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');

// @route   GET api/user/profile
// @desc    Get current user's profile data (including history)
// @access  Private
router.get('/profile', verifyToken, getUserProfile);

module.exports = router;