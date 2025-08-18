import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './Item.css';

export default function Item() {
  // 👇 Ahora incluye idCategoria
  const { idRestaurante, idCategoria, idItem } = useParams(); 
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const extras = [
    { id: 1, nombre: "Coca Zero", precio: 3000 },
    { id: 2, nombre: "Sprite", precio: 3000 },
    { id: 3, nombre: "Fanta", precio: 3000 }
  ];

  useEffect(() => {
    fetch(`http://localhost:3000/api/items/${idRestaurante}/${idItem}`)
      .then(res => {
        if (!res.ok) throw new Error("Error al obtener el ítem");
        return res.json();
      })
      .then(data => {
        setItem(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [idRestaurante, idItem]);

  if (loading) return <div>Cargando ítem...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!item) return <div>No se encontró el ítem.</div>;

  return (
    <div className="item-detalle">
      <div className="item-detalle-header">
        <div className="item-info">
          <h2>{item.nombre}</h2>
          <p className="precio">${item.precio.toLocaleString()}</p>
          <p className="descripcion">{item.descripcion}</p>
        </div>
        <img
          src={item.img || "/placeholder.png"}
          alt={item.nombre}
          className="item-detalle-img"
        />
      </div>

      <div className="extras">
        <h3>Agregale</h3>
        {extras.map(extra => (
          <div key={extra.id} className="extra-row">
            <span>{extra.nombre}</span>
            <span>${extra.precio.toLocaleString()}</span>
            <button className="btn-mas">+</button>
          </div>
        ))}
      </div>

      <div className="acciones">
        {/* ✅ Ahora el botón "VOLVER" funcionará correctamente */}
        <button 
          className="btn-volver" 
          onClick={() => navigate(`/items-by-categoria-restaurante/${idRestaurante}/${idCategoria}`)}
        >
          VOLVER
        </button>

        <button className="btn-agregar">AGREGAR AL PEDIDO</button>
      </div>
    </div>
  );
}
