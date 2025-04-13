import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase/firebase'; // adjust if needed
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful');
      // navigate to dashboard or home
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      // Optionally show error to user
    }
  };

  return (
    <div className="page-wrapper">
      {/* NAVBAR */}
      <div className="navbar">
        <div className="nav-title">ganc</div>
        <div className="nav-buttons">
          <button className="nav-button" onClick={() => navigate('/about')}>about</button>
          <button className="nav-button" onClick={() => navigate('/get-started')}>get started</button>
          <button className="nav-button" onClick={() => navigate('/login')}>login</button>
        </div>
      </div>

      {/* LOGIN FORM */}
      <div className="login-container">
        <form className="login-box" onSubmit={handleSubmit}>
          <div className="login-title">Welcome to ganc</div>
          <div className="login-subtitle">Lead smarter. Grow stronger. Stay connected.</div>

          <label className="login-label">Email</label>
          <input
            className="login-input"
            type="email"
            value={email}
            placeholder="Example@email.com"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="login-label">Password</label>
          <input
            className="login-input"
            type="password"
            value={password}
            placeholder="At least 8 characters"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="login-forgot" onClick={() => navigate('/forgot-password')}>
            Forgot Password?
          </div>

          <button className="login-button" type="submit">Sign in</button>

          <div className="divider">Or</div>

          <button className="google-button" type="button">
            <span style={{ marginRight: '0.5rem' }}>🔍</span> Sign in with Google
          </button>

          <p style={{ fontSize: '0.85rem', textAlign: 'center', marginTop: '1rem', color: 'black' }}>
          Don’t have an account?{' '}
          <span
              onClick={() => navigate('/signup')}
              style={{
              color: 'blue',
              cursor: 'pointer',
              textDecoration: 'underline',
              }}
          >
              Create one
          </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
