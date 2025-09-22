import React, { useState } from 'react';

export default function Mesero() {
  const [idUsuario, setIdUsuario] = useState('');
  const [idMesa, setIdMesa] = useState('');
  const [items, setItems] = useState([{ id_item_menu: '', cantidad: 1 }]);
  const [mensaje, setMensaje] = useState('');

  // Agrega un nuevo item al pedido
  const agregarItem = () => {
    setItems([...items, { id_item_menu: '', cantidad: 1 }]);
  };

  // Maneja cambios en los items
  const manejarCambioItem = (index, field, value) => {
    const nuevosItems = [...items];
    nuevosItems[index][field] = value;
    setItems(nuevosItems);
  };

  // Envía el pedido al backend
  const enviarPedido = async (e) => {
    e.preventDefault();

    // Validación simple
    if (!idUsuario || !idMesa || items.length === 0) {
      setMensaje('Por favor completa todos los datos.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/pedido', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_usuario: Number(idUsuario),
          id_mesa: Number(idMesa),
          items: items.map(i => ({
            id_item_menu: Number(i.id_item_menu),
            cantidad: Number(i.cantidad)
          }))
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMensaje(`Error: ${errorData.error}`);
      } else {
        const data = await response.json();
        setMensaje(`Pedido creado con éxito! ID: ${data.id || 'N/A'}`);
        // Limpiar formulario
        setIdUsuario('');
        setIdMesa('');
        setItems([{ id_item_menu: '', cantidad: 1 }]);
      }
    } catch (error) {
      console.error(error);
      setMensaje('Error al conectar con el servidor.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Crear Pedido</h2>
      <form onSubmit={enviarPedido}>
        <div>
          <label>ID Usuario:</label>
          <input
            type="number"
            value={idUsuario}
            onChange={(e) => setIdUsuario(e.target.value)}
            required
          />
        </div>
        <div>
          <label>ID Mesa:</label>
          <input
            type="number"
            value={idMesa}
            onChange={(e) => setIdMesa(e.target.value)}
            required
          />
        </div>
        <div>
          <h4>Items:</h4>
          {items.map((item, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <label>ID Item:</label>
              <input
                type="number"
                value={item.id_item_menu}
                onChange={(e) =>
                  manejarCambioItem(index, 'id_item_menu', e.target.value)
                }
                required
              />
              <label>Cantidad:</label>
              <input
                type="number"
                value={item.cantidad}
                min="1"
                onChange={(e) =>
                  manejarCambioItem(index, 'cantidad', e.target.value)
                }
                required
              />
            </div>
          ))}
          <button type="button" onClick={agregarItem}>
            Agregar otro item
          </button>
        </div>
        <button type="submit">Crear Pedido</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}
