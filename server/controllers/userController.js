// server/controllers/userController.js

const User = require('../models/User');

const getUserProfile = async (req, res) => {
  try {
    // req.user.id is attached by the verifyToken middleware
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error("GET USER PROFILE ERROR:", err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = { getUserProfile };