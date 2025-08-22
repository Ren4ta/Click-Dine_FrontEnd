import React, { useEffect, useState } from 'react';
import './Categorias.css';
import { useNavigate } from 'react-router-dom';

export default function Categorias({ idRestaurante }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const handleCategoriaClick = (idCategoria) => {
    navigate(`/items-by-categoria-restaurante/${idRestaurante}/${idCategoria}`); // Envío ambos parámetros correctamente
  };

  if (loading) return <div>Cargando categorías...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="menu-container">
      <div className="menu-grid">
        {categories.map((cat, idx) => {
          console.log(cat.img)
          return(
          <div
            key={idx}
            className={`menu-item ${cat.isPromo ? 'promo' : ''}`}
            onClick={() => !cat.isPromo && handleCategoriaClick(cat.id)}
          >
            {cat.isPromo ? (
              <>
                <div className="promo-text">PROMOS</div>
                <div className="promo-question">?</div>
              </>
            ) : (
              <>
                <img
                  src={cat.img || 'placeholder.jpg'}
                  alt={cat.nombre}
                  className="menu-img"
                />
                <div className="menu-text">{cat.nombre}</div>
              </>
            )}
          </div>
)})}
      </div>
    </div>
  );
}
