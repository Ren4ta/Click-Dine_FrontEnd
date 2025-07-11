import React, { useEffect, useState } from 'react';
import './Categorias.css';

export default function Categorias({ idRestaurante }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!idRestaurante) return;

    fetch(`http://localhost:3000/api/categorias/${idRestaurante}`)
      .then(res => {
        if (!res.ok) throw new Error('Error al obtener categorías');
        return res.json();
      })
      .then(data => {
        setCategories(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [idRestaurante]);

  if (loading) return <div>Cargando categorías...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="menu-container">
      <div className="menu-grid">
        {categories.map((cat, idx) => (
          <div key={idx} className={`menu-item ${cat.isPromo ? 'promo' : ''}`}>
            {cat.isPromo ? (
              <>
                <div className="promo-text">PROMOS</div>
                <div className="promo-question">?</div>
              </>
            ) : (
              <>
                {/* Verificamos que la imagen exista y sea válida */}
                <img
                  src={cat.img || 'placeholder.jpg'}
                  alt={cat.name}
                  className="menu-img"
                />
                <div className="menu-text">{cat.name}</div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
