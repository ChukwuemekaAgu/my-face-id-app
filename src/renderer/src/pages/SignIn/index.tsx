import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaceAuthPage, SignUpPage } from "../../routes/routes";
import './SignIn.css';

export const SignIn: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleNext = async () => {
    if (!username || !password) {
      alert('Please enter both username and password.');
      return;
    }
    
    try {
      const payload = { username, password };
      console.log('Request Payload:', payload); 
      const response = await axios.post('http://localhost:5000/signin', payload);
      
      if (response.status === 200 && response.data.isAuthenticated) {
        alert('Login successful. Proceeding to facial verification.');
        navigate(FaceAuthPage.path, { state: { username } });
      } else {
        alert(response.data.message || 'Invalid username or password.');
      }
    } catch (error: any) {
      console.error('Error during authentication:', error.response || error.message);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert('An unexpected error occurred during authentication. Please try again.');
      }
    }
  };

  const signUpPage = () => {

    navigate(SignUpPage.path);

  };

  return (
    <div className='signin-container'>
      <div className='signin-box'>
        <h2 className='signin-title'>Sign In</h2>
        <input
          className='signin-input'
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className='signin-input'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='signin-button' onClick={handleNext}>Next</button>
        <p className='signin-text'>
          Don't have an account? {' '}
          <button className='signin-link' onClick={signUpPage}>Sign Up</button></p>
      </div>
    </div>
  );
};