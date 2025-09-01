import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCarrito } from '../../context/WishListContext';
import './Header.css';

export default function Header() {
  const navigate = useNavigate();

  // ✅ Destructuring directo con valor por defecto
  const { pedidoId } = useCarrito() || {};
  useEffect(() => {
    console.log("PedidoId actualizado en Header:", pedidoId);
  }, [pedidoId]);
  console.log("PedidoId en Header:", pedidoId);

  const irAlCarrito = () => {
    console.log("Ir al carrito, pedidoId:", pedidoId);
    if (pedidoId) {
      navigate(`/carrito/${pedidoId}`);
    } else {
      alert("No hay un pedido activo");
    }
  };

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
          onClick={irAlCarrito} 
        />
      </div>
    </header>
  );
}
