import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ItemMenu() {
  const { idCategoria, idRestaurante } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/itemmenu/${idRestaurante}/${idCategoria}`)
      .then(res => {
        if (!res.ok) throw new Error('Error al obtener ítems del menú');
        return res.json();
      })
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [idCategoria, idRestaurante]);

  if (loading) return <div>Cargando ítems...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="item-menu-container">
      <h2>Platos de la categoría {idCategoria}</h2>
      <div className="item-grid">
        {items.map(item => (
          <div key={item.id} className="item-card">
            <img src={item.img} alt={item.nombre} className="item-img" />
            <h3>{item.nombre}</h3>
            <p>${item.precio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
