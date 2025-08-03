 import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Container, 
  Typography,
  Grid // Import Grid for the two-column layout
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// IMPORTANT: Make sure you have created a folder named 'assets' inside your 'src' folder,
// and that your image file 'graduation.jpg' is inside 'src/assets/'.
import graduationImage from '../assets/graduation.jpg'; 

// Create a dark theme instance
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#f06292', // A pinkish color to match the gradient
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h2: {
      fontWeight: 700,
    },
  },
});

const LandingPage = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Box 
        sx={{
          minHeight: '100vh',
          // Use the imported image variable in the backgroundImage property
          backgroundImage: `
            linear-gradient(90deg, rgba(51, 51, 153, 0.9) 0%, rgba(255, 0, 204, 0.8) 100%),
            url(${graduationImage})
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          py: 8,
          px: 2,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={5} alignItems="center">
            {/* Left Column: Main Headline */}
            <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 'bold',
                  letterSpacing: '1px',
                  textShadow: '2px 2px 8px rgba(0,0,0,0.6)',
                }}
              >
                FIND YOUR FUTURE CAREER PATH
              </Typography>
            </Grid>
            
            {/* Right Column: Description and Button */}
            <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography
                variant="h6"
                component="p"
                sx={{
                  mb: 4,
                  color: 'rgba(255, 255, 255, 0.9)',
                }}
              >
                Leverage the power of AI to discover personalized career suggestions based on your unique interests and goals. Stop guessing, start planning.
              </Typography>
              
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/register"
                sx={{
                  py: 1.5,
                  px: 5,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  backgroundColor: 'white',
                  color: '#333399',
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                    transform: 'scale(1.05)',
                  },
                  transition: 'transform 0.2s ease-in-out',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                }}
              >
                GET STARTED
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default LandingPage;
