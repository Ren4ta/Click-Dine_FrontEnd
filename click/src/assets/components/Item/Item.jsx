import React, { useEffect, useState } from "react"; 
import { useParams, useNavigate } from "react-router-dom";
import './Item.css';

export default function Item() {
  const { idRestaurante, idCategoria, idItem } = useParams(); 
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [extrasSeleccionados, setExtrasSeleccionados] = useState([]);

  // 🔹 Estos valores deberían venir del login/mesa
  const id_usuario = 1; 
  const id_mesa = 1;

  // 🔹 Extras con sus IDs
  const extras = [
    { id: 101, nombre: "Coca Zero", precio: 3000 },
    { id: 102, nombre: "Sprite", precio: 3000 },
    { id: 103, nombre: "Fanta", precio: 3000 }
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

  // 🔹 Seleccionar/deseleccionar extras
  const toggleExtra = (extraId) => {
    setExtrasSeleccionados((prev) =>
      prev.includes(extraId)
        ? prev.filter((id) => id !== extraId)
        : [...prev, extraId]
    );
  };

  // 🔹 Enviar pedido al backend
  const handleAgregarPedido = async () => {
    if (!item) return;

    // armamos array de items = principal + extras seleccionados
    const pedido = {
      id_usuario,
      id_mesa,
      items: [item.id, ...extrasSeleccionados]
    };

    try {
      const res = await fetch("http://localhost:3000/api/pedido", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedido)
      });

      if (!res.ok) throw new Error("Error al agregar el pedido");

      const data = await res.json();
      alert("Pedido agregado con éxito ✅");
      console.log("Respuesta del back:", data);

    } catch (err) {
      console.error(err);
      alert("Hubo un problema al agregar el pedido ❌");
    }
  };

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
            <button 
              className={`btn-mas ${extrasSeleccionados.includes(extra.id) ? "activo" : ""}`}
              onClick={() => toggleExtra(extra.id)}
            >
              {extrasSeleccionados.includes(extra.id) ? "✓" : "+"}
            </button>
          </div>
        ))}
      </div>

      <div className="acciones">
        <button 
          className="btn-volver" 
          onClick={() => navigate(`/items-by-categoria-restaurante/${idRestaurante}/${idCategoria}`)}
        >
          VOLVER
        </button>

        <button 
          className="btn-agregar"
          onClick={handleAgregarPedido}
        >
          AGREGAR AL PEDIDO
        </button>
      </div>
    </div>
  );
}
