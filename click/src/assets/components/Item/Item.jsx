// Item.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCarrito } from "../../context/WishListContext";
import "./Item.css";

export default function Item() {
  const { idRestaurante, idCategoria, idItem } = useParams();
  const navigate = useNavigate();
  const { setPedidoId } = useCarrito();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [extrasSeleccionados, setExtrasSeleccionados] = useState([]);

  const id_usuario = 1;
  const id_mesa = 1;

  const extras = [
    { id: 101, nombre: "Coca Zero", precio: 3000 },
    { id: 102, nombre: "Sprite", precio: 3000 },
    { id: 103, nombre: "Fanta", precio: 3000 }
  ];

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/items/${idRestaurante}/${idItem}`);
        if (!res.ok) throw new Error("Error al obtener el ítem");
        const data = await res.json();
        setItem(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [idRestaurante, idItem]);

  const toggleExtra = (extraId) => {
    setExtrasSeleccionados((prev) =>
      prev.includes(extraId)
        ? prev.filter((id) => id !== extraId)
        : [...prev, extraId]
    );
  };

  const handleAgregarPedido = async () => {
    if (!item) return;

    const itemId = item.id || item.id_item_menu;
    if (!itemId) {
      console.error("⚠️ El ítem no tiene ID válido:", item);
      alert("No se pudo agregar el ítem. ID no encontrado.");
      return;
    }

    // ✅ Formato esperado por el backend: array de IDs
    const pedido = {
      id_usuario,
      id_mesa,
      items: [itemId, ...extrasSeleccionados]
    };

    console.log("📦 Pedido que se enviará:", pedido);

    try {
      const res = await fetch("http://localhost:3000/api/pedido", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedido)
      });

      if (!res.ok) throw new Error("Error al agregar el pedido");

      const data = await res.json();
      console.log("✅ Respuesta del backend:", data);

      if (data.pedido_id) {
        setPedidoId(data.pedido_id);
      }

      alert("Pedido agregado con éxito ✅");
      navigate(`/items-by-categoria-restaurante/${idRestaurante}/${idCategoria}`);
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
          <p className="precio">${item.precio?.toLocaleString()}</p>
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
        {extras.map((extra) => (
          <div key={extra.id} className="extra-row">
            <span>{extra.nombre}</span>
            <span>${extra.precio.toLocaleString()}</span>
            <button
              className={`btn-mas ${
                extrasSeleccionados.includes(extra.id) ? "activo" : ""
              }`}
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
          onClick={() =>
            navigate(`/items-by-categoria-restaurante/${idRestaurante}/${idCategoria}`)
          }
        >
          VOLVER
        </button>

        <button className="btn-agregar" onClick={handleAgregarPedido}>
          AGREGAR AL PEDIDO
        </button>
      </div>
    </div>
  );
}
