// src/pages/ProfilePage.jsx

import React, { useState, useEffect } from 'react';
import api from '../api';
import { Container, Typography, CircularProgress, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // You'll need to install this icon package

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        setError('Failed to fetch profile data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error" align="center" sx={{ mt: 5 }}>
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user.name}
      </Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Your Search History
      </Typography>

      <Box sx={{ mt: 3 }}>
        {user.searchHistory && user.searchHistory.length > 0 ? (
          // Reverse the array to show the most recent search first
          [...user.searchHistory].reverse().map((item, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  Search on {new Date(item.date).toLocaleDateString()} for interest: <strong>{item.interest}</strong>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="subtitle2" gutterBottom>Goals: {item.goals || 'Not specified'}</Typography>
                <Typography component="div">
                  <ul>
                    {item.suggestions.map((suggestion, sIndex) => (
                      <li key={sIndex}>{suggestion}</li>
                    ))}
                  </ul>
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Typography>You have no search history yet.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default ProfilePage;