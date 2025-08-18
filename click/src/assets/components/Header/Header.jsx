import React from 'react';
import './Header.css';

export default function Header() {
  return (
    <header className="app-header">
      <div className="logo">
        <img src="src/assets/img/LOGO.png" alt="click&dine" className="logo-image" />
      </div>
      <div className="notification">
      <img src="src/assets/img/click&dine.png" alt="pedido" className="pedido-image" />
      </div>
    </header>
  );
}