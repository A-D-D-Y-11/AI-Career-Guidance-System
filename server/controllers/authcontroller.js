// server/controllers/authController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { z } = require('zod');

// Validation schema for registration
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

// Validation schema for login
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});


const registerUser = async (req, res) => {
  // 1. Validate the incoming data
  const validation = registerSchema.safeParse(req.body);
  if (!validation.success) {
    // If validation fails, send back the errors
    return res.status(400).json({ message: validation.error.errors[0].message });
  }

  const { name, email, password } = validation.data;

  try {
    // 2. Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 3. Create new user and hash password
    user = new User({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    // 4. Create and return JWT
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token });

  } catch (err) {
    console.error("REGISTER ERROR:", err.message);
    res.status(500).send('Server error');
  }
};


const loginUser = async (req, res) => {
  // 1. Validate the incoming data
  const validation = loginSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ message: validation.error.errors[0].message });
  }

  const { email, password } = validation.data;

  try {
    // 2. Check for user and password
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // 3. Create and return JWT
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });

  } catch (err) {
    console.error("LOGIN ERROR:", err.message);
    res.status(500).send('Server error');
  }
};

module.exports = { registerUser, loginUser };