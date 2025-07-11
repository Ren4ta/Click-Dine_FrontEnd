import React from 'react';
import './Categorias.css';

const categories = [
  { name: 'ENTRADAS', img: 'entradas.jpg' },
  { name: 'PRINCIPALES', img: 'principales.jpg' },
  { name: 'POSTRES', img: 'postres.jpg' },
  { name: 'BEBIDAS', img: 'bebidas.jpg' },
  { name: 'TRAGOS', img: 'tragos.jpg' },
  { name: 'PROMOS', img: '', isPromo: true },
  { name: 'MENÚ KIDS', img: 'kids.jpg' },
  { name: 'CAFETERÍA', img: 'cafe.jpg' }
];

export default function Categorias() {
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
                <img src={cat.img} alt={cat.name} className="menu-img" />
                <div className="menu-text">{cat.name}</div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
