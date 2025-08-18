import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import StartScreen from './assets/components/StartScreen/StartScreen';
import LogIn from './assets/components/LogIn';
import Categorias from './assets/components/Categorias/Categorias';
import Header from './assets/components/Header/Header'; 
import ItemMenu from './assets/components/ItemMenu/ItemMenu';
import Item from './assets/components/Item/Item'; // 👈 importar el componente Item

function Layout() {
  const location = useLocation();
  const hideHeaderRoutes = ['/', '/login', '/admin', '/mesero'];
  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <Header />}
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/categorias" element={<Categorias idRestaurante="1" />} />
        <Route path="/items-by-categoria-restaurante/:idRestaurante/:idCategoria" element={<ItemMenu />} />
        <Route path="/items/:idRestaurante/:idCategoria/:idItem" element={<Item />} /> {/* 👈 ruta corregida */}
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
