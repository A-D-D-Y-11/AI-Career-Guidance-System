const express = require('express');
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/", verifyToken, async (req, res) => {
  try {
    const { interest, goals } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // --- UPDATED PROMPT ---
    // This prompt asks for a structured JSON object with categories
    const prompt = `Act as an expert career counselor. A user has a primary interest in "${interest}" and their goals are "${goals}". 
    Provide a list of 5 suitable career suggestions.
    For each suggestion, provide a career title, a concise one-sentence description, and a category from this list: 'Tech', 'Creative', 'Business', 'Healthcare', 'Education', 'Other'.
    Format the entire response ONLY as a valid JSON object with a single key "suggestions" which holds an array of objects, like this:
    {"suggestions": [{"title": "Software Developer", "description": "Create applications...", "category": "Tech"}]}`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    const jsonText = response.text().replace(/```json/g, '').replace(/```/g, '').trim();
    const suggestionsObject = JSON.parse(jsonText);

    res.json(suggestionsObject);

  } catch (err) {
    console.error("GEMINI / CAREER ROUTE ERROR:", err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
