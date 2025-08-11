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
        console.log("Datos recibidos del back:", data); // Para verificar la estructura
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
      {/* Mostrar la categoría (usar el nombre de categoría si hay al menos un item) */}
      <h2>
        Platos de la categoría{' '}
        {items.length > 0 ? items[0].categoria : idCategoria}
      </h2>

      <div className="item-grid">
        {items.map(item => (
          <div key={item.id} className="item-card">
            <img
              src={item.img || '/placeholder.png'}
              alt={item.nombre}
              className="item-img"
            />
            <h3>{item.nombre}</h3>
            <p>{item.descripcion}</p>
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
        ))}
      </div>
    </div>
  );
}
