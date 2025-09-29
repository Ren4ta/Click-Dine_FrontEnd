import React, { useState, useEffect } from 'react';

export default function Cocina() {
  const [idRestaurante] = useState(1); // ID fijo
  const [mesas, setMesas] = useState([]);
  const [idPedidoSeleccionado, setIdPedidoSeleccionado] = useState(null);
  const [carrito, setCarrito] = useState([]);
  const [mensaje, setMensaje] = useState('');

  // Traer mesas con pedidos activos
  const obtenerMesas = async () => {
    try {
      const response = await fetch(`http://localhost:3000/mesas/${idRestaurante}/pedidos-activos`);
      if (!response.ok) throw new Error('Error al obtener mesas');
      const data = await response.json();

      // Filtrar solo mesas con pedidos activos (por si el backend no lo hace)
      const mesasActivas = data.filter(m => m.estado === 'activo');
      setMesas(mesasActivas);

      if (mesasActivas.length > 0) {
        // Tomar el primer pedido activo y cargar su carrito
        const primerPedidoId = mesasActivas[0].id_pedido;
        obtenerCarrito(primerPedidoId);
      } else {
        setMensaje('No hay mesas con pedidos activos.');
      }
    } catch (error) {
      console.error(error);
      setMensaje('Error al conectar con el servidor.');
    }
  };

  // Traer carrito de un pedido
  const obtenerCarrito = async (idPedido) => {
    try {
      const response = await fetch(`http://localhost:3000/api/carrito/${idPedido}`);
      if (!response.ok) throw new Error('Error al obtener carrito');
      const data = await response.json();
      setCarrito(data);
      setIdPedidoSeleccionado(idPedido);
      setMensaje('');
    } catch (error) {
      console.error(error);
      setMensaje('Error al cargar el carrito.');
    }
  };

  // Ejecutar al montar el componente
  useEffect(() => {
    obtenerMesas();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Pedidos Activos - Restaurante {idRestaurante}</h2>

      {/* Mostrar mesas */}
      {mesas.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Mesas con pedidos activos:</h3>
          <ul>
            {mesas.map((mesa) => (
              <li key={mesa.id_mesa}>
                Mesa {mesa.id_mesa} - Pedido {mesa.id_pedido}{' '}
                <button onClick={() => obtenerCarrito(mesa.id_pedido)}>
                  Ver Carrito
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Mostrar carrito */}
      {idPedidoSeleccionado && (
        <div style={{ marginTop: '20px' }}>
          <h3>Carrito del pedido {idPedidoSeleccionado}</h3>
          {carrito.length > 0 ? (
            <ul>
              {carrito.map((item, index) => (
                <li key={index}>
                  Item {item.id_item_menu} - Cantidad: {item.cantidad}
                </li>
              ))}
            </ul>
          ) : (
            <p>Este pedido no tiene ítems.</p>
          )}
        </div>
      )}

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}
