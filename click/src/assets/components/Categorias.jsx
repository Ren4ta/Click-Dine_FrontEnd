import React, { useEffect, useState } from 'react'; 


function Categorias() {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/api/categorias')
            .then(res => res.json())
            .then(data => setCategorias(data))
            .catch(err => console.error('Failed to fetch:', err));
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Categorías desde Supabase</h2>
            <ul className="space-y-2">
                {categorias.map(cat => (
                    <li key={cat.id} className="flex items-center gap-4 p-2 border rounded-lg shadow-sm">
                        <img src={cat.img} alt={cat.nombre} className="w-12 h-12 rounded-full object-cover" />
                        <span className="text-lg font-medium">{cat.nombre}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Categorias;
