import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpPage.css';
import { auth } from './firebase/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const SignUpPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Create account with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log('Account Created');

      // Set display name
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: username,
      });

      // Optional: Navigate to dashboard or login page after successful signup
      navigate('/dashboard'); // or navigate('/login')

    } catch (error) {
      console.error('Signup error:', error);
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

      {/* SIGNUP FORM */}
      <div className="signup-container">
        <form className="signup-box" onSubmit={handleSubmit}>
          <div className="signup-title">Sign-Up</div>

          <label className="signup-label">User Name:</label>
          <input
            className="signup-input"
            type="text"
            value={username}
            placeholder="Enter your name"
            onChange={(e) => setUsername(e.target.value)}
          />

          <label className="signup-label">Email:</label>
          <input
            className="signup-input"
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="signup-label">Password:</label>
          <input
            className="signup-input"
            type="password"
            value={password}
            placeholder="Create a password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="signup-button" type="submit">Sign Up</button>

          <div className="divider">Or</div>

          <button className="google-button" type="button">
            <span style={{ marginRight: '0.5rem' }}>🔍</span> Sign in with Google
          </button>

          <div className="signup-footer">
            Already Registered?{' '}
            <span onClick={() => navigate('/login')}>Login</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;

