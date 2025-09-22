import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./WishList.css";

const WishList = () => {
  const { pedidoId } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className="carrito">
      <h2>SU PEDIDO ACTUAL</h2>
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
        <button className="btn btn-primary">PEDIR</button>
      </div>
    </div>
  );
};

export default WishList;
