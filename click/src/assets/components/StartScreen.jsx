// StartScreen.jsx
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
      <img src= ""/>
      </div>
      <button className="start-button" onClick={handleStart}>
        INICIAR
      </button>
    </div>
  );
};

export default StartScreen;
