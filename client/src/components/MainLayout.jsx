// src/components/MainLayout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { Container } from '@mui/material';

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <main>
        {/* The <Outlet> component will render the current page's content */}
        {/* (e.g., DashboardPage or ProfilePage) */}
        <Container sx={{ mt: 3 }}>
          <Outlet />
        </Container>
      </main>
    </div>
  );
};

export default MainLayout;