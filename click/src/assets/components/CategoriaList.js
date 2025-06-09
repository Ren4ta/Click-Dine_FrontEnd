import React, { useEffect, useState } from 'react';

function CategoriaList() {
const [categorias, setCategorias] = useState([]);

useEffect(() => {
fetch('http://localhost:4000/api/categorias')
.then(res => res.json())
.then(data => setCategorias(data))
.catch(err => console.error('Failed to fetch:', err));
}, []);

return (
<div>
<h2>Categorías desde Supabase</h2>
<ul>
{categorias.map(cat => (
<li key={cat.id}>{cat.nombre}</li> // Adjust field as needed
))}
</ul>
</div>
);
}

export default CategoriaList;