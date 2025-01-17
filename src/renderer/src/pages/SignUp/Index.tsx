import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaceRegisterPage, SignInPage } from '../../routes/routes';
import './SignUp.css';

export const SignUp: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    if (!username || !password) {
      alert('Please enter both username and password.');
      return;
    }
    navigate(FaceRegisterPage.path, { state: { username, password } });
  };

  const signInPage = () => {

    navigate(SignInPage.path);
  };

  return (
    <div className='signup-container'>
      <div className='signup-box'>
        <h2 className='signup-title'>Create Your Account</h2>
        <input
          className='signup-input'
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className='signup-input'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='signup-button' onClick={handleNext}>Next</button>
        <p className='signup-text'>
          Already have an account? {' '} 
          <button className='signup-link' onClick={signInPage}>Sign In</button></p>
      </div>
    </div>
  );
};
