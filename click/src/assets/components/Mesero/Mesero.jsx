import React, { useState, useEffect } from 'react';

export default function Mesero() {
  const [idRestaurante] = useState(1); // ID fijo
  const [mesas, setMesas] = useState([]);
  const [idPedidoSeleccionado, setIdPedidoSeleccionado] = useState(null);
  const [carrito, setCarrito] = useState([]);
  const [mensaje, setMensaje] = useState('');

  // Estados disponibles
  const estados = [
    { id: 2, nombre: 'Standby' },
    { id: 3, nombre: 'En proceso' },
    { id: 4, nombre: 'Autorizado' },
    { id: 5, nombre: 'Listo en Cocina' },
    { id: 6, nombre: 'Entregado' },
    { id: 7, nombre: 'Pagado y Finalizado' },
  ];

  // Traer mesas con pedidos activos
  const obtenerMesas = async () => {
    try {
      const res = await fetch(`http://localhost:3000/mesas/${idRestaurante}/pedidos-activos`);
      if (!res.ok) throw new Error('Error al obtener mesas');
      const data = await res.json();

      setMesas(data);

      // Selecciona primer pedido activo
      const primeraMesaConPedido = data.find(m => m.pedido_activo);
      if (primeraMesaConPedido) {
        setIdPedidoSeleccionado(primeraMesaConPedido.pedido.id_pedido);
        setCarrito(primeraMesaConPedido.pedido.items || []);
      } else {
        setMensaje('No hay mesas con pedidos activos.');
        setCarrito([]);
        setIdPedidoSeleccionado(null);
      }
    } catch (error) {
      console.error(error);
      setMensaje('Error al conectar con el servidor.');
    }
  };

  // Actualizar estado de un item
  const actualizarEstadoItem = async (idItemPedido, idEstadoItem) => {
    try {
      const res = await fetch('http://localhost:3000/api/item-pedido/estado', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_pedido: idPedidoSeleccionado,
          items: [{ id_item_pedido: idItemPedido, id_estado_item: Number(idEstadoItem) }]
        })
      });

      if (!res.ok) throw new Error('Error al actualizar estado del ítem');

      // Actualizar carrito local
      setCarrito(prev =>
        prev.map(item =>
          item.id_item_pedido === idItemPedido
            ? { ...item, estado_item: estados.find(e => e.id === Number(idEstadoItem))?.nombre }
            : item
        )
      );

      setMensaje('Estado del ítem actualizado correctamente.');
    } catch (error) {
      console.error(error);
      setMensaje('Error al actualizar el estado del ítem.');
    }
  };

  useEffect(() => {
    obtenerMesas();
  }, []);

  return (
    <div style={{ padding: '20px' }}> 
    <h1> APP MESERO</h1>
      <h2>Pedidos Activos - Restaurante {idRestaurante}</h2>

      {mesas.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Mesas con pedidos activos:</h3>
          <ul>
            {mesas.map((mesa) => (
              <li key={mesa.id_mesa}>
                Mesa {mesa.numero_mesa} - Pedido {mesa.pedido_activo ? mesa.pedido.id_pedido : 'N/A'}{' '}
                {mesa.pedido_activo && (
                  <button onClick={() => {
                    setIdPedidoSeleccionado(mesa.pedido.id_pedido);
                    setCarrito(mesa.pedido.items || []);
                  }}>
                    Ver Carrito
                  </button>
                )}
                {!mesa.pedido_activo && <span> - Sin pedido activo</span>}
              </li>
            ))}
          </ul>
        </div>
      )}

      {idPedidoSeleccionado && carrito.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Carrito del pedido {idPedidoSeleccionado}</h3>
          <ul>
            {carrito.map((item) => (
              <li key={item.id_item_pedido} style={{ marginBottom: '10px' }}>
                <strong>{item.nombre}</strong> - Estado:{' '}
                <select
                  value={estados.find(e => e.nombre === item.estado_item)?.id || 2}
                  onChange={(e) => actualizarEstadoItem(item.id_item_pedido, e.target.value)}
                >
                  {estados.map((estado) => (
                    <option key={estado.id} value={estado.id}>
                      {estado.nombre}
                    </option>
                  ))}
                </select>
              </li>
            ))}
          </ul>
        </div>
      )}

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}
