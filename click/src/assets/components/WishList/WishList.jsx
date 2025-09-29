import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./WishList.css";

const WishList = () => {
  const { pedidoId } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState("");

  // Traer carrito al montar el componente
  useEffect(() => {
    const fetchCarrito = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3000/api/carrito/${pedidoId}`);
        if (!res.ok) throw new Error("Error al cargar el carrito");
        const data = await res.json();
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (pedidoId) {
      fetchCarrito();
    }
  }, [pedidoId]);

  if (loading) return <p>Cargando carrito...</p>;
  if (error) return <p>{error}</p>;
  if (items.length === 0) return <p>No hay ítems en el carrito</p>;

  const handleRemove = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const total = items.reduce((acc, item) => acc + item.precio, 0);

  // Función para enviar el pedido (cambiar estado)
  const handlePedir = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/pedido/UpdateEstado/update-estado",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_pedido: Number(pedidoId),   // obligatorio y tipo number
            id_estado_pedido: 2            // ejemplo: 2 = "en-preparacion"
          })
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.error || "Error al actualizar el estado del pedido");
      }

      setMensaje("El pedido se ha enviado correctamente!");
      setTimeout(() => navigate("/espera"), 1500);
    } catch (err) {
      console.error(err);
      setMensaje(err.message || "Error al actualizar el estado del pedido.");
    }
  };

  return (
    <div className="carrito">
      <h2>SU PEDIDO ACTUAL</h2>
      {mensaje && <p>{mensaje}</p>}
      <ul className="carrito-list">
        {items.map((item) => (
          <li className="carrito-item" key={item.id}>
            <span>{item.nombre}</span>
            <div className="carrito-item-right">
              <span>${item.precio}</span>
              <button
                className="btn-remove"
                onClick={() => handleRemove(item.id)}
              >
                ✖
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="carrito-total">
        <span>Total</span>
        <span>${total}</span>
      </div>

      <div className="carrito-buttons">
        <button
          className="btn btn-outline"
          onClick={() => navigate("/categorias")}
        >
          MI PEDIDO NO ESTA COMPLETO
        </button>
        <button className="btn btn-primary" onClick={handlePedir}>
          PEDIR
        </button>
      </div>
    </div>
  );
};

export default WishList;
