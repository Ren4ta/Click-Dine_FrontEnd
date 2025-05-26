import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StartScreen.css';

const StartScreen = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/home'); // navigates to the homepage or menu screen
  };

  return (
    <div className="start-screen">
      <div className="logo-container">
        <h1>
          Click&<span>Dine</span>
        </h1>
        <img src="/path-to-your-dome-image.png" alt="Dome Logo" className="logo-image" />
      </div>
      <button className="start-button" onClick={handleStart}>
        INICIAR
      </button>
    </div>
  );
};

export default StartScreen;
