import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import StartScreen from './assets/components/StartScreen/StartScreen';
import LogIn from './assets/components/LogIn';
import Categorias from './assets/components/Categorias/Categorias';
import Header from './assets/components/Header/Header'; 
import ItemMenu from './assets/components/ItemMenu/ItemMenu';
import Item from './assets/components/Item/Item';   
import WishList from './assets/components/WishList/WishList';   
import Admin from './assets/components/Admin/Admin'; 
import Mesero from './assets/components/Mesero/Mesero';  
import Cocina from './assets/components/Cocina/Cocina'


function Layout() {
  const location = useLocation();
  const hideHeaderRoutes = ['/', '/login', '/admin', '/mesero', '/cocina'];
  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <Header />}
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/categorias" element={<Categorias idRestaurante="1" />} />
        <Route path="/items-by-categoria-restaurante/:idRestaurante/:idCategoria" element={<ItemMenu />} />
        <Route path="/items/:idRestaurante/:idCategoria/:idItem" element={<Item />} />  
        <Route path="/wishlist" element={<WishList />} /> 
        <Route path="/mesero" element={<Mesero />} /> 
        <Route path="/admin" element={<Admin />} /> 
        <Route path="/cocina" element={<Cocina />} />
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
