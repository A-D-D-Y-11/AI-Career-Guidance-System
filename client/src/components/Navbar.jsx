import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box 
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SchoolIcon from '@mui/icons-material/School'; // Icon for the brand

// Create a dark theme instance with the "Blue Eclipse" color palette
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8686AC', // Light purple from your palette
    },
    background: {
      default: '#0F0E47', // Deepest blue
      paper: '#272757',   // Dark blue for the navbar
    },
    text: {
      primary: '#ffffff',
    }
  },
});

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar 
        position="static" 
        elevation={4} 
        sx={{ backgroundColor: 'background.paper' }}
      >
        <Toolbar>
          {/* Site Title and Icon */}
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <SchoolIcon sx={{ mr: 1.5 }} />
            <Typography 
              variant="h6" 
              component={Link} 
              to={token ? "/dashboard" : "/"}
              sx={{ 
                textDecoration: 'none', 
                color: 'inherit',
                fontWeight: 'bold',
              }}
            >
              AI Career Guidance
            </Typography>
          </Box>

          {/* Conditional Buttons */}
          {token ? (
            // If logged in, show Profile and Logout buttons
            <>
              <Button 
                color="inherit" 
                component={Link} 
                to="/profile"
                sx={{ fontWeight: 'bold' }}
              >
                Profile
              </Button>
              <Button 
                color="inherit" 
                onClick={handleLogout}
                sx={{ fontWeight: 'bold' }}
              >
                Logout
              </Button>
            </>
          ) : (
            // If logged out, show Login button
            <Button 
              color="inherit" 
              component={Link} 
              to="/login"
              sx={{ fontWeight: 'bold' }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
