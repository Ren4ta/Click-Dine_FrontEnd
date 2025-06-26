import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

function Categorias() {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCategorias() {
            const { data, error } = await supabase.from('categorias').select('*');
            if (error) console.error(error);
            else setCategorias(data);
            setLoading(false);
        }

        fetchCategorias();
    }, []);

    if (loading) return <p>Cargando categorías...</p>;

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
