import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>This is the secure area of the application.</p>
    </div>
  );
};

