import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./WishList.css";

const WishList = () => {
  const { pedidoId } = useParams(); // <-- obtenemos el parámetro de la URL
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

  return (
    <div>
      <h2>Carrito del Pedido {pedidoId}</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <img src={item.img} alt={item.nombre} />
            <div>
              <h3>{item.nombre}</h3>
              <p>{item.descripcion}</p>
              <span>${item.precio}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WishList;
