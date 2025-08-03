// backend/server.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');  

// Load environment variables
dotenv.config({ path: './.env' });  
// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors());
app.use(express.json());

// Basic route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});

// --- Define API Routes ---
app.use('/api/auth', require('./routes/auth')); // Handles login and registration
app.use('/api/career', require('./routes/career')); // Handles protected career form submissions
app.use('/api/user', require('./routes/user'));
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});