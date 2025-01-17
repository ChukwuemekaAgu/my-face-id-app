import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import axios from 'axios';
import { DashboardPage } from '../../routes/routes';
import './FaceAuth.css';

export const FaceAuth: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { username} = location.state || {};

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
      const response = await axios.post('http://localhost:5000/faceauth', {
        username,
        faceImage: capturedImage,
      });

      if (response.status === 200 && response.data.isAuthenticated) {
        alert('Face authentication successful!');
        navigate(DashboardPage.path);
      } else {
        alert(response.data.message || 'Face authentication failed.');
      }
    } catch (error: any) {
      console.error('Error during face authentication:', error.response?.data || error.message);
      alert('An error occurred during face authentication.');
    }
  };

  return (
    <div className='faceauth-container'>
      <div className='faceauth-box'>
        <h2 className='faceauth-title'>Face Authentication</h2>
        <div className='webcam-container'>
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className='webcam'
          />
        </div>

        <button className='faceauth-button' onClick={handleCapture}>Capture</button>
        
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
           className='faceauth-button'
           onClick={handleSubmit} style={{ marginTop: '20px' }}>
          Authenticate
        </button>
      </div>
    </div>
  );
};
