import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = ({ onSubscribeClick }) => {
  const { user, logout } = useAuth();

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <h1>Stock Dashboard</h1>
        <span className="welcome-message">Welcome, {user?.name}</span>
      </div>
      
      <div className="header-right">
        <button className="subscribe-btn" onClick={onSubscribeClick}>
          + Subscribe to Stock
        </button>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;