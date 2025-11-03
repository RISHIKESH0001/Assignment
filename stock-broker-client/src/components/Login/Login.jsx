import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = login(email, password);
    
    if (!result.success) {
      setError(result.error);
    }
    
    setIsLoading(false);
  };

  const demoUsers = [
    { email: 'user1@example.com', password: 'password1', name: 'User 1' },
    { email: 'user2@example.com', password: 'password2', name: 'User 2' }
  ];

  const fillDemoCredentials = (demoUser) => {
    setEmail(demoUser.email);
    setPassword(demoUser.password);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Stock Broker Dashboard</h1>
        <p className="login-subtitle">Track your investments in real-time</p>
        
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          
          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="demo-users">
          <h3>Demo Users:</h3>
          {demoUsers.map((user, index) => (
            <button
              key={user.email}
              className="demo-user-button"
              onClick={() => fillDemoCredentials(user)}
            >
              {user.name} ({user.email})
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;