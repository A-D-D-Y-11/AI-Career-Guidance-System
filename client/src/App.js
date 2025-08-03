// src/App.js

import { Routes, Route } from 'react-router-dom';

// Import Layouts and Pages
import MainLayout from './components/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/Login.jsx';
import RegisterPage from './pages/Register.js';
import DashboardPage from './pages/Dashboard.js';
import ProfilePage from './pages/ProfilePage.jsx';

function App() {
  return (
    <Routes>
      {/* Public Route: The Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Authentication Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Routes within the Main Layout */}
      <Route 
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
      
    </Routes>
  );
}

export default App;