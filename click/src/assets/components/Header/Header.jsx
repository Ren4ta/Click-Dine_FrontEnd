import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="app-header">
      <div className="logo">
        <img 
          src="src/assets/img/LOGO.png" 
          alt="click&dine" 
          className="logo-image"  
          style={{ cursor: "pointer" }}
          onClick={() => navigate('/categorias')}
        />
      </div>
      <div className="notification">
        <img 
          src="src/assets/img/click&dine.png" 
          alt="pedido" 
          className="pedido-image"
          style={{ cursor: "pointer" }}
          onClick={() => navigate('/wishlist')} 
        />
      </div>
    </header>
  );
}
