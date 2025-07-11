import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StartScreen.css';

const StartScreen = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/login'); // Redirige al componente LogIn
  };

  return (
    <div className="start-screen">
      <div className="logo-container">
        <img src="src/assets/img/LOGO.png" alt="click&dine" className="logo-image" />
      </div>
      <button className="start-button" onClick={handleStart}>
        INICIAR
      </button>
    </div>
  );
};

export default StartScreen;
