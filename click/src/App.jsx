import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import StartScreen from './assets/components/StartScreen/StartScreen';
import LogIn from './assets/components/LogIn';
import Categorias from './assets/components/Categorias/Categorias';
import Header from './assets/components/Header/Header'; 
import ItemMenu from './assets/components/ItemMenu/ItemMenu';

function Layout() {
  const location = useLocation();
  // Rutas en las que NO quieres mostrar el Header
  const hideHeaderRoutes = ['/', '/login', '/admin', '/mesero'];

  // Mostrar Header solo si no está en las rutas para ocultar
  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <Header />}
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/categorias" element={<Categorias idRestaurante="1" />} />
        {/* RUTA PARA ITEMMENU con dos parámetros en URL */}
        <Route path="/items/:idRestaurante/:idCategoria" element={<ItemMenu />} />
      </Routes>
    </>
  );
}

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
