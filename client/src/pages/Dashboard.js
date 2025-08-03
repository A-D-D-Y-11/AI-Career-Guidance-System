import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CareerForm from '../components/CareerForm';
import { 
  Box, 
  Container, 
  CssBaseline, 
  Typography, 
  Paper,
  Grid,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Button,
  Avatar
} from '@mui/material';
import { createTheme, ThemeProvider, keyframes } from '@mui/material/styles';
import api from '../api';
import HistoryIcon from '@mui/icons-material/History';

// --- UI Enhancements ---

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8686AC',
    },
    background: {
      default: '#0F0E47',
      paper: 'rgba(39, 39, 87, 0.6)',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0d0',
    }
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h4: {
      fontWeight: 'bold',
    },
    h6: {
      fontWeight: 'bold',
    }
  }
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#505081',
    },
  },
});

function stringToColor(string) {
  let hash = 0;
  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 56,
      height: 56,
      fontSize: '1.5rem',
      marginRight: 2,
    },
    children: `${name.split(' ')[0][0]}`,
  };
}

// --- NEW EMPTY STATE ILLUSTRATION ---
const NoHistoryIllustration = () => (
  <Box sx={{ textAlign: 'center', p: 3 }}>
    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="#8686AC"/>
    </svg>
    <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 2 }}>
      No recent searches found.
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Your career search history will appear here.
    </Typography>
  </Box>
);


const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'background.default' }}>
          <CircularProgress />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box 
        sx={{
          minHeight: 'calc(100vh - 64px)',
          background: `linear-gradient(135deg, ${darkTheme.palette.background.default} 0%, #1a1a5c 100%)`,
          backgroundSize: '200% 200%',
          animation: `${gradientAnimation} 15s ease infinite`,
          py: 5,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
            {user && <Avatar {...stringAvatar(user.name)} />}
            <div>
              <Typography variant="h4" component="h1">
                Welcome back, {user?.name || 'User'}!
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Ready to explore your future? Let's get started.
              </Typography>
            </div>
          </Box>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={7}>
              <ThemeProvider theme={lightTheme}>
                <Paper
                  elevation={12}
                  sx={{
                    p: { xs: 2, md: 4 },
                    borderRadius: 4,
                    height: '100%',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: '0px 10px 20px rgba(0,0,0,0.2)',
                    }
                  }}
                >
                  <CareerForm />
                </Paper>
              </ThemeProvider>
            </Grid>

            <Grid item xs={12} md={5}>
              <Paper
                elevation={12}
                sx={{
                  p: 3,
                  backgroundColor: 'background.paper',
                  borderRadius: 4,
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(134, 134, 172, 0.2)',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0px 10px 20px rgba(0,0,0,0.2)',
                  }
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h6">Recent Searches</Typography>
                  <Button component={Link} to="/profile" size="small" sx={{ color: 'primary.main' }}>View All</Button>
                </Box>
                {user?.searchHistory && user.searchHistory.length > 0 ? (
                  <List>
                    {[...user.searchHistory].reverse().slice(0, 3).map((item, index) => (
                      <React.Fragment key={index}>
                        <ListItem>
                          <ListItemIcon>
                            <HistoryIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={`Interest: "${item.interest}"`}
                            secondary={`Searched on ${new Date(item.date).toLocaleDateString()}`}
                          />
                        </ListItem>
                        {index < user.searchHistory.slice(0, 3).length - 1 && <Divider component="li" variant="inset" />}
                      </React.Fragment>
                    ))}
                  </List>
                ) : (
                  <NoHistoryIllustration />
                )}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default DashboardPage;
