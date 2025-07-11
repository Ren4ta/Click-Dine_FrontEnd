import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import StartScreen from './assets/components/StartScreen/StartScreen';
import LogIn from './assets/components/LogIn';
import Categorias from './assets/components/Categorias/Categorias';
import Header from './assets/components/Header/Header';

function Layout() {
  const location = useLocation();
  const hideHeaderRoutes = ['/', '/login', '/admin', 'mesero'];

  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <Header />}
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/categorias" element={<Categorias />} />  
        
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
