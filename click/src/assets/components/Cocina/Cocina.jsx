import React, { useState, useEffect } from 'react';
import './Cocina.css';

export default function Cocina() {
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

      const hayPedidoActivo = data.some(m => m.pedido_activo);
      if (!hayPedidoActivo) setMensaje('No hay mesas con pedidos activos.');
    } catch (error) {
      console.error(error);
      setMensaje('Error al conectar con el servidor.');
    }
  };

  useEffect(() => {
    obtenerMesas();
  }, []);

  // Mostrar carrito al presionar botón
  const verCarrito = (mesa) => {
    if (mesa.pedido_activo) {
      setIdPedidoSeleccionado(mesa.pedido.id_pedido);
      setCarrito(mesa.pedido.items || []);
      setMensaje('');
    } else {
      setCarrito([]);
      setIdPedidoSeleccionado(null);
      setMensaje('Esta mesa no tiene pedido activo.');
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

  return (
    <div className="container"> 
    <h2> APP COCINA</h2>
      <h2>Pedidos Activos</h2>

      <ul className="mesas-list">
        {mesas.map((mesa) => (
          <li className="mesa-card" key={mesa.id_mesa}>
            <div className="mesa-info">
              Mesa {mesa.numero_mesa} 
              {mesa.pedido_activo && <> - Pedido {mesa.pedido.id_pedido}</>}
            </div>
            <button onClick={() => verCarrito(mesa)}>Ver Carrito</button>
          </li>
        ))}
      </ul>

      {idPedidoSeleccionado && carrito.length > 0 && (
        <div className="carrito">
          <h3>Carrito del pedido {idPedidoSeleccionado}</h3>
          <ul>
            {carrito.map((item) => (
              <li key={item.id_item_pedido} className={`carrito-item estado-${estados.find(e => e.nombre === item.estado_item)?.id || 2}`}>
                <span>{item.nombre}</span>
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
