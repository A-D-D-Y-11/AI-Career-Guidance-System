import React, { useState } from 'react';
import api from '../api';
import { 
  CircularProgress, 
  Card, 
  CardContent, 
  Typography,
  Grow,
  Box, // Import Box for layout
  ListItemIcon // Import ListItemIcon for the icon
} from '@mui/material'; 

// 1. Import the icons we'll need
import ComputerIcon from '@mui/icons-material/Computer'; // For Tech
import PaletteIcon from '@mui/icons-material/Palette';   // For Creative
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'; // For Business
import SchoolIcon from '@mui/icons-material/School';     // For Education
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'; // For Healthcare
import WorkIcon from '@mui/icons-material/Work';         // For Other

// 2. Helper component to map category to an icon
const CategoryIcon = ({ category }) => {
  switch (category?.toLowerCase()) {
    case 'tech':
      return <ComputerIcon color="primary" />;
    case 'creative':
      return <PaletteIcon color="primary" />;
    case 'business':
      return <BusinessCenterIcon color="primary" />;
    case 'healthcare':
      return <LocalHospitalIcon color="primary" />;
    case 'education':
      return <SchoolIcon color="primary" />;
    default:
      return <WorkIcon color="primary" />;
  }
};

const CareerForm = () => {
  const [formData, setFormData] = useState({ interest: '', goals: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setSuggestions([]);
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("🔒 Error: No token found. Please log in again.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await api.post(
        "/career", 
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setMessage("✅ Here are your career suggestions!");
      setSuggestions(res.data.suggestions);

    } catch (error) {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
      setMessage(`❌ Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
          Career Interest Form
        </Typography>
        
        <div>
          <label htmlFor="interest" style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem' }}>Your Primary Interest</label>
          <input
            id="interest"
            name="interest"
            value={formData.interest}
            onChange={handleChange}
            placeholder="e.g., Technology, Arts, Business"
            required
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', background: '#fff', color: '#000' }}
          />
        </div>

        <div>
          <label htmlFor="goals" style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem' }}>Describe your career goals</label>
          <textarea
            id="goals"
            name="goals"
            value={formData.goals}
            onChange={handleChange}
            placeholder="What do you want to achieve in your career?"
            rows="4"
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', background: '#fff', color: '#000' }}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            padding: '10px 16px', 
            borderRadius: '4px', 
            border: 'none', 
            background: '#505081', 
            color: 'white', 
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1rem',
          }}
        >
          {isLoading ? (
            <>
              <CircularProgress size={20} color="inherit" />
              <span style={{ marginLeft: '8px' }}>Thinking...</span>
            </>
          ) : (
            'Get Career Advice'
          )}
        </button>
      </form>

      {message && (
        <div style={{ marginTop: '24px' }}>
          <p style={{ textAlign: 'center', fontWeight: 'bold', color: message.includes('Error') ? '#f44336' : '#4caf50' }}>
            {message}
          </p>
          
          {suggestions.length > 0 && (
            <div style={{ marginTop: '16px' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Recommended Careers:</Typography>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {suggestions.map((suggestion, index) => (
                  <Grow in={true} style={{ transformOrigin: '0 0 0' }} {...{ timeout: 500 * (index + 1) }}>
                    <Card key={index} variant="outlined" sx={{ backgroundColor: '#f5f5f5', color: '#000' }}>
                      <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                        {/* 3. Add the icon to the card */}
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <CategoryIcon category={suggestion.category} />
                        </ListItemIcon>
                        <Box>
                          <Typography variant="h6" component="div">
                            {suggestion.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {suggestion.description}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grow>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CareerForm;
