import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import './ItemMenu.css';

export default function ItemMenu() {
  const { idRestaurante, idCategoria } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Parámetros recibidos:", { idRestaurante, idCategoria });
    fetch(`http://localhost:3000/api/items-by-categoria-restaurante/${idRestaurante}/${idCategoria}`)
      .then(res => {
        if (!res.ok) throw new Error('Error al obtener ítems del menú');
        return res.json();
      })
      .then(data => {
        console.log("Datos recibidos del backend:", data);
        setItems(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [idRestaurante, idCategoria]);

  if (loading) return <div>Cargando ítems...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="item-menu-container">
      <h2>
        {items.length > 0 ? items[0].categoria : idCategoria}
      </h2>

      <div className="item-grid">
        {items.map(item => (
       <div key={item.id} className="item-card">
       <img src={item.img || '/placeholder.png'} alt={item.nombre} className="item-img" />
       <div className="item-content">
         <h3>{item.nombre}</h3>
         <p><strong>Precio:</strong> ${item.precio}</p>
         <p>
           <strong>Disponibilidad:</strong>{' '}
           {item.disponible ? (
             <span style={{ color: 'green' }}>Disponible</span>
           ) : (
             <span style={{ color: 'red' }}>No disponible</span>
           )}
         </p>
       </div>
     </div>
        ))}
      </div>
    </div>
  );
}
