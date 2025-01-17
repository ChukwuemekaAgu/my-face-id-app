import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import axios from 'axios';
import { SignUpPage } from '../../routes/routes';
import './FaceRegister.css';



export const FaceRegister: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const { username, password } = location.state || {};

  const handleCapture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
    } else {
      alert('Could not capture the image. Please try again.');
    }
  };

  const handleSubmit = async () => {
    if (!capturedImage) {
      alert('Please capture an image before submitting.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/signup', {
        username,
        password,
        faceImage: capturedImage,
      });

      if (response.status === 200) {
        alert('Registration successful!');
        navigate('/');
      } else if (response.status === 400) {
        alert(response.data.message || 'Error during registration.');
      } else {
        alert('Unexpected error. Please try again.');
      }
    } catch (error: any) {
      console.error('Registration failed:', error.response?.data || error.message);
      alert('Failed to register. Please try again.');
    }
  };

  return (
    <div className='faceregister-container'>
      <div className='faceregister-box'>
        <h2 className='faceregister-title'>Face Registration</h2>
        <div className='webcam-container'>
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className='webcam'
          />
        </div>

        <button className='faceregister-button' onClick={handleCapture}>Capture</button>

        {capturedImage && (
          <div className='captured-image-container'>
            <h3 className='captured-image-title'>Captured Image:</h3>
            <img
              src={capturedImage}
              alt="Captured"
              className='captured-image'
            />
          </div>
        )}

        <button 
          className='faceregister-button'
          onClick={handleSubmit} 
          style={{ marginTop: '20px' }}
          >
          Submit
        </button>
      </div>
    </div>
  );
};
