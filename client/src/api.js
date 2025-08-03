 import axios from 'axios';

const api = axios.create({
  // This is the correct, live URL for your backend
  baseURL: 'https://ai-career-guidance-backend.onrender.com/api',
});

// This "interceptor" runs after every API response
api.interceptors.response.use(
  (response) => response, // Simply return the response if it's successful
  (error) => {
    // Check if the error is an authorization error (401 or 403)
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.log('Token expired or invalid. Logging out.');
      // Clear the invalid token
      localStorage.removeItem('token');
      // Redirect to the login page
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
